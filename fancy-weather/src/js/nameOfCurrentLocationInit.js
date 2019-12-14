import { longitude, latitude } from './main';

export default function nameOfCurrentLocationInit() {
  const country = document.querySelector('#country');
  const town = document.querySelector('#town');
  const OPENCAGEDATA_KEY = '7bc6b65308044f5282bbe768d6bc320c';
  const lang = localStorage.getItem('lang') || 'english';

  let language = 'en';
  if (lang === 'english') language = 'en';
  if (lang === 'russian') language = 'ru';
  if (lang === 'belarusian') language = 'be';

  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGEDATA_KEY}&language=${language}&pretty=1`)
    .then((response) => response.json())
    .then((data) => {
      const countryFromAPI = data.results[0].components.country || ' ';
      const townFromAPI = data.results[0].components.city
        || data.results[0].components.town
        || data.results[0].components.village
        || ' ';

      country.textContent = `${countryFromAPI}`;
      town.textContent = `${townFromAPI}`;
    });
}
