// const cards = document.querySelectorAll(".card-personagens");
// const overlay = document.querySelector(".overlay-personagem");
// const frente = overlay.querySelector(".card-frente img");
// const versoNome = overlay.querySelector(".nome-personagem");
// const versoInfo = overlay.querySelector(".info-personagem");
// const fechar = overlay.querySelector(".fechar-overlay");

// cards.forEach((card) => {
//   card.addEventListener("click", () => {
//     // Pega os dados do card
//     const imgSrc = card.querySelector("img")?.src || "";
//     const nome = card.querySelector(".personagem-nome")?.textContent || "Desconhecido";
//     const info = card.querySelector(".descricao-personagem")?.textContent || "Sem informações disponíveis.";

//     // Preenche o overlay
//     frente.src = imgSrc;
//     versoNome.textContent = nome;
//     versoInfo.textContent = info;

//     // Mostra o overlay
//     overlay.classList.add("ativo");
//   });
// });

// fechar.addEventListener("click", () => overlay.classList.remove("ativo"));
// overlay.addEventListener("click", (e) => {
//   if (e.target === overlay) overlay.classList.remove("ativo");
// });
