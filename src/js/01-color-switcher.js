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

btnStop.disabled = true;

function handlerStart () {
    btnStop.disabled = true;
    btnStop.disabled = false;

    intervalColor = setInterval(() => {
        bodyColor = getRandomHexColor()
    }, 1000);
}

function handlerStop () {
    clearInterval(intervalColor);

    btnStop.disabled = false;
    btnStop.disabled = true;
}


