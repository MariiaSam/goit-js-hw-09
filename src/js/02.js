import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDates = selectedDates[0];
    const currentDate = new Date();

    if (selectedDates <= currentDate) {
      Notiflix.Notify.failure('Please, choose a date in the future');
    } else {
      startBtn.addEventListener('click', startTimer);
      startBtn.disabled = false;
    }
  },
};

const flatpickCalendar = flatpickr('#datetime-picker', options);

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

function startTimer() {
  startBtn.disabled = true;
  const timerField = document.querySelectorAll('.value');
  const endTime = flatpickCalendar.selectedDates[0].getTime();


function updateTimer() {
  const currentDate = new Date().getTime();
  const remTime = endTime - currentDate;

  if (remTime <= 0) {
    clearInterval(timerInterval);
    timerField.forEach(field => (field.textContent = '00'));
    return;
  }

const { days, hours, minutes, seconds } = convertMs(remTime);

timerField[0].textContent = addLeadingZero(days);
timerField[1].textContent = addLeadingZero(hours);
timerField[2].textContent = addLeadingZero(minutes);
timerField[3].textContent = addLeadingZero(seconds);
}

const timerInterval = setInterval(updateTimer, 1000);
}

