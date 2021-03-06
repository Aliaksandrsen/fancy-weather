import { mapInit, longitudeLatitudeInit } from './mapInit';
import { Skycons } from './skycons';
import hoursAndMinutesInit from './hoursAndMinutesInit';
import backgroundInit from './backgroundInit';
import nameOfCurrentLocationInit from './nameOfCurrentLocationInit';
import errorRequestInit from './showErrorSearchRequest';
import showErrorLocationAccess from './showErrorLocationAccess';
import formatTime from './formatTime';
import fahrenheitToCelsius from './fahrenheitToCelsius';
import getAverageTemperature from './getAverageTemperature';
import iconNameDashToIconNameUpperCase from './iconNameDashToIconNameUpperCase';
import template from './pageTemplate';
import { windSpeedAndHumidityInit } from './windSpeedAndHumidityInit';
import apparentTemperatureLabelInit from './apparentTemperatureLabelInit';

// template init
document.querySelector('#wrapper').innerHTML = `${template}`;

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


function weatherInit() {
  const DARKSKY_KEY = 'ef66892cfcce1b6b628ef03d7a7a6d3c';

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
  const degreeValueApparent = document.querySelector('#degreesValueApparent');

  const degreesSymbol = document.querySelector('#degreesSymbol');
  const degreesSymbolFirst = document.querySelector('#degreesSymbolFirst');
  const degreesSymbolSecond = document.querySelector('#degreesSymbolSecond');
  const degreesSymbolThird = document.querySelector('#degreesSymbolThird');
  const degreesSymbolApparent = document.querySelector('#degreesSymbolApparent');

  const F = document.querySelector('#F');
  const C = document.querySelector('#C');


  lang = localStorage.getItem('lang') || 'english';

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = iconNameDashToIconNameUpperCase(icon);

    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  let language = 'en';
  if (lang === 'english') language = 'en';
  if (lang === 'russian') language = 'ru';
  if (lang === 'belarusian') language = 'be';

  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const urlWithCoordinates = `${proxy}https://api.darksky.net/forecast/${DARKSKY_KEY}/${latitude},${longitude}?lang=${language}`;

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
        windSpeed,
        humidity,
        apparentTemperature,
      } = data.currently;

      windSpeedAndHumidityInit(windSpeed, humidity);

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
      const temperature1 = getAverageTemperature(first.temperatureMin, first.temperatureMax);
      const temperature2 = getAverageTemperature(second.temperatureMin, second.temperatureMax);
      const temperature3 = getAverageTemperature(third.temperatureMin, third.temperatureMax);
      const temperatureApparent = Math.round(apparentTemperature);

      // Formula for celsius
      const celsius = fahrenheitToCelsius(temperature0);
      degreeValue.textContent = celsius;
      const celsius1 = fahrenheitToCelsius(temperature1);
      degreeValueFirst.textContent = celsius1;
      const celsius2 = fahrenheitToCelsius(temperature2);
      degreeValueSecond.textContent = celsius2;
      const celsius3 = fahrenheitToCelsius(temperature3);
      degreeValueThird.textContent = celsius3;
      const celsiusApparent = fahrenheitToCelsius(apparentTemperature);
      degreeValueApparent.textContent = celsiusApparent;

      // Set Icons
      setIcons(icon, document.querySelector('#icon'));
      setIcons(first.icon, document.querySelector('#icon1'));
      setIcons(second.icon, document.querySelector('#icon2'));
      setIcons(third.icon, document.querySelector('#icon3'));


      // Change temperature to Celsius/Farenheit
      function degreesInitF() {
        const tempSymbol = localStorage.getItem('symbolOfDegrees') || '°C';
        if (tempSymbol === '°F') {
          degreesSymbol.textContent = '°F';
          degreesSymbolFirst.textContent = '°F';
          degreesSymbolSecond.textContent = '°F';
          degreesSymbolThird.textContent = '°F';
          degreesSymbolApparent.textContent = '°F';

          degreeValue.textContent = temperature0;
          degreeValueFirst.textContent = temperature1;
          degreeValueSecond.textContent = temperature2;
          degreeValueThird.textContent = temperature3;
          degreesValueApparent.textContent = temperatureApparent;
        }
      }
      F.addEventListener('click', () => {
        localStorage.setItem('symbolOfDegrees', '°F');
        degreesInitF();
      });
      degreesInitF();

      function degreesInitC() {
        const tempSymbol = localStorage.getItem('symbolOfDegrees') || '°C';
        if (tempSymbol === '°C') {
          degreesSymbol.textContent = '°C';
          degreesSymbolFirst.textContent = '°C';
          degreesSymbolSecond.textContent = '°C';
          degreesSymbolThird.textContent = '°C';
          degreesSymbolApparent.textContent = '°C';

          degreeValue.textContent = celsius;
          degreeValueFirst.textContent = celsius1;
          degreeValueSecond.textContent = celsius2;
          degreeValueThird.textContent = celsius3;
          degreesValueApparent.textContent = celsiusApparent;
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
    apparentTemperatureLabelInit();
    mapInit();

    document.querySelector('.banner').remove();
  }, showErrorLocationAccess);
}

