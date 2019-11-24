import { longitude, latitude } from './main';

export default function nameOfLocationInit() {
  const country = document.getElementById('country');
  const town = document.getElementById('town');

  const lang = localStorage.getItem('lang') || 'english';

  let language = 'en_US';
  if (lang === 'english') language = 'en_US';
  if (lang === 'russian') language = 'ru_Ru';
  if (lang === 'belarusian') language = 'be_BY';

  fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=e1d2fdeb-5a51-4d55-a96b-99d83404c3d3&geocode=${longitude},${latitude}&kind=locality&results=1&lang=${language}`)
    .then((response) => response.json())
    .then((data) => {
      const countryFromAPI = data.response.GeoObjectCollection.featureMember[0].GeoObject.description.split(', ').pop();
      const townFromAPI = data.response.GeoObjectCollection.featureMember[0].GeoObject.name;

      country.textContent = `${countryFromAPI}`;
      town.textContent = `${townFromAPI}`;
    });
}


window.addEventListener('load', nameOfLocationInit);
