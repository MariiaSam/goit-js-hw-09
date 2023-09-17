import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('click', handlePromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handlePromiseCreate(evt) {
  evt.preventDefault();

  let valueDelay = Number(form.querySelector('[name="delay"]').value);
  let step = Number(form.querySelector('[name="step"]').value);
  let amount = Number(form.querySelector('[name="amount"]').value);

  for (let i = 1; i <= amount; i += 1) {
    let promiseDelay = valueDelay + step * i;

    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
