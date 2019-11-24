window.addEventListener('load', () => {
  const btn = document.getElementById('loadBackground');
  btn.addEventListener('click', () => {
    btn.children[0].classList.add('spin-animation');
    setTimeout(() => {
      btn.children[0].classList.remove('spin-animation');
    }, 500);
  });
});
