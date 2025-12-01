// BLOQUEIA BOTÃO DIREITO
document.addEventListener("contextmenu", e => {
    e.preventDefault();
    alert("Conteúdo protegido por direitos autorais.");
});

// BLOQUEIA SELEÇÃO
document.addEventListener("selectstart", e => e.preventDefault());

// BLOQUEIA ATALHOS
document.addEventListener("keydown", e => {
    if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && ["c","x","s","u","p"].includes(e.key.toLowerCase())) ||
        (e.ctrlKey && e.shiftKey && e.key === "I")
    ) {
        e.preventDefault();
        alert("Ação bloqueada.");
    }
});

// TENTA CANCELAR PRINTSCREEN NORMAL
document.addEventListener("keyup", e => {
    if (e.key === "PrintScreen") {
        navigator.clipboard.writeText("");
        alert("Captura de tela bloqueada.");
    }
});

// MOBILE — BLOQUEIA LONG PRESS
document.addEventListener("touchstart", e => {
    if (e.touches.length > 1) e.preventDefault();
}, { passive:false });

// BLOQUEIA DRAG
document.addEventListener("dragstart", e => e.preventDefault());



// ⚠️ ANTI-SCREENSHOT NÃO OFICIAL
// Se a aba perde foco, aplicar blur — dificulta Win+Shift+S
// window.addEventListener("blur", () => {
//     document.body.style.filter = "blur(10px)";
// });

// // Quando volta, limpa o blur
// window.addEventListener("focus", () => {
//     document.body.style.filter = "none";
// });


// MARCA D’ÁGUA DINÂMICA (dificulta prints)
const watermark = document.createElement("div");
watermark.innerText = "PROTEGIDO POR DIREITOS AUTORAIS";
Object.assign(watermark.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-25deg)",
    fontSize: "40px",
    color: "rgba(255,255,255,0.12)",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: "9999",
    whiteSpace: "nowrap",
    fontWeight: "bold"
});
document.body.appendChild(watermark);