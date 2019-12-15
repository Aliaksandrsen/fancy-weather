export default function formatTime(t, timezone) {
  const lang = localStorage.getItem('lang') || 'english';
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
  let arr;
  if (language === 'be') {
    arr = timeNowGoodFormat.split(', ');
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
    const str = arr.join(', ');
    return str;
  }
  return timeNowGoodFormat;
}
