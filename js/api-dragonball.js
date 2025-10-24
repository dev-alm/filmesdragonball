let todosPersonagens = []; // armazena todos os personagens carregados

async function carregarPersonagens() {
  try {
    const resposta = await fetch("api/personagens.json");
    if (!resposta.ok) throw new Error("Erro ao carregar personagens");

    todosPersonagens = await resposta.json(); // salva todos

    mostrarPersonagens(todosPersonagens);
  } catch (erro) {
    console.error("Erro:", erro);
    document.querySelector(".cards-container").innerHTML = "<p style='color:red;'>Erro ao carregar personagens.</p>";
  }
}

function mostrarPersonagens(personagens) {
  const container = document.querySelector(".cards-container");
  container.innerHTML = "";

  personagens.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("card-personagens");

    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="${p.image || "assets/personagens/default.jpg"}" alt="${p.name || "Desconhecido"}">
        </div>
        <div class="flip-card-back">
          <h3 class="personagem-nome">${p.name || "Desconhecido"}</h3>
          ${p.nomeJapones ? `<p class="personagem-japones"><span class="label-json">Nome Japonês:</span> <span class="valor-json">${p.nomeJapones}</span></p>` : ""}
          ${p.race ? `<p class="personagem-raca"><span class="label-json">Raça:</span> <span class="valor-json">${p.race}</span></p>` : ""}
${p.transform ? `<p class="personagem-transform"><span class="label-json">Transformações:</span> <span class="valor-json">${p.transform}</span></p>` : ""}
${p["melhor tecnica"] ? `<p class="personagem-tecnica"><span class="label-json">Melhor técnica:</span> <span class="valor-json">${p["melhor tecnica"]}</span></p>` : ""}
${p.planetaNatal ? `<p class="personagem-planeta"><span class="label-json">Planeta Natal:</span> <span class="valor-json">${p.planetaNatal}</span></p>` : ""}
${p.descricao ? `<p class="personagem-descricao"><span class="label-json"></span> <span class="valor-json">${p.descricao}</span></p>` : ""}
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      card.querySelector(".flip-card-inner").classList.toggle("flipped");
    });

    container.appendChild(card);
  });
}

// Evento de pesquisa
document.getElementById("inputPesquisa").addEventListener("input", (e) => {
  const filtro = e.target.value.toLowerCase();
  const filtrados = todosPersonagens.filter((p) => p.name.toLowerCase().includes(filtro));
  mostrarPersonagens(filtrados);
});

document.addEventListener("DOMContentLoaded", carregarPersonagens);
