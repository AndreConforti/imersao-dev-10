// Boa prática: Executar o script após o DOM estar completamente carregado.
document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector(".card-container");
    const inputBusca = document.querySelector("#input-busca");
    const botaoBusca = document.querySelector("#botao-busca");

    let dados = [];

    // Função para buscar os dados e iniciar a aplicação
    async function inicializar() {
        try {
            const resposta = await fetch("data.json");
            dados = await resposta.json();
            renderizarCards(dados); // Exibe todos os filmes inicialmente
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
            cardContainer.innerHTML = "<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>";
        }
    }

    function realizarBusca() {
        const termoBusca = inputBusca.value.toLowerCase();

        const dadosFiltrados = dados.filter(filme =>
            filme.titulo.toLowerCase().includes(termoBusca) ||
            filme.sinopse.toLowerCase().includes(termoBusca) ||
            filme.diretor.toLowerCase().includes(termoBusca) ||
            filme.generos.some(genero => genero.toLowerCase().includes(termoBusca))
        );
        renderizarCards(dadosFiltrados);
    }

    function renderizarCards(filmes) {
        cardContainer.innerHTML = "";

        filmes.forEach(filme => {
            const article = document.createElement("article");
            article.innerHTML = `
                <img src="${filme.poster}" alt="Pôster do filme ${filme.titulo}" class="poster">
                <h2>${filme.titulo}</h2>
                <p><strong>Ano:</strong> ${filme.ano} | <strong>Diretor:</strong> ${filme.diretor}</p>
                <p><strong>Gêneros:</strong> ${filme.generos.join(", ")}</p>
                <p>${filme.sinopse}</p>
                <a href="${filme.link}" target="_blank">Ver no IMDB</a>
            `;
            cardContainer.appendChild(article);
        });
    }

    // Boa prática: Adicionar event listeners no JavaScript
    botaoBusca.addEventListener('click', realizarBusca);
    inputBusca.addEventListener('keyup', (event) => {
        // Realiza a busca ao pressionar Enter
        if (event.key === 'Enter') {
            realizarBusca();
        }
    });

    // Inicia a aplicação
    inicializar();
});