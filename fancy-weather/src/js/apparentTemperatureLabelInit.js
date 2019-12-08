export default function apparentTemperatureLabelInit() {
  const apparentTemperatureLabel = document.querySelector('#apparentTemperatureLabel');

  const lang = localStorage.getItem('lang') || 'english';

  if (lang === 'english') {
    apparentTemperatureLabel.textContent = 'Apparent Temperature:';
  }
  if (lang === 'russian') {
    apparentTemperatureLabel.textContent = 'Кажущаяся температура:';
  }
  if (lang === 'belarusian') {
    apparentTemperatureLabel.textContent = 'Уяўная тэмпература:';
  }
}
