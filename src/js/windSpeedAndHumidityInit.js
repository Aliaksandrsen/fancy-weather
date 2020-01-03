function mphToMetresPerSecond(n) {
  return Math.round(((n * 1.609) * 1000) / 3600);
}

function fractionToPercents(number) {
  return `${number * 100}%`;
}

function windSpeedAndHumidityInit(windSpeedNumber, humidityNumber) {
  const windSpeed = document.querySelector('#windSpeed');
  const humidity = document.querySelector('#humidity');

  const lang = localStorage.getItem('lang') || 'english';

  windSpeed.textContent = `Wind speed: ${Math.round(windSpeedNumber)}mph`;
  humidity.textContent = `Humidity: ${fractionToPercents(humidityNumber)}`;
  if (lang === 'russian') {
    windSpeed.textContent = `Скорость ветра: ${mphToMetresPerSecond(windSpeedNumber)}м/с`;
    humidity.textContent = `Влажность: ${fractionToPercents(humidityNumber)}`;
  }
  if (lang === 'belarusian') {
    windSpeed.textContent = `Хуткасць ветру: ${mphToMetresPerSecond(windSpeedNumber)}м/с`;
    humidity.textContent = `Вільготнасць: ${fractionToPercents(humidityNumber)}`;
  }
}

export {
  windSpeedAndHumidityInit,
  mphToMetresPerSecond,
  fractionToPercents,
};
