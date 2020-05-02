window.addEventListener('DOMContentLoaded', function(){  // фукнция запускается после загрузки DOM
  'use strict';

  // Timer

  function countTimer(deadline){ // deadline точка обратного отсчета
    let timerHours = document.querySelector('#timer-hours');
    let timerMinutes = document.querySelector('#timer-minutes');
    let timerSeconds = document.querySelector('#timer-seconds');


    function getTimeRemaining(){
      let dateStop = new Date(deadline).getTime(); // getTime - перевод в милисекунды
      let dateNow = new Date().getTime(); // получение текущей даты
      let timeRemaining = (dateStop - dateNow) / 1000; 
      let seconds = Math.floor(timeRemaining % 60); // остаток от деления чтобы получить количество секунд
      let minutes = Math.floor((timeRemaining / 60) % 60); 
      let hours = Math.floor(timeRemaining / 60 / 60); 
      // let days = Math.floor(timeRemaining / 60 / 60 / 24);
      return {timeRemaining, seconds, minutes,hours};
    }

    let timerId = setInterval( () => {    
      let timer = getTimeRemaining();
      timerHours.textContent = timer.hours;
      timerMinutes.textContent = timer.minutes;
      timerSeconds.textContent = timer.seconds;
      
      if (timer.timeRemaining < 0) {
        clearInterval(timerId);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }, 1000);
  
  }

  countTimer('5 may 2020');
});