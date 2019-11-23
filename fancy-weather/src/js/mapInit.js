import ymaps from 'ymaps';
import { longitude, latitude } from './main';

// be_BY — белорусский;
// ru_Ru — русский;
// en_RU — ответ на английском, российские особенности карты;
// en_US — ответ на английском, американские особенности карты;
ymaps
  .load('https://api-maps.yandex.ru/2.1/?apikey=e1d2fdeb-5a51-4d55-a96b-99d83404c3d3&load=package.full&lang=ru_RU')
  .then((maps) => {
    // eslint-disable-next-line no-unused-vars
    const myMap = new maps.Map('map', {
      center: [latitude, longitude],
      zoom: 10,
      controls: ['geolocationControl'],
    });
  });

const mapWrapper = document.getElementById('mapWrapper');

function degToDms(deg) {
  let d = Math.floor(deg);
  const minfloat = (deg - d) * 60;
  let m = Math.floor(minfloat);
  const secfloat = (minfloat - m) * 60;
  let s = Math.round(secfloat);
  // After rounding, the seconds might become 60. These two
  // if-tests are not necessary if no rounding is done.
  if (s === 60) {
    m = 1 + m;
    s = 0;
  }
  if (m === 60) {
    d = 1 + d;
    m = 0;
  }
  return (`${d}° ${m}" ${s}'`);
}


window.addEventListener('load', () => {
  const longitudeDms = degToDms(longitude);
  const latitudeDms = degToDms(latitude);
  mapWrapper.insertAdjacentHTML('afterend', `<p class="longitude-with-minute" id="longitudeWithMinute">Долгота ${longitudeDms}</p>`);

  mapWrapper.insertAdjacentHTML('afterend', `<p class="latitude-with-minute" id="latitudeWithMinute">Широта ${latitudeDms}</p>`);
});
