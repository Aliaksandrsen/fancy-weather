function backgroundInit() {
  async function getLinkToImage() {
    // document.getElementById('inputText').value ||
    // const informationInInput = 'Minsk';
    // TODO or portrait
    // const url = `https://api.unsplash.com/photos/random?query=town,${informationInInput}&client_id=97468db9ac3f46aba050edeb6ee94ee6c2fa732c4970c3d260cdbf50156a6f44`;
    const url = 'https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17';
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    const urlImg = data.urls.regular;
    document.body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('${urlImg}')`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = '100vw 100vh';
  }
  getLinkToImage();
}
//! backgroundInit();

document.getElementById('loadBackground').addEventListener('click', backgroundInit);
