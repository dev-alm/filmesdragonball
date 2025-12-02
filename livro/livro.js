const pageWrapper = document.getElementById("pageWrapper");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let paginas = [];
let index = 0;
const FLIP_TIME = 600; // ms, deve bater com transition no CSS

// função que renderiza o item atual (image ou chapter)
function renderPage(i) {
  const item = paginas[i];
  pageWrapper.innerHTML = ""; // limpa

  if (!item) return;

  if (item.type === "image") {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt || "Página imagem";
    pageWrapper.appendChild(img);
  } else if (item.type === "chapter" || item.type === "text") {
    const cont = document.createElement("div");
    cont.className = "chapter";

    if (item.title) {
      const h = document.createElement("h2");
      h.textContent = item.title;
      cont.appendChild(h);
    }

    // Se content for array de parágrafos ou string com \n\n
    if (Array.isArray(item.content)) {
      item.content.forEach((block) => {
  // Se for string -> parágrafo
  if (typeof block === "string") {
    const p = document.createElement("p");
    p.textContent = block;
    cont.appendChild(p);
  }

  // Se for imagem -> coloca a imagem no meio do texto
  else if (typeof block === "object" && block.type === "image") {
    const img = document.createElement("img");
    img.src = block.src;
    img.alt = block.alt || "Imagem";
    img.className = "inline-image"; // se quiser estilizar via CSS
    cont.appendChild(img);
  }
});

    }

    pageWrapper.appendChild(cont);
  } else {
    // caso genérico
    pageWrapper.textContent = String(item.content || "");
  }
}

// animação de flip -> troca o conteúdo no meio do flip
function goTo(nextIndex) {
  if (nextIndex < 0 || nextIndex >= paginas.length) return;

  // adiciona classe que faz girar
  pageWrapper.classList.add("flipping");

  // trocar conteúdo depois de metade da animação
  setTimeout(() => {
    index = nextIndex;
    renderPage(index);

    // volta a página ao normal (remove a rotação)
    pageWrapper.classList.remove("flipping");
  }, FLIP_TIME / 2);
}

nextBtn.addEventListener("click", () => {
  let nextIndex = index + 1;
  if (nextIndex >= paginas.length) nextIndex = 0; // volta ao começo (ou bloqueia)
  goTo(nextIndex);
});

prevBtn.addEventListener("click", () => {
  let prevIndex = index - 1;
  if (prevIndex < 0) prevIndex = paginas.length - 1; // volta pro fim (ou bloqueia)
  goTo(prevIndex);
});

// carrega o JSON e inicializa
fetch("../livro/livro.json")
  .then((res) => res.json())
  .then((data) => {
    paginas = data.paginas || [];
    if (paginas.length === 0) {
      pageWrapper.textContent = "Nenhuma página encontrada.";
      return;
    }
    index = 0;
    renderPage(index);
  })
  .catch((err) => {
    console.error(err);
    pageWrapper.textContent = "Erro ao carregar páginas.";
  });
