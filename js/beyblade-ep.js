// /js/beyblade-ep.js
(() => {
  const JSON_PATH = "../beyblade/episodios.json";

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function qs(id) {
    return document.getElementById(id);
  }

  const epId = getQueryParam("ep");

  // elementos
  const poster = qs("poster-ep");
  const playBtn = qs("play-btn");
  const embedPlayer = qs("embed-player");

  const tituloEp = qs("titulo-ep");
  const subtituloEp = qs("subtitulo-ep");
  const tituloCompleto = qs("titulo-completo");
  const tituloJap = qs("titulo-jap");
  const sinopse = qs("sinopse-ep");
  const dataEp = qs("data-ep");
  const duracaoEp = qs("duracao-ep");
  const generoEp = qs("genero-ep");
  const classifEp = qs("classif-ep");

  let currentEpisode = null;

  if (!epId) {
    tituloEp.textContent = "Erro: nenhum episódio selecionado";
    subtituloEp.textContent = "Volte para a lista e escolha um episódio.";
    document.querySelector("main.t-padrao").style.display = "none";
    return;
  }

  fetch(JSON_PATH)
    .then((res) => {
      if (!res.ok) throw new Error("Não foi possível carregar episodios.json");
      return res.json();
    })
    .then((lista) => {
      const ep = lista.find((e) => String(e.id) === String(epId));
      if (!ep) {
        tituloEp.textContent = "Episódio não encontrado";
        subtituloEp.textContent = "Verifique a lista e tente novamente.";
        return;
      }

      currentEpisode = ep;

      // preenche infos
      tituloEp.textContent = ep.tituloAnime || "Título não definido";
      tituloCompleto.textContent = ep.titulo || "—";
      tituloJap.textContent = ep.titulo_jap || "";
      sinopse.textContent = ep.descricao || "Sinopse indisponível.";
      dataEp.textContent = ep.data || "—";
      duracaoEp.textContent = ep.duracao || "—";
      generoEp.textContent = ep.genero || "—";
      classifEp.textContent = ep.classificacao || "—";

      // capa específica do player
      poster.src = ep.capa_player || ep.capa || "";
      poster.alt = ep.titulo || "Capa do episódio";

      // iframe começa invisível
      embedPlayer.style.display = "none";
      
      // se não tiver embed, deixa só a capa
      if (!ep.embed) return;

      playBtn.addEventListener("click", () => {
  if (!currentEpisode) return;

  // insere o iframe do JSON dentro da div
  embedPlayer.innerHTML = currentEpisode.embed;

  // garante que autoplay=1 esteja presente
  const iframe = embedPlayer.querySelector("iframe");
  if (iframe) {
    const url = new URL(iframe.src, location.href);
    url.searchParams.set("autoplay", "1");
    iframe.src = url.toString();
  }

  embedPlayer.style.display = "";
  poster.style.display = "none";
  playBtn.style.display = "none";
});

    })
    .catch((err) => {
      console.error(err);
      tituloEp.textContent = "Erro ao carregar dados";
      subtituloEp.textContent = "Confira o console para mais detalhes.";
    });
})();
