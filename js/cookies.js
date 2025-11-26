document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("cookie-box");
    const btn = document.getElementById("cookie-accept");

    if (localStorage.getItem("cookieAccepted") === "true") {
      box.classList.add("hidden");
    }

    btn.addEventListener("click", () => {
      localStorage.setItem("cookieAccepted", "true");
      box.classList.add("hidden");
    });
  });
