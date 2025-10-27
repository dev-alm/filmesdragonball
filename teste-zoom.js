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
  overlay.classList.remove("hidden-new");

  // Limpa imagens antigas
  cardPrisma.innerHTML = "";

  const imagens = personagem.flips || [personagem.imageFront, personagem.imageBack];
  const totalFaces = imagens.length;
  const radius = 175;

  // Cria as faces do prisma
  imagens.forEach((imgSrc, i) => {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.transform = `rotateY(${i * (360 / totalFaces)}deg) translateZ(${radius}px)`;
    cardPrisma.appendChild(img);
  });

  // **Reset da rotação sempre que abrir**
  let rotacaoAcumulada = 0;
  cardPrisma.style.transform = `rotateY(${rotacaoAcumulada}deg)`; // primeira face visível

  // Gira o prisma ao clicar
  cardPrisma.onclick = () => {
    rotacaoAcumulada -= 360 / totalFaces; 
    cardPrisma.style.transform = `rotateY(${rotacaoAcumulada}deg)`;
  };

  // Atualiza info
  cardInfo.querySelector(".nome-personagem-new").textContent = personagem.name || "Desconhecido";
  cardInfo.querySelector(".info-personagem-new").innerHTML = `
    ${personagem.nomeJapones ? `<p><strong>Nome Japonês:</strong> ${personagem.nomeJapones}</p>` : ""}
    ${personagem.race ? `<p><strong>Raça:</strong> ${personagem.race}</p>` : ""}
    ${personagem.transform ? `<p><strong>Transformações:</strong> ${personagem.transform}</p>` : ""}
    ${personagem["melhor tecnica"] ? `<p><strong>Melhor técnica:</strong> ${personagem["melhor tecnica"]}</p>` : ""}
    ${personagem.planetaNatal ? `<p><strong>Planeta Natal:</strong> ${personagem.planetaNatal}</p>` : ""}
    <p>${personagem.descricao || ""}</p>
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
