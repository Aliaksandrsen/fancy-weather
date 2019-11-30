export default function hoursAndMinutesInit(timezone) {
  const weatherHoursAndMinutes = document.getElementById('weatherHoursAndMinutes');
  const weatherTime = document.getElementById('weatherTime');
  const lang = localStorage.getItem('lang') || 'english';

  let language = 'en';
  if (lang === 'english') language = 'en';
  if (lang === 'russian') language = 'ru';
  if (lang === 'belarusian') language = 'be';

  const timeNow = new Date();
  const formatter1 = new Intl.DateTimeFormat(`${language}`, {
    timeZone: `${timezone}`,
    hour: '2-digit',
    minute: '2-digit',
  });

  const formatter2 = new Intl.DateTimeFormat(`${language}`, {
    timeZone: `${timezone}`,
    weekday: 'short',
    year: '2-digit',
    month: '2-digit',
    day: 'numeric',
  });

  const timeNowGoodFormatHoursAndMinutes = formatter1.format(timeNow);
  const timeNowGoodFormatweatherTime = formatter2.format(timeNow);
  weatherHoursAndMinutes.textContent = `${timeNowGoodFormatHoursAndMinutes}`;
  weatherTime.textContent = `${timeNowGoodFormatweatherTime}`;
}
