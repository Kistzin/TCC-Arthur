const API_URL = 'http://localhost:3000/api';

async function carregarMarcas() {
    try {
        const resposta = await fetch(`${API_URL}/marcas`);
        const dados = await resposta.json();

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

carregarMarcas();