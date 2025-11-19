//EFEITO DE 360° NA DIV
const botao = document.getElementById("girar");
const tela = document.getElementById("tela");

let angulo = 0;

botao.addEventListener("click", () => {
  angulo += 360; // adiciona mais uma volta
  tela.style.transition = "transform 1s ease";
  tela.style.transform = `rotate(${angulo}deg)`;
});


//EFEITO DE 360° NO BODY
let angulo2 = 0;

document.getElementById("girar2").addEventListener("click", () => {
  angulo2 += 360; // sempre gira para o mesmo lado
  document.body.style.transform = `rotate(${angulo2}deg)`;
});


//MOSTRA O VÍDEO NA TELA E DEPOIS SOME
const botao3 = document.getElementById("mostrarVideo");
const box = document.getElementById("box-video");

let currentVideo = null; // guarda o elemento de vídeo atual

botao3.addEventListener("click", () => {
  // se não existe vídeo na tela, cria e toca
  if (!currentVideo) {
    showAndPlayVideo("assets/video/goku.mp4"); // <--- troque o caminho aqui
  } else {
    // se já existe, para e remove
    removeVideo();
  }
});

function showAndPlayVideo(src) {
  // limpa qualquer conteúdo antigo no box
  box.innerHTML = "";

  // cria o elemento de vídeo
  const video = document.createElement("video");
  video.id = "video";
  video.src = src;
  video.setAttribute("playsinline", ""); // mobile
  video.autoplay = true;
  video.controls = false; // se quiser controles mude pra true
  video.style.width = "100%";
  video.style.height = "100%";
  video.muted = false; // se preferir começar mudo: true

  // append e mostra o box
  box.appendChild(video);
  box.style.display = "block";

  // guarda referência e adiciona listener de 'ended'
  currentVideo = video;
  video.addEventListener("ended", onVideoEnded);

  // tenta tocar (alguns navegadores bloqueiam autoplay com som)
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch((err) => {
      // autoplay bloqueado: se quiser, pode tentar tocar mudo
      // video.muted = true; video.play();
      console.warn("Autoplay bloqueado pelo navegador:", err);
    });
  }
}

function onVideoEnded() {
  removeVideo();
}

function removeVideo() {
  if (!currentVideo) return;

  // limpa e pausa
  try {
    currentVideo.pause();
  } catch (e) {}
  currentVideo.currentTime = 0;

  // remove listener
  currentVideo.removeEventListener("ended", onVideoEnded);

  // remove do DOM
  if (currentVideo.parentNode) currentVideo.parentNode.removeChild(currentVideo);

  currentVideo = null;
  box.style.display = "none";
}

