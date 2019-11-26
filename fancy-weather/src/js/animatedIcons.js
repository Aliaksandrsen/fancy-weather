window.addEventListener('load', () => {
  const btn1 = document.getElementById('loadBackground');
  const btn2 = document.getElementById('searchButton');

  btn1.addEventListener('click', () => {
    btn1.children[0].classList.add('spin-animation');
    setTimeout(() => {
      btn1.children[0].classList.remove('spin-animation');
    }, 500);
  });

  btn2.addEventListener('click', () => {
    btn2.children[0].classList.add('spin-animation');
    setTimeout(() => {
      btn2.children[0].classList.remove('spin-animation');
    }, 500);
  });
});
