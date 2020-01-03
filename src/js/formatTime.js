export default function formatTime(t, timezone) {
  const lang = localStorage.getItem('lang') || 'english';
  const timeNow = new Date(t * 1000);

  let language = 'en';
  if (lang === 'english') language = 'en';
  if (lang === 'russian') language = 'ru';
  if (lang === 'belarusian') language = 'be';

  const formatter = new Intl.DateTimeFormat(`${language}`, {
    timeZone: `${timezone}`,
    weekday: 'long',
    month: '2-digit',
    day: 'numeric',
  });

  const timeNowGoodFormat = formatter.format(timeNow);
  let arr;
  if (language === 'be') {
    arr = timeNowGoodFormat.split(', ');
    switch (arr[0]) {
      case 'понедельник':
        arr[0] = 'панядзелак';
        break;
      case 'вторник':
        arr[0] = 'аўторак';
        break;
      case 'среда':
        arr[0] = 'среда';
        break;
      case 'четверг':
        arr[0] = 'чацвер';
        break;
      case 'пятница':
        arr[0] = 'пятніца';
        break;
      case 'суббота':
        arr[0] = 'субота';
        break;
      case 'воскресенье':
        arr[0] = 'нядзеля';
        break;
      default:
        break;
    }
    const str = arr.join(', ');
    return str;
  }
  return timeNowGoodFormat;
}
