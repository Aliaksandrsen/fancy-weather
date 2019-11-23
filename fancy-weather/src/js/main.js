import { Skycons } from './skycons';

// import { brotliDecompressSync } from 'zlib';


let latitude;
let longitude;
let stringForBackgroundresponse;


const weatherTime = document.getElementById('weatherTime');
const weatherTimeFirst = document.getElementById('weatherTimeFirst');
const weatherTimeSecond = document.getElementById('weatherTimeSecond');
const weatherTimeThird = document.getElementById('weatherTimeThird');

const weatherDescreption = document.getElementById('weatherDescreption');
const weatherDescreptionFirst = document.getElementById('weatherDescreptionFirst');
const weatherDescreptionSecond = document.getElementById('weatherDescreptionSecond');
const weatherDescreptionThird = document.getElementById('weatherDescreptionThird');

const degreeValue = document.getElementById('degreesValue');
const degreeValueFirst = document.getElementById('degreesValueFirst');
const degreeValueSecond = document.getElementById('degreesValueSecond');
const degreeValueThird = document.getElementById('degreesValueThird');

const degreesSymbol = document.getElementById('degreesSymbol');
const degreesSymbolFirst = document.getElementById('degreesSymbolFirst');
const degreesSymbolSecond = document.getElementById('degreesSymbolSecond');
const degreesSymbolThird = document.getElementById('degreesSymbolThird');


// const weatherToday = document.getElementById('weatherToday');
const F = document.getElementById('F');

// formatTime function
function formatTime(t) {
  const timeNow = new Date(t * 1000);
  const formatter = new Intl.DateTimeFormat('ru', { // en-US
    weekday: 'short',
    year: '2-digit',
    month: '2-digit',
    day: 'numeric',
    // hour: 'numeric',
    // minute: 'numeric',
  });

  const timeNowGoodFormat = formatter.format(timeNow);
  return timeNowGoodFormat;
}


function weatherInit() {
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  const proxy = 'https://cors-anywhere.herokuapp.com/';
  // const urlWithCoordinates = `${proxy}https://api.darksky.net/forecast/ef66892cfcce1b6b628ef03d7a7a6d3c/${latitude},${longitude}?lang=ru`; // en-US
  const urlWithCoordinates = `${proxy}https://api.darksky.net/forecast/2bf27985f5a6844febcdc43c99cc81ce/${latitude},${longitude}?lang=ru`;

  fetch(urlWithCoordinates)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      stringForBackgroundresponse = data.currently.icon;// !==============
      const {
        time,
        summary,
        icon,
        temperature,
      } = data.currently;

      const [, first, second, third] = data.daily.data;
      // console.log(first);


      // set DOM Elements from the API
      weatherTime.textContent = formatTime(time);
      weatherTimeFirst.textContent = formatTime(first.time);
      weatherTimeSecond.textContent = formatTime(second.time);
      weatherTimeThird.textContent = formatTime(third.time);

      weatherDescreption.textContent = summary;
      weatherDescreptionFirst.textContent = first.summary;
      weatherDescreptionSecond.textContent = second.summary;
      weatherDescreptionThird.textContent = third.summary;

      // degreeValue.textContent = Math.round(temperature);
      const temperature0 = Math.round(temperature);
      const temperature1 = Math.round((first.temperatureMin + first.temperatureMax) / 2);
      // degreeValueFirst.textContent = temperature1;
      const temperature2 = Math.round((second.temperatureMin + second.temperatureMax) / 2);
      // degreeValueSecond.textContent = temperature2;
      const temperature3 = Math.round((third.temperatureMin + third.temperatureMax) / 2);
      // degreeValueThird.textContent = temperature3;

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
      setIcons(icon, document.getElementById('icon'));
      setIcons(first.icon, document.getElementById('icon1'));
      setIcons(second.icon, document.getElementById('icon2'));
      setIcons(third.icon, document.getElementById('icon3'));


      // Change temperature to Celsius/Farenheit
      F.addEventListener('click', () => {
        if (degreesSymbol.textContent === '°F') {
          degreesSymbol.textContent = '°C';
          degreesSymbolFirst.textContent = '°C';
          degreesSymbolSecond.textContent = '°C';
          degreesSymbolThird.textContent = '°C';

          degreeValue.textContent = celsius;
          degreeValueFirst.textContent = celsius1;
          degreeValueSecond.textContent = celsius2;
          degreeValueThird.textContent = celsius3;
        } else {
          degreesSymbol.textContent = '°F';
          degreesSymbolFirst.textContent = '°F';
          degreesSymbolSecond.textContent = '°F';
          degreesSymbolThird.textContent = '°F';

          degreeValue.textContent = temperature0;
          degreeValueFirst.textContent = temperature1;
          degreeValueSecond.textContent = temperature2;
          degreeValueThird.textContent = temperature3;
        }
      });
    });
}

// если все good c navigator
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

    weatherInit();
  });
}

// если нет navigator
if (!navigator.geolocation) {
  window.addEventListener('load', () => {
    const urlWithCoordinatesForIpinfo = 'https://ipinfo.io/json?token=a3d4d591bf436c';

    fetch(urlWithCoordinatesForIpinfo)
      .then((response) => response.json())
      .then((data) => {
        const coordinates = data.loc.split(',');
        [latitude, longitude] = [...coordinates];
        weatherInit();
      });
  });
}

export { latitude, longitude, stringForBackgroundresponse };