if (!navigator.geolocation) {
  window.addEventListener('load', () => {
    const IPINFO_KEY = 'a3d4d591bf436c';
    const urlWithCoordinatesForIpinfo = `https://ipinfo.io/json?token=${IPINFO_KEY}`;

    fetch(urlWithCoordinatesForIpinfo)
      .then((response) => response.json())
      .then((data) => {
        const coordinates = data.loc.split(',');
        [latitude, longitude] = [...coordinates];

        weatherInit();
        nameOfCurrentLocationInit();
        longitudeLatitudeInit();
        apparentTemperatureLabelInit();
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
  apparentTemperatureLabelInit();
}
en.addEventListener('click', enInit);

const ru = document.querySelector('#ru');
function ruInit() {
  localStorage.setItem('lang', 'russian');
  weatherInit();
  nameOfCurrentLocationInit();
  longitudeLatitudeInit();
  apparentTemperatureLabelInit();
}
ru.addEventListener('click', ruInit);

const be = document.querySelector('#be');
function beInit() {
  localStorage.setItem('lang', 'belarusian');
  weatherInit();
  nameOfCurrentLocationInit();
  longitudeLatitudeInit();
  apparentTemperatureLabelInit();
}
be.addEventListener('click', beInit);
// ===================================


const searchButton = document.querySelector('#searchButton');
const searchInput = document.querySelector('#searchInput');


// =================== search location
function nameOfSearchLocationInit() {
  const OPENCAGEDATA_KEY = '7bc6b65308044f5282bbe768d6bc320c';
  lang = localStorage.getItem('lang') || 'english';
  const string = searchInput.value;

  let language = 'en_US';
  if (lang === 'english') language = 'en_US';
  if (lang === 'russian') language = 'ru_Ru';
  if (lang === 'belarusian') language = 'be_BY';

  if (searchInput.value.length > 1) {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${string}&key=${OPENCAGEDATA_KEY}&language=${language}&pretty=1`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          searchInput.value = '';
        }, 3000);

        longitude = data.results[0].geometry.lng;
        latitude = data.results[0].geometry.lat;
      })
      .then(() => {
        // after server weather response, we redraw the weather
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
}
searchButton.addEventListener('click', nameOfSearchLocationInit);
searchInput.addEventListener('keydown', (event) => {
  if (event.code === 'Enter' || event.code === 'NumpadEnter') {
    nameOfSearchLocationInit();
  }
});
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


document.querySelector('#loadBackground').addEventListener('click', () => {
  backgroundInit();
});


export {
  latitude,
  longitude,
  stringForBackgroundresponse,
  formatTime,
};
