const timeIsNow = new Date();

function getSeason(someMonth) {
  if (someMonth === '12' || someMonth === '1' || someMonth === '2') return 'winter';
  if (someMonth === '3' || someMonth === '4' || someMonth === '5') return 'spring';
  if (someMonth === '6' || someMonth === '7' || someMonth === '8') return 'summer';
  return 'autumn';
}

export default function getStringSeasonAndHourForImageRequest(timeNow) {
  const formatter1 = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
  });
  const formatter2 = new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
  });

  const hour = formatter1.format(timeNow);
  const monthNumber = formatter2.format(timeNow);

  const monthAndHour = `${getSeason(monthNumber)},${hour}`;
  return monthAndHour;
}

export { getStringSeasonAndHourForImageRequest, timeIsNow, getSeason };
