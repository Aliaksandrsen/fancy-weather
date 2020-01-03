export default function showErrorLocationAccess(error) {
  const outputText = document.getElementById('output');
  const lang = localStorage.getItem('lang') || 'english';

  let message;

  switch (error.code) {
    case error.PERMISSION_DENIED:
      message = 'Please allow access to your Geolocation.';
      if (lang === 'russian') {
        message = 'Пожалуйста, разрешите доступ к вашей геолокации.';
      }
      if (lang === 'belarusian') {
        message = 'Калі ласка, дазвольце доступ да вашай геолокации.';
      }
      break;
    case error.POSITION_UNAVAILABLE:
      message = 'Location information is unavailable.';
      if (lang === 'russian') {
        message = 'Информация о местоположении недоступна.';
      }
      if (lang === 'belarusian') {
        message = 'Інфармацыя пра месцазнаходжанне недаступна.';
      }
      break;
    case error.TIMEOUT:
      message = 'The request to get user location timed out.';
      if (lang === 'russian') {
        message = 'Время ожидания запроса на получение местоположения пользователя истекло.';
      }
      if (lang === 'belarusian') {
        message = 'Час чакання запыту на атрыманне месцазнаходжання карыстальніка скончыўся.';
      }
      break;
    default:
      message = 'An unknown error occurred.';
      if (lang === 'russian') {
        message = 'Произошла неизвестная ошибка.';
      }
      if (lang === 'belarusian') {
        message = 'Узнікла  невядомая памылка.';
      }
      break;
  }


  outputText.innerHTML = `<div class="pane pane_error">
  <button class="remove-button">
  <i class="fa fa-times-circle" aria-hidden="true"></i>
  </button>
  <p id='message'>${message}</p>
  </div>`;
  const pane = document.querySelector('.pane');
  document.querySelector('.remove-button').onclick = () => pane.remove();
}
