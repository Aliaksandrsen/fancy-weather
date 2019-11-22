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
