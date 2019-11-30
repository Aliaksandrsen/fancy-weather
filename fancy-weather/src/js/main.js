import { mapInit, longitudeLatitudeInit } from './mapInit';
import { Skycons } from './skycons';
import hoursAndMinutesInit from './hoursAndMinutesInit';
import backgroundInit from './backgroundInit';
import nameOfCurrentLocationInit from './nameOfCurrentLocationInit';
import errorRequestInit from './showErrorSearchRequest';
import showErrorLocationAccess from './showErrorLocationAccess';


(function bannerInit() {
  const banner = document.createElement('div');
  banner.className = 'banner';
  document.body.prepend(banner);
}());

let latitude;
let longitude;
let stringForBackgroundresponse;
let lang = localStorage.getItem('lang') || 'english';
// flag background loaded or not
let backgroundInitFlag;
let timerId;

// formatTime function
function formatTime(t, timezone) {
  const timeNow = new Date(t * 1000);

  let language = 'en';
  if (lang === 'english') language = 'en';
  if (lang === 'russian') language = 'ru';
  if (lang === 'belarusian') language = 'be';

  const formatter = new Intl.DateTimeFormat(`${language}`, {
    timeZone: `${timezone}`,
    weekday: 'short',
    year: '2-digit',
    month: '2-digit',
    day: 'numeric',
  });

  const timeNowGoodFormat = formatter.format(timeNow);
  return timeNowGoodFormat;
}


function weatherInit() {
  const weatherTimeFirst = document.querySelector('#weatherTimeFirst');
  const weatherTimeSecond = document.querySelector('#weatherTimeSecond');
  const weatherTimeThird = document.querySelector('#weatherTimeThird');

  const weatherDescreption = document.querySelector('#weatherDescreption');
  const weatherDescreptionFirst = document.querySelector('#weatherDescreptionFirst');
  const weatherDescreptionSecond = document.querySelector('#weatherDescreptionSecond');
  const weatherDescreptionThird = document.querySelector('#weatherDescreptionThird');

  const degreeValue = document.querySelector('#degreesValue');
  const degreeValueFirst = document.querySelector('#degreesValueFirst');
  const degreeValueSecond = document.querySelector('#degreesValueSecond');
  const degreeValueThird = document.querySelector('#degreesValueThird');

  const degreesSymbol = document.querySelector('#degreesSymbol');
  const degreesSymbolFirst = document.querySelector('#degreesSymbolFirst');
  const degreesSymbolSecond = document.querySelector('#degreesSymbolSecond');
  const degreesSymbolThird = document.querySelector('#degreesSymbolThird');

  const F = document.querySelector('#F');
  const C = document.querySelector('#C');


  lang = localStorage.getItem('lang') || 'english';

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  let language = 'en';
  if (lang === 'english') language = 'en';
  if (lang === 'russian') language = 'ru';
  if (lang === 'belarusian') language = 'be';

  const proxy = 'https://cors-anywhere.herokuapp.com/';
  // const urlWithCoordinates = `${proxy}https://api.darksky.net/forecast/ef66892cfcce1b6b628ef03d7a7a6d3c/${latitude},${longitude}?lang=${language}`;
  const urlWithCoordinates = `${proxy}https://api.darksky.net/forecast/07caf5f6c2905a352907b13fb5b347a0/${latitude},${longitude}?lang=${language}`;

  fetch(urlWithCoordinates)
    .then((response) => response.json())
    .then((data) => {
      // time init
      clearInterval(timerId);
      timerId = setInterval(() => {
        hoursAndMinutesInit(data.timezone);
      }, 1000);

      stringForBackgroundresponse = data.currently.icon;
      // check background flag
      if (data.currently.icon !== backgroundInitFlag) {
        // after received the response => background initialization
        backgroundInit();
      }
      backgroundInitFlag = data.currently.icon;

      const {
        summary,
        icon,
        temperature,
      } = data.currently;

      const [, first, second, third] = data.daily.data;


      // set DOM Elements from the API
      weatherTimeFirst.textContent = formatTime(first.time, data.timezone);
      weatherTimeSecond.textContent = formatTime(second.time, data.timezone);
      weatherTimeThird.textContent = formatTime(third.time, data.timezone);

      weatherDescreption.textContent = summary;
      weatherDescreptionFirst.textContent = first.summary;
      weatherDescreptionSecond.textContent = second.summary;
      weatherDescreptionThird.textContent = third.summary;

      const temperature0 = Math.round(temperature);
      const temperature1 = Math.round((first.temperatureMin + first.temperatureMax) / 2);
      const temperature2 = Math.round((second.temperatureMin + second.temperatureMax) / 2);
      const temperature3 = Math.round((third.temperatureMin + third.temperatureMax) / 2);

      // Formula for celsius
      const celsius = Math.round((temperature0 - 32) * (5 / 9));
      degreeValue.textContent = Math.round(celsius);
      const celsius1 = Math.round((temperature1 - 32) * (5 / 9));
      degreeValueFirst.textContent = celsius1;
      const celsius2 = Math.round((temperature2 - 32) * (5 / 9));
      degreeValueSecond.textContent = celsius2;
      const celsius3 = Math.round((temperature3 - 32) * (5 / 9));
      degreeValueThird.textContent = celsius3;

      // Set Icons
      setIcons(icon, document.querySelector('#icon'));
      setIcons(first.icon, document.querySelector('#icon1'));
      setIcons(second.icon, document.querySelector('#icon2'));
      setIcons(third.icon, document.querySelector('#icon3'));


      // Change temperature to Celsius/Farenheit
      function degreesInitF() {
        if ((localStorage.getItem('symbolOfDegrees')) === '°F') {
          degreesSymbol.textContent = '°F';
          degreesSymbolFirst.textContent = '°F';
          degreesSymbolSecond.textContent = '°F';
          degreesSymbolThird.textContent = '°F';

          degreeValue.textContent = temperature0;
          degreeValueFirst.textContent = temperature1;
          degreeValueSecond.textContent = temperature2;
          degreeValueThird.textContent = temperature3;
        }
      }
      F.addEventListener('click', () => {
        localStorage.setItem('symbolOfDegrees', '°F');
        degreesInitF();
      });
      degreesInitF();

      function degreesInitC() {
        if ((localStorage.getItem('symbolOfDegrees')) === '°C') {
          degreesSymbol.textContent = '°C';
          degreesSymbolFirst.textContent = '°C';
          degreesSymbolSecond.textContent = '°C';
          degreesSymbolThird.textContent = '°C';

          degreeValue.textContent = celsius;
          degreeValueFirst.textContent = celsius1;
          degreeValueSecond.textContent = celsius2;
          degreeValueThird.textContent = celsius3;
        }
      }
      C.addEventListener('click', () => {
        localStorage.setItem('symbolOfDegrees', '°C');
        degreesInitC();
      });
      degreesInitC();
    });
}

