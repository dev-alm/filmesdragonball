let todosPersonagens = [];

async function carregarPersonagens() {
  try {
    const resposta = await fetch("api/personagens.json");
    if (!resposta.ok) throw new Error("Erro ao carregar personagens");

    todosPersonagens = await resposta.json();
    mostrarPersonagens(todosPersonagens);
  } catch (erro) {
    console.error("Erro:", erro);
    document.querySelector(".cards-container-new").innerHTML =
      "<p style='color:red;'>Erro ao carregar personagens.</p>";
  }
}

function mostrarPersonagens(personagens) {
  const container = document.querySelector(".cards-container-new");
  container.innerHTML = "";

  personagens.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("card-personagens-new");
    card.innerHTML = `<img src="${p.image || "assets/personagens/default.jpg"}" alt="${p.name || "Desconhecido"}">`;

    card.addEventListener("click", () => abrirOverlay(p));
    container.appendChild(card);
  });
}

function abrirOverlay(personagem) {
  const overlay = document.querySelector(".overlay-personagem-new");
  const cardPrisma = overlay.querySelector(".flip-prisma");
  const cardInfo = overlay.querySelector(".card-info");
  const btnEsquerda = overlay.querySelector(".seta-esquerda");
  const btnDireita = overlay.querySelector(".seta-direita");
  overlay.classList.remove("hidden-new");

  // Limpa imagens antigas
  cardPrisma.innerHTML = "";

  const imagens = personagem.flips || [personagem.imageFront, personagem.imageBack];
  const totalFaces = imagens.filter(Boolean).length; // ignora undefined
  const radius = 175;

  // Cria as faces do prisma
  imagens.forEach((imgSrc, i) => {
    if (!imgSrc) return;
    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.transform = `rotateY(${i * (360 / totalFaces)}deg) translateZ(${radius}px)`;
    cardPrisma.appendChild(img);
  });

  // Controle de rotação
  let rotacaoAcumulada = 0;
  let indiceAtual = 0;
  cardPrisma.style.transform = `rotateY(${rotacaoAcumulada}deg)`;

  // Funções para girar
  function mostrarProximo() {
    indiceAtual = (indiceAtual + 1) % totalFaces;
    rotacaoAcumulada -= 360 / totalFaces;
    cardPrisma.style.transform = `rotateY(${rotacaoAcumulada}deg)`;
  }

  function mostrarAnterior() {
    indiceAtual = (indiceAtual - 1 + totalFaces) % totalFaces;
    rotacaoAcumulada += 360 / totalFaces;
    cardPrisma.style.transform = `rotateY(${rotacaoAcumulada}deg)`;
  }

  // Clique nas setas
  btnDireita.onclick = (e) => {
    e.stopPropagation();
    mostrarProximo();
  };
  btnEsquerda.onclick = (e) => {
    e.stopPropagation();
    mostrarAnterior();
  };

  // Atualiza info
  cardInfo.querySelector(".nome-personagem-new").textContent = personagem.name || "Desconhecido";
  cardInfo.querySelector(".info-personagem-new").innerHTML = `
  ${personagem.nomeJapones ? `<p class="personagem-japones"><span class="label-json">Nome Japonês:</span> <span class="valor-json">${personagem.nomeJapones}</span></p>` : ""}
  ${personagem.race ? `<p class="personagem-raca"><span class="label-json">Raça:</span> <span class="valor-json">${personagem.race}</span></p>` : ""}
  ${personagem.transform ? `<p class="personagem-transform"><span class="label-json">Transformações:</span> <span class="valor-json">${personagem.transform}</span></p>` : ""}
  ${personagem["melhor tecnica"] ? `<p class="personagem-tecnica"><span class="label-json">Melhor técnica:</span> <span class="valor-json">${personagem["melhor tecnica"]}</span></p>` : ""}
  ${personagem.planetaNatal ? `<p class="personagem-planeta"><span class="label-json">Planeta Natal:</span> <span class="valor-json">${personagem.planetaNatal}</span></p>` : ""}
  ${personagem.descricao ? `<p class="personagem-descricao"><span class="label-json"></span> <span class="valor-json">${personagem.descricao}</span></p>` : ""}
`;
}



// Fechar overlay
const overlay = document.querySelector(".overlay-personagem-new");
overlay.querySelector(".fechar-overlay-new").addEventListener("click", () => overlay.classList.add("hidden-new"));
overlay.addEventListener("click", (e) => {
  const cardsContainer = overlay.querySelector(".cards-centrais-new");
  if (!cardsContainer.contains(e.target)) overlay.classList.add("hidden-new");
});

// Pesquisa
document.getElementById("inputPesquisa").addEventListener("input", (e) => {
  const filtro = e.target.value.toLowerCase();
  const filtrados = todosPersonagens.filter((p) => p.name.toLowerCase().includes(filtro));
  mostrarPersonagens(filtrados);
});

document.addEventListener("DOMContentLoaded", carregarPersonagens);
