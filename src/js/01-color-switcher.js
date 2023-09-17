const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyColor = document.querySelector('body');

let intervalColor;

btnStart.addEventListener('click', handlerStart);
btnStop.addEventListener('click', handlerStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
// виношу два занчення в окрему функцію
function btnState() { // || (startDisabled)
  btnStart.disabled = true; // || startDisabled
  btnStop.disabled = !true; //|| !startDisabled вик-ю інверсію
}

// || btnState(true); // початковий стан

function handlerStart() {
  btnState(true);

  intervalColor = setInterval(() => {
    bodyColor.style.background = getRandomHexColor();
  }, 1000);
}

function handlerStop() {
  btnState(!true); //|| (false)

  clearInterval(intervalColor);
}
