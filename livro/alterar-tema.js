const btn = document.querySelector('#trocarTema');

btn.addEventListener('click',function() {
  btn.classList.toggle('page');
  btn.classList.toggle('page-green');

  btn.classList.toggle('chapter');
  btn.classList.toggle('chapter-green');

  btn.classList.toggle('controls');
  btn.classList.toggle('controls-green');

  btn.classList.toggle('footer-livro');
  btn.classList.toggle('footer-livro-green');
});
