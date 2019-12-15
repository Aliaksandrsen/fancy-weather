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
  let timeNowGoodFormatweatherTime = formatter2.format(timeNow);

  let arr;
  if (language === 'be') {
    arr = timeNowGoodFormatweatherTime.split(', ');
    switch (arr[0]) {
      case 'пн':
        arr[0] = 'пн';
        break;
      case 'вт':
        arr[0] = 'аў';
        break;
      case 'ср':
        arr[0] = 'ср';
        break;
      case 'чт':
        arr[0] = 'чц';
        break;
      case 'пт':
        arr[0] = 'пт';
        break;
      case 'сб':
        arr[0] = 'сб';
        break;
      case 'вс':
        arr[0] = 'нд';
        break;
      default:
        break;
    }
    timeNowGoodFormatweatherTime = arr.join(', ');
  }

  weatherHoursAndMinutes.textContent = `${timeNowGoodFormatHoursAndMinutes}`;
  weatherTime.textContent = `${timeNowGoodFormatweatherTime}`;
}
