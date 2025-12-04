const btn = document.getElementById("trocarTema");

btn.addEventListener("click", () => {
  const page = document.querySelector(".page");
  const chapter = document.querySelector(".chapter");
  const controls = document.querySelector(".controls, .controls-green");
  const footerLivro = document.querySelector(".footer-livro, .footer-livro-green");
  const btn3 = document.querySelector(".btn-l-03, .btn-l-01");
  const wpp = document.querySelector(".bglivro, .bglivro-green");
  const menu = document.querySelector(".menu-livro, .menu-livro-green");

 if (!btn3) return;

  if (btn3.classList.contains("btn-l-03")) {
    btn3.classList.replace("btn-l-03", "btn-l-01");
  } else {
    btn3.classList.replace("btn-l-01", "btn-l-03");
  }

  if (footerLivro.classList.contains("footer-livro")) {
    footerLivro.classList.replace("footer-livro", "footer-livro-green");
  } else {
    footerLivro.classList.replace("footer-livro-green", "footer-livro");
  }

  if (controls.classList.contains("controls")) {
    controls.classList.replace("controls", "controls-green");
  } else {
    controls.classList.replace("controls-green", "controls");
  }

  if (wpp.classList.contains("bglivro")) {
    wpp.classList.replace("bglivro", "bglivro-green");
  } else {
    wpp.classList.replace("bglivro-green", "bglivro");
  }

  if (menu.classList.contains("menu-livro")) {
    menu.classList.replace("menu-livro", "menu-livro-green");
  } else {
    menu.classList.replace("menu-livro-green", "menu-livro");
  }
});
