import { Skycons } from './skycons';


window.addEventListener('load', () => {
  let longitude;
  let latitude;
  const temperatureDescreption = document.querySelector('.temperature-description');
  const temperatureDegree = document.querySelector('.temperature-degree');
  const locationTimezone = document.querySelector('.location__timezone');
  const temperatureSection = document.querySelector('.temperature-today');
  const temperatureSpan = document.getElementById('degrees');


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const urlWithCoordinates = `${proxy}https://api.darksky.net/forecast/ef66892cfcce1b6b628ef03d7a7a6d3c/${latitude},${longitude}?lang=ru`;

      function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: 'white' });
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
      }

      fetch(urlWithCoordinates)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          // set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescreption.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // Formula for celsius
          const celsius = (temperature - 32) * (5 / 9);
          // Set Icon
          setIcons(icon, document.querySelector('#icon'));

          // Change temperature to Celsius/Farenheit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === '°F') {
              temperatureSpan.textContent = '°C';
              temperatureDegree.textContent = Math.floor(celsius * 100) / 100;
            } else {
              temperatureSpan.textContent = '°F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }
});

