let todosPersonagens = []; // armazena todos os personagens carregados

async function carregarPersonagens() {
  try {
    const resposta = await fetch("api/personagens.json");
    if (!resposta.ok) throw new Error("Erro ao carregar personagens");

    todosPersonagens = await resposta.json(); // salva todos

    mostrarPersonagens(todosPersonagens);
  } catch (erro) {
    console.error("Erro:", erro);
    document.querySelector(".filme").innerHTML =
      "<p style='color:red;'>Erro ao carregar personagens.</p>";
  }
}

function mostrarPersonagens(personagens) {
  const container = document.querySelector(".filme");
  container.innerHTML = "";

  personagens.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("card-personagens");

    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="${p.image || "assets/personagens/default.jpg"}" alt="${
      p.name || "Desconhecido"
    }">
        </div>
        <div class="flip-card-back">
          <h3 class="personagem-nome">${p.name || "Desconhecido"}</h3>
          <p class="personagem-raca">${p.race ? "Raça: " + p.race : ""}</p>
          ${
            p.transform
              ? `<p class="personagem-transform">Transformações: ${p.transform}</p>`
              : ""
          }
          <p class="personagem-ki">${p.ki ? "Ki: " + p.ki : ""}</p>
          <p class="personagem-descricao">${p.description || ""}</p>
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
  const filtrados = todosPersonagens.filter((p) =>
    p.name.toLowerCase().includes(filtro)
  );
  mostrarPersonagens(filtrados);
});

document.addEventListener("DOMContentLoaded", carregarPersonagens);
