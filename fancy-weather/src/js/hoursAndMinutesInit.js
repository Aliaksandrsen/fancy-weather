const weatherHoursAndMinutes = document.getElementById('weatherHoursAndMinutes');

function getHoursAndMinutes() {
  const timeNow = new Date();
  const formatter = new Intl.DateTimeFormat('ru', { // en-US
    // weekday: 'short',
    // year: '2-digit',
    // month: '2-digit',
    // day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const timeNowGoodFormat = formatter.format(timeNow);
  weatherHoursAndMinutes.textContent = `${timeNowGoodFormat}`;
}

setInterval(() => {
  getHoursAndMinutes();
}, 1000);
