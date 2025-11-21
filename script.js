let cardContainer = document.querySelector(".card-container")
let inputBusca = document.querySelector("#input-busca")

let dados = []

async function iniciarBusca() {
    // Carrega os dados do JSON apenas se ainda não foram carregados
    if (dados.length == 0) {
        let resposta = await fetch("data.json")
        dados = await resposta.json()
    }

    // Pega o termo da busca e converte para minúsculas para uma busca case-insensitive
    let termoBusca = inputBusca.value.toLowerCase()

    // Filtra os dados com base no termo de busca
    let dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    )
    renderizarCards(dadosFiltrados)
}

function renderizarCards(dados) {
    // Limpa os cards existentes antes de renderizar os novos
    cardContainer.innerHTML = ""

    for (let dado of dados) {
        let article = document.createElement("article")
        article.classList.add("card")
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.data_criacao}</p>
            <p>${dado.descricao}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
            `            
        cardContainer.appendChild(article)
    }
}