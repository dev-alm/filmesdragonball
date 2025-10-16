document.querySelectorAll('.iframe-capa').forEach((capa) => {
  capa.addEventListener('click', () => {
    capa.style.display = 'none';
    const iframe = capa.nextElementSibling;
    const src = iframe.getAttribute('src');
    iframe.setAttribute('src', src + '?autoplay=1');
  });
});