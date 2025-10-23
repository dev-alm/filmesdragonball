async function carregarPersonagens() {
  try {
    const resposta = await fetch("api/personagens.json");
    if (!resposta.ok) throw new Error("Erro ao carregar personagens");

    const personagens = await resposta.json();
    const container = document.querySelector(".filme");
    container.innerHTML = "";

    personagens.forEach((p) => {
      const card = document.createElement("div");
      card.classList.add("capa-filme");

      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="${p.image || 'assets/personagens/default.jpg'}" alt="${p.name || 'Desconhecido'}">
          </div>
          <div class="flip-card-back">
            <h3 class="personagem-nome">${p.name || 'Desconhecido'}</h3>
            <p class="personagem-raca">Raça: ${p.race || 'Desconhecida'}</p>
            ${p.transform ? `<p class="personagem-transform">Transformações: ${p.transform}</p>` : ''}
            <p class="personagem-ki">Ki: ${p.ki || 'Desconhecido'}</p>
            <p class="personagem-descricao">${p.description || 'Sem descrição'}</p>
            <!-- Se quiser adicionar algum campo extra, faz aqui manualmente -->
            <!-- ex: <p class="personagem-planeta">Planeta: ${p.planeta}</p> -->
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        card.querySelector(".flip-card-inner").classList.toggle("flipped");
      });

      container.appendChild(card);
    });
  } catch (erro) {
    console.error("Erro:", erro);
    document.querySelector(".filme").innerHTML =
      "<p style='color:red;'>Erro ao carregar personagens.</p>";
  }
}

document.addEventListener("DOMContentLoaded", carregarPersonagens);
