
const API_URL = 'http://localhost:3000/api';

async function carregarMarcas() {
    try {
        console.log('Iniciando busca de marcas...');
        const resposta = await fetch(`${API_URL}/marcas`);
        const dados = await resposta.json();
        console.log('Dados recebidos:', dados);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar marcas.');
        }

        const marcas = dados.marcas;

        preencherMarcas('marca1', marcas);
        preencherMarcas('marca2', marcas);

    } catch (erro) {
        console.error('Erro ao carregar marcas:', erro);
    }
}

function preencherMarcas(idSelect, marcas) {
    const select = document.getElementById(idSelect);

    marcas.forEach(marca => {
        const option = document.createElement('option');

        option.value = marca.slug;
        option.textContent = marca.nome;

        select.appendChild(option);
    });
}


async function carregarModelos(numeroCarro) {
    const marcaSelect = document.getElementById(`marca${numeroCarro}`);
    const modeloSelect = document.getElementById(`modelo${numeroCarro}`);
    const versaoSelect = document.getElementById(`versao${numeroCarro}`);
    const anoSelect = document.getElementById(`ano${numeroCarro}`);

    const marca = marcaSelect.value;

    modeloSelect.innerHTML = '<option value="">Carregando modelos...</option>';
    modeloSelect.disabled = true;

    versaoSelect.innerHTML = '<option value="">Escolha uma versão</option>';
    versaoSelect.disabled = true;

    anoSelect.innerHTML = '<option value="">Escolha um ano</option>';
    anoSelect.disabled = true;

    if (!marca) {
        modeloSelect.innerHTML = '<option value="">Escolha um modelo</option>';
        return;
    }

    try {
        const resposta = await fetch(
            `${API_URL}/modelos?marca=${encodeURIComponent(marca)}`
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(JSON.stringify(dados));
        }

        modeloSelect.innerHTML = '<option value="">Escolha um modelo</option>';

        dados.modelos.forEach(modelo => {
            const option = document.createElement('option');
            option.value = modelo.slug;
            option.textContent = modelo.nome;
            modeloSelect.appendChild(option);
        });

        modeloSelect.disabled = false;

    } catch (erro) {
        console.error('Erro ao carregar modelos:', erro);
        modeloSelect.innerHTML = '<option value="">Erro ao carregar modelos</option>';
    }
}

document.getElementById('marca1').addEventListener('change', () => {
    carregarModelos(1);
});

document.getElementById('marca2').addEventListener('change', () => {
    carregarModelos(2);
});



async function carregarVersoes(numeroCarro) {
    const marca = document.getElementById(`marca${numeroCarro}`).value;
    const modeloSelect = document.getElementById(`modelo${numeroCarro}`);
    const versaoSelect = document.getElementById(`versao${numeroCarro}`);
    const anoSelect = document.getElementById(`ano${numeroCarro}`);

    const modelo = modeloSelect.value;

    versaoSelect.innerHTML = '<option value="">Carregando versões...</option>';
    versaoSelect.disabled = true;

    anoSelect.innerHTML = '<option value="">Escolha um ano</option>';
    anoSelect.disabled = true;

    if (!marca || !modelo) {
        versaoSelect.innerHTML = '<option value="">Escolha uma versão</option>';
        return;
    }

    try {
        const resposta = await fetch(
            `${API_URL}/versoes?marca=${encodeURIComponent(marca)}&modelo=${encodeURIComponent(modelo)}`
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(JSON.stringify(dados));
        }

        versaoSelect.innerHTML = '<option value="">Escolha uma versão</option>';

        dados.versoes.forEach(versao => {
            const option = document.createElement('option');

            option.value = versao.id;
option.textContent = versao.nome;
option.dataset.anos = JSON.stringify(versao.anos || []);

            versaoSelect.appendChild(option);
        });

        versaoSelect.disabled = false;

    } catch (erro) {
        console.error('Erro ao carregar versões:', erro);
        versaoSelect.innerHTML = '<option value="">Erro ao carregar versões</option>';
    }
}

document.getElementById('modelo1').addEventListener('change', () => {
    carregarVersoes(1);
});

