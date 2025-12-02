
// document.addEventListener("contextmenu", e => {
//     e.preventDefault();
//     alert("Conteúdo protegido por direitos autorais.");
// });


// document.addEventListener("selectstart", e => e.preventDefault());


// document.addEventListener("keydown", e => {
//     if (
//         e.key === "PrintScreen" ||
//         (e.ctrlKey && ["c","x","s","u","p"].includes(e.key.toLowerCase())) ||
//         (e.ctrlKey && e.shiftKey && e.key === "I")
//     ) {
//         e.preventDefault();
//         alert("Ação bloqueada.");
//     }
// });


// document.addEventListener("keyup", e => {
//     if (e.key === "PrintScreen") {
//         navigator.clipboard.writeText("");
//         alert("Captura de tela bloqueada.");
//     }
// });


// document.addEventListener("touchstart", e => {
//     if (e.touches.length > 1) e.preventDefault();
// }, { passive:false });


// document.addEventListener("dragstart", e => e.preventDefault());




// const watermark = document.createElement("div");
// watermark.innerText = "PROTEGIDO POR DIREITOS AUTORAIS";
// Object.assign(watermark.style, {
//     position: "fixed",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%) rotate(-25deg)",
//     fontSize: "40px",
//     color: "rgba(255,255,255,0.12)",
//     pointerEvents: "none",
//     userSelect: "none",
//     zIndex: "9999",
//     whiteSpace: "nowrap",
//     fontWeight: "bold"
// });
// document.body.appendChild(watermark);