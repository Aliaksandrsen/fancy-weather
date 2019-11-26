import { stringForBackgroundresponse } from './main';


export default function backgroundInit() {
  // делаю анализ для запроса background на основании англ локализации
  function getHours() {
    const timeNow = new Date();

    const formatter1 = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
    });
    const formatter2 = new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
    });

    const hour = formatter1.format(timeNow);
    const monthNumber = formatter2.format(timeNow);

    function getSeason(someMonth) {
      if (someMonth === '12' || someMonth === '1' || someMonth === '2') return 'winter';
      if (someMonth === '3' || someMonth === '4' || someMonth === '5') return 'spring';
      if (someMonth === '6' || someMonth === '7' || someMonth === '8') return 'summer';
      return 'autumn';
    }

    const monthAndHour = `${getSeason(monthNumber)},${hour}`;
    // console.log(monthAndHour);
    return monthAndHour;
  }

  async function getLinkToImage() {
    // определяем в какой ориентации загружать картинку
    let orientation = 'landscape';
    if (window.innerWidth < window.innerHeight) {
      orientation = 'portrait';
    }


    const informationForImage = `${stringForBackgroundresponse},${getHours()}`;
    // const url = `https://api.unsplash.com/photos/random?orientation=${orientation}&per_page=1&query=${informationForImage}&client_id=97468db9ac3f46aba050edeb6ee94ee6c2fa732c4970c3d260cdbf50156a6f44`;
    const url = `https://api.unsplash.com/photos/random?orientation=${orientation}&per_page=1&query=${informationForImage}&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17`;

    const response = await fetch(url);
    const data = await response.json();
    const urlImg = data.urls.regular;

    document.body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1) ), url('${urlImg}')`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = '100% 100vh';
  }
  getLinkToImage();
}


document.getElementById('loadBackground').addEventListener('click', () => {
  backgroundInit();
});
