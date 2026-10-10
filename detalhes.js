
const carros = {
    "renault-niagara": {
        nome: "Renault Niagara",
        marca: "RENAULT",
        categoria: "Picape conceito",
        descricao: "Um conceito de picape que explora um visual moderno, robustez e versatilidade.",
        imagem: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85",
        tipo: "Picape conceito",
        proposta: "Versatilidade e estilo",
        motorizacao: "Consulte as especificações da versão",
        destaque: "Design robusto"
    },
    "volkswagen-tiguan": {
        nome: "Volkswagen Tiguan",
        marca: "VOLKSWAGEN",
        categoria: "SUV",
        descricao: "Um SUV voltado ao conforto, espaço interno e praticidade para viagens e uso diário.",
        imagem: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=85",
        tipo: "SUV",
        proposta: "Conforto e versatilidade",
        motorizacao: "Varia conforme a versão e o ano",
        destaque: "Espaço interno"
    },
    "porsche-911": {
        nome: "Porsche 911",
        marca: "PORSCHE",
        categoria: "Esportivo",
        descricao: "Um esportivo conhecido pelo design característico e pela tradição de desempenho da linha 911.",
        imagem: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=85",
        tipo: "Carro esportivo",
        proposta: "Desempenho e condução esportiva",
        motorizacao: "Varia conforme a versão",
        destaque: "Design icônico"
    },
    "bmw-m2": {
        nome: "BMW M2",
        marca: "BMW",
        categoria: "Esportivo",
        descricao: "Um cupê esportivo da linha M, com visual marcante e foco na experiência de condução.",
        imagem: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=85",
        tipo: "Cupê esportivo",
        proposta: "Desempenho e agilidade",
        motorizacao: "Varia conforme a versão e o ano",
        destaque: "Linha BMW M"
    },
    "gwm-haval-h6": {
        nome: "GWM Haval H6",
        marca: "GWM",
        categoria: "SUV híbrido",
        descricao: "Um SUV que oferece versões eletrificadas, combinando diferentes tecnologias de propulsão conforme a configuração.",
        imagem: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85",
        tipo: "SUV",
        proposta: "Tecnologia e conforto",
        motorizacao: "Há versões híbridas; consulte o ano e a configuração",
        destaque: "Eletrificação"
    },
    "byd-song-plus": {
        nome: "BYD Song Plus",
        marca: "BYD",
        categoria: "SUV híbrido",
        descricao: "Um SUV da BYD com proposta familiar e tecnologia híbrida plug-in em versões comercializadas como Song Plus DM-i.",
        imagem: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1400&q=85",
        tipo: "SUV",
        proposta: "Eficiência e conforto",
        motorizacao: "Híbrida plug-in nas versões DM-i",
        destaque: "Tecnologia híbrida"
    }
};


const arquivo = window.location.pathname
    .split("/")
    .pop()
    .replace(/\.html$/i, "")
    .trim()
    .toLowerCase();

const arquivo = window.location.pathname
    .split("/")
    .pop()
    .replace(/\.html$/i, "")
    .trim()
    .toLowerCase();

const carro = carros[arquivo];
const conteudo = document.getElementById("detalhe-carro");

console.log("Arquivo detectado:", arquivo);
console.log("Carro encontrado:", carro);

if (!carro) {
    document.title = "Carro não encontrado | CarZone";
    conteudo.innerHTML = `...`;
} else {
    // restante do código...
}
if (!carro) {
    document.title = "Carro não encontrado | CarZone";

    conteudo.innerHTML = `
        <section class="det-erro">
            <h1>Carro não encontrado</h1>
            <p>Não encontramos as informações deste veículo.</p>
            <a class="det-botao" href="../carros.html">Voltar para os carros</a>
        </section>
    `;
} else {
    document.title = `${carro.nome} | CarZone`;

    conteudo.innerHTML = `
        <a class="det-voltar" href="../carros.html">← Voltar para os carros</a>

        <section class="det-hero">
            <div class="det-texto">
                <span class="det-marca">${carro.marca}</span>
                <span class="det-categoria">${carro.categoria}</span>
                <h1>${carro.nome}</h1>
                <p>${carro.descricao}</p>
                <a class="det-botao" href="../comparar.html">
                    Comparar veículos →
                </a>
            </div>

            <div class="det-imagem">
                <img src="${carro.imagem}" alt="${carro.nome}">
            </div>
        </section>

        <section class="det-info">
            <span class="det-legenda">CONHEÇA O MODELO</span>
            <h2>Informações <span>do veículo</span></h2>

            <div class="det-grid">
                <article class="det-card">
                    <span>Categoria</span>
                    <h3>${carro.tipo}</h3>
                </article>

                <article class="det-card">
                    <span>Proposta</span>
                    <h3>${carro.proposta}</h3>
                </article>

                <article class="det-card">
                    <span>Motorização</span>
                    <h3>${carro.motorizacao}</h3>
                </article>

                <article class="det-card">
                    <span>Destaque</span>
                    <h3>${carro.destaque}</h3>
                </article>
            </div>

            <p class="det-aviso">
                Estas são informações gerais. As especificações técnicas
                podem variar conforme o ano e a versão do veículo.
            </p>
        </section>
    `;
}
