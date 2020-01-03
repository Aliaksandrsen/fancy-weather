import ymaps from 'ymaps';
import { longitude, latitude } from './main';
import degToDms from './degToDms';

function mapInit() {
  const YMAPS_KEY = 'e1d2fdeb-5a51-4d55-a96b-99d83404c3d3';
  ymaps
    .load(`https://api-maps.yandex.ru/2.1/?apikey=${YMAPS_KEY}&load=package.full&lang=en_RU`)
    .then((maps) => {
      const myMap = new maps.Map('map', {
        center: [latitude, longitude],
        zoom: 10,
        controls: [],
      });
    });
}


function longitudeLatitudeInit() {
  const longitudeDms = degToDms(longitude);
  const latitudeDms = degToDms(latitude);
  const latitudeWithMinute = document.querySelector('#latitudeWithMinute');
  const longitudeWithMinute = document.querySelector('#longitudeWithMinute');

  const lang = localStorage.getItem('lang') || 'english';

  if (lang === 'english') {
    latitudeWithMinute.textContent = `Latitude: ${latitudeDms}`;
    longitudeWithMinute.textContent = `Longitude: ${longitudeDms}`;
  }
  if (lang === 'russian') {
    latitudeWithMinute.textContent = `Широта: ${latitudeDms}`;
    longitudeWithMinute.textContent = `Долгота: ${longitudeDms}`;
  }
  if (lang === 'belarusian') {
    latitudeWithMinute.textContent = `Шырата: ${latitudeDms}`;
    longitudeWithMinute.textContent = `Даўгата: ${longitudeDms}`;
  }
}


export { mapInit, longitudeLatitudeInit, degToDms };
