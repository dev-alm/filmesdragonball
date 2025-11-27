// caminho relativo do JSON (ajuste se necessário)
const JSON_PATH = "../beyblade/episodios.json";

fetch(JSON_PATH)
  .then((res) => {
    if (!res.ok) throw new Error("Não foi possível carregar episodios.json");
    return res.json();
  })
  .then((episodios) => {
    const container = document.getElementById("lista-episodios");

    episodios.forEach((ep) => {
      const div = document.createElement("div");
      div.className = "capa-filme";

      // link para a página única, passando id via query param
      div.innerHTML = `
        <a href="../beyblade/ep-beyblade.html?ep=${ep.id}">
          <img src="${ep.capa}" alt="${ep.titulo}">
        </a>
      `;

      container.appendChild(div);
    });
  })
  .catch((err) => {
    console.error(err);
    const container = document.getElementById("lista-episodios");
    container.innerHTML = "<p>Erro ao carregar episódios.</p>";
  });