document.getElementById('modelo2').addEventListener('change', () => {
    carregarVersoes(2);
});


function carregarAnos(numeroCarro) {
    const versaoSelect = document.getElementById(`versao${numeroCarro}`);
    const anoSelect = document.getElementById(`ano${numeroCarro}`);

    const versaoSelecionada = versaoSelect.selectedOptions[0];

    anoSelect.innerHTML = '<option value="">Escolha um ano</option>';
    anoSelect.disabled = true;

    if (!versaoSelect.value || !versaoSelecionada) {
        return;
    }

    const anos = JSON.parse(versaoSelecionada.dataset.anos || '[]');

    anos.forEach(ano => {
        const option = document.createElement('option');

        option.value = ano;
        option.textContent = ano;

        anoSelect.appendChild(option);
    });

    anoSelect.disabled = anos.length === 0;
}

document.getElementById('versao1').addEventListener('change', () => {
    carregarAnos(1);
});

document.getElementById('versao2').addEventListener('change', () => {
    carregarAnos(2);
});


async function compararCarros() {
    const id1 = document.getElementById('versao1').value;
    const ano1 = document.getElementById('ano1').value;

    const id2 = document.getElementById('versao2').value;
    const ano2 = document.getElementById('ano2').value;

    const resultado = document.getElementById('resultado-comparacao');

    if (!id1 || !ano1 || !id2 || !ano2) {
        resultado.textContent = 'Selecione a versão e o ano dos dois carros.';
        return;
    }

    resultado.textContent = 'Comparando carros...';

    try {
        const parametros = new URLSearchParams({
            id1,
            ano1,
            id2,
            ano2
        });

        const resposta = await fetch(
            `${API_URL}/comparar?${parametros.toString()}`
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(JSON.stringify(dados));
        }

        
resultado.innerHTML = '';

const carro1 = dados.carro1;
const carro2 = dados.carro2;

const titulo = document.createElement('h2');
titulo.textContent = 'Resultado da comparação';
resultado.appendChild(titulo);

const subtitulo = document.createElement('p');
subtitulo.textContent =
  `${carro1.versao.marca} ${carro1.versao.nome} (${carro1.ano}) × ` +
  `${carro2.versao.marca} ${carro2.versao.nome} (${carro2.ano})`;

resultado.appendChild(subtitulo);

// Junta as características dos dois carros pelo nome.
const itensCarro1 = new Map();
const itensCarro2 = new Map();

carro1.secoes.forEach(secao => {
  secao.itens.forEach(item => {
    itensCarro1.set(item.label, item.valor);
  });
});

carro2.secoes.forEach(secao => {
  secao.itens.forEach(item => {
    itensCarro2.set(item.label, item.valor);
  });
});

const todosLabels = new Set([
  ...itensCarro1.keys(),
  ...itensCarro2.keys()
]);

const tabela = document.createElement('table');
tabela.className = 'tabela-comparacao';

const cabecalho = document.createElement('thead');
cabecalho.innerHTML = `
  <tr>
    <th>Característica</th>
    <th>${carro1.versao.marca} ${carro1.versao.modelo}</th>
    <th>${carro2.versao.marca} ${carro2.versao.modelo}</th>
  </tr>
`;
tabela.appendChild(cabecalho);

const corpo = document.createElement('tbody');

todosLabels.forEach(label => {
  const linha = document.createElement('tr');

  const celulaLabel = document.createElement('th');
  celulaLabel.textContent = label;

  const celulaCarro1 = document.createElement('td');
  celulaCarro1.textContent = itensCarro1.get(label) ?? 'Não informado';

  const celulaCarro2 = document.createElement('td');
  celulaCarro2.textContent = itensCarro2.get(label) ?? 'Não informado';

  linha.append(celulaLabel, celulaCarro1, celulaCarro2);
  corpo.appendChild(linha);
});

tabela.appendChild(corpo);
resultado.appendChild(tabela);
    } catch (erro) {
        console.error('Erro ao comparar carros:', erro);
        resultado.textContent = 'Não foi possível comparar os carros.';
    }
}
carregarMarcas();