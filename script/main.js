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

    function formatTime(data) {
      if (data < 10) {
        data = '0' + data;
      }
      return data;
    }

    let timerId = setInterval( () => {    
      let timer = getTimeRemaining();
      timerHours.textContent = formatTime(timer.hours);
      timerMinutes.textContent = formatTime(timer.minutes);
      timerSeconds.textContent = formatTime(timer.seconds);
      
      if (timer.timeRemaining < 0) {
        clearInterval(timerId);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }, 1000);
  
  }

  countTimer('5 may 2020');

  // Menu

  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => menu.classList.toggle('active-menu');


    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);

    // нажатие на пункты меню закрывают меню
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  // Popup

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popUpClose = document.querySelector('.popup-close'),
          popupContent = popup.querySelector('.popup-content');

    // Popup animation function

    let count = 0;
    function popupAnimate () {

      if (popupContent.style.left !== '38%') {
        requestAnimationFrame(popupAnimate);
        count++;
        popupContent.style.left = (count * 2) + '%';

        } else {
            cancelAnimationFrame(popupAnimate);
        }
    }
    
    popupBtn.forEach((elem) => {
    // открытие окна
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        if (screen.width > 768) {
          popupAnimate();
      } 
      });
    });
    // закрытие
    popUpClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };

  togglePopUp();

});

  