// if navigator is available
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

    weatherInit();
    nameOfCurrentLocationInit();
    longitudeLatitudeInit();
    mapInit();

    document.querySelector('.banner').remove();
  }, showErrorLocationAccess);
}

if (!navigator.geolocation) {
  window.addEventListener('load', () => {
    const urlWithCoordinatesForIpinfo = 'https://ipinfo.io/json?token=a3d4d591bf436c';

    fetch(urlWithCoordinatesForIpinfo)
      .then((response) => response.json())
      .then((data) => {
        const coordinates = data.loc.split(',');
        [latitude, longitude] = [...coordinates];
        weatherInit();
        nameOfCurrentLocationInit();
        longitudeLatitudeInit();
        mapInit();
      });
  });
}


// =================== language selection
const en = document.querySelector('#en');
function enInit() {
  localStorage.setItem('lang', 'english');
  weatherInit();
  nameOfCurrentLocationInit();
  longitudeLatitudeInit();
}
en.addEventListener('click', enInit);

const ru = document.querySelector('#ru');
function ruInit() {
  localStorage.setItem('lang', 'russian');
  weatherInit();
  nameOfCurrentLocationInit();
  longitudeLatitudeInit();
}
ru.addEventListener('click', ruInit);

const be = document.querySelector('#be');
function beInit() {
  localStorage.setItem('lang', 'belarusian');
  weatherInit();
  nameOfCurrentLocationInit();
  longitudeLatitudeInit();
}
be.addEventListener('click', beInit);
// ===================================


const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchInput');


// =================== search location
function nameOfSearchLocationInit() {
  lang = localStorage.getItem('lang') || 'english';
  const string = searchInput.value;

  let language = 'en_US';
  if (lang === 'english') language = 'en_US';
  if (lang === 'russian') language = 'ru_Ru';
  if (lang === 'belarusian') language = 'be_BY';

  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${string}&key=7bc6b65308044f5282bbe768d6bc320c&language=${language}&pretty=1`)
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        searchInput.value = '';
      }, 3000);

      longitude = data.results[0].geometry.lng;
      latitude = data.results[0].geometry.lat;
    })
    .then(() => {
      // после ответа сервера с погодой заново отрисовываем погоду
      weatherInit();
      nameOfCurrentLocationInit();
      // remove old map
      document.querySelector('.ymaps-2-1-75-map').remove();
      mapInit();
      longitudeLatitudeInit();
    })
    .catch(() => {
      errorRequestInit();
    });
}
searchButton.addEventListener('click', nameOfSearchLocationInit);
// =================================


// voice recognition
const voice = document.querySelector('#voice');
voice.addEventListener('click', () => {
  const recognition = new webkitSpeechRecognition();
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  if (lang === 'english') recognition.lang = 'en_US';
  if (lang === 'russian') recognition.lang = 'ru_Ru';
  if (lang === 'belarusian') recognition.lang = 'be_BY';
  recognition.maxAlternatives = 1;

  recognition.addEventListener('result', (e) => {
    const transcript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join();
    searchInput.value = transcript;
  });
  recognition.start();
  recognition.addEventListener('end', nameOfSearchLocationInit);
});
// =================================


export {
  latitude,
  longitude,
  stringForBackgroundresponse,
};
