import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const timerField = document.querySelectorAll('.value');

startBtn.disabled = true;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFields({ days, hours, minutes, seconds }) {
  timerField[0].textContent = addLeadingZero(days);
  timerField[1].textContent = addLeadingZero(hours);
  timerField[2].textContent = addLeadingZero(minutes);
  timerField[3].textContent = addLeadingZero(seconds);
}

function updateTimer() {
  const currentDate = Date.now();
  const endTime = flatpickCalendar.selectedDates[0].getTime();
  const remTime = endTime - currentDate;

  if (remTime <= 0) {
    clearInterval(timerInterval);
    updateTimerFields({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(remTime);
  updateTimerFields({ days, hours, minutes, seconds });
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = Date.now();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please, choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const flatpickCalendar = flatpickr('#datetime-picker', options);

let timerInterval;

startBtn.addEventListener('click', startTimer);

function startTimer() {
  startBtn.disabled = true;
  timerInterval = setInterval(updateTimer, 1000);
}
