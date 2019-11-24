const weatherHoursAndMinutes = document.getElementById('weatherHoursAndMinutes');

function hoursAndMinutesInit() {
  const timeNow = new Date();
  const formatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric',
  });

  const timeNowGoodFormat = formatter.format(timeNow);
  weatherHoursAndMinutes.textContent = `${timeNowGoodFormat}`;
}

setInterval(() => {
  hoursAndMinutesInit();
}, 1000);
