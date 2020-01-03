export default function errorRequestInit() {
  const outputText = document.getElementById('output');

  const lang = localStorage.getItem('lang') || 'english';

  let message = 'Please enter a valid request.';
  if (lang === 'russian') {
    message = 'Пожалуйста, введите правильный запрос.';
  }
  if (lang === 'belarusian') {
    message = 'Калі ласка, увядзіце сапраўдны запыт.';
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
