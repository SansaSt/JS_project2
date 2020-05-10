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

      if (count <= 20) {
        requestAnimationFrame(popupAnimate);
        count++;
        popupContent.style.left = (count * 2) + '%';

        } else {
          count = 0;
            cancelAnimationFrame(popupAnimate);
        }
    }
    
    popupBtn.forEach((elem) => {
    // открытие окна
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        if (document.documentElement.clientWidth > 768) {
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

  // Табы

 
    const tabs = () => {
      const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

      const toggleTabContent = index => { // функция, которая меняет контент
          for(let i = 0; i < tabContent.length; i++){
            if(index === i){
              tab[i].classList.add('active');
              tabContent[i].classList.remove('d-none');
            } else {
              tab[i].classList.remove('active');
              tabContent[i].classList.add('d-none');
            }
          }
      };

      tabHeader.addEventListener('click', event => {
        let target = event.target; // получаем элемент, на который кликнули
        target = target.closest('.service-header-tab'); // присваиваем селектор ближайнего родительского элемента
        
          if (target){
            // проверка на какой таб кликнули
            tab.forEach((item, i) => {

              if(item === target){
                toggleTabContent(i); // индекс сравниваем с индексом tabContent
              }
            });
          }
      });
  };

tabs();
// Slider

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          btn = document.querySelectorAll('.portfolio-btn'),
          slider = document.querySelector('.portfolio-content'),
          dots = document.querySelector('.portfolio-dots');

    const addDots = () => {
      for (let i = 0; i < slide.length; i++) {
        const dotElement = document.createElement('li');
        dots.appendChild(dotElement);
        dotElement.classList.add('dot');
        if (i === 0){
          dotElement.classList.add('dot-active');
        }
      }
    };

    addDots();

    const dot = document.querySelectorAll('.dot');

    // переменая, которая опеределяет , какой слайд открыт
    let currentSlide = 0,
        interval; 

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    // Autoplay
    const autoPlaySlide = () => {
      
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      // изменение активных точек
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };  

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => { // остановка автоматического переключения слайдера
      clearInterval(interval);
    };

    // переключение по стрелкам
    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      // если происходит клик не по стрелочкам и точкам, слайдер не работает

      if(!target.matches('.portfolio-btn, .dot')){
        return;
      }

      // убираем активный класс у текущего слайда
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if(target.matches('#arrow-right')){
        currentSlide++;
      } else if (target.matches('#arrow-left')){
        currentSlide--;
      } else if(target.matches('.dot')){
        dot.forEach((elem, index) => {
          if(elem === target){
            currentSlide = index;
          }
      });
      }

      // после последнего слайда возврат к первому
      if(currentSlide >= slide.length){
        currentSlide = 0;
      }

      if (currentSlide < 0){
        currentSlide = slide.length - 1; // длина массива на 1 больше, чем индекс последнего элемента
      }

      // добавляем класс слайду, который получился после условий
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
        startSlide();
      }
    });

    startSlide(1500);

  };

  slider();

  // переключение фотографий при наведении мыши
    const commandPhoto = document.querySelectorAll('#command .command__photo');

    commandPhoto.forEach(item => {
      const photoSrc = item.getAttribute('src');
      const photoData = item.dataset.img;
      item.addEventListener('mouseenter', event => event.target.src = photoData);
      item.addEventListener('mouseleave', event => event.target.src = photoSrc);
    });

  // запрет ввода букв
    const inputs = document.querySelectorAll('input.calc-item');
        inputs.forEach(item => {
          item.addEventListener('input', e => e.target.value = e.target.value.replace(/\D/g, ''));
        });
      
  // Calculator 

  const calc = (price = 100) => {

    const calcBlock = document.querySelector('.calc-block'),
          calcType = document.querySelector('.calc-type'),
          calcSquare = document.querySelector('.calc-square'),
          calcDay = document.querySelector('.calc-day'),
          calcCount = document.querySelector('.calc-count'),
          totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
          countValue = 1,
          dayValue = 1;
      // нужно опеределить, какой select был выбран и получить value
      const typeValue = calcType.options[calcType.selectedIndex].value, // value from tag options 
            squareValue = +calcSquare.value;

      // количество помещений и срок исполнения в днях
      if(calcCount.value > 1){
        countValue += (calcCount.value - 1) / 10;
      }

      if(calcDay.value && calcDay.value < 5){
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10){
        dayValue *= 1.5;
      }

      // итого
      if (typeValue && squareValue){
        total = price * typeValue * squareValue * countValue * dayValue;
      } 

      totalValue.textContent = total;

    };

    calcBlock.addEventListener('change', event => {
      const target = event.target;

      /* if (target.matches('.calc-type') || target.matches('.calc-square') || 
      target.matches('.calc-day') || target.matches('.calc-count')) {
        console.log(1);
      } */

      // if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {}

      if (target.matches('select') || target.matches('input')){
        countSum();
      }

    });
  };

  calc(100); // при вызове калькулятора передаем цену, от которой будем отталкиваться

  // Send-ajax-form

  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так',
          loadMessage = 'Загрузка...',
          successMessage = 'Спасибо, мы скоро с вами свяжемся!',
          errorInput = 'Минимум 8 цифр!',
          forms = document.querySelectorAll('form');
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'fort-size: 2rem';
    
  
    forms.forEach(form => {
  
      form.addEventListener('input', (evt) => {
        let target = evt.target;
        if (target.name === 'user_phone') {
          if (target.style) {
            target.style.border = 'none';
          }
          target.value = target.value.replace(/[^\+\d]/g, '');
        }
        if (target.name === 'user_name' || target.name === 'user_message') {
          target.value = target.value.replace(/[^а-я ]/gi, '');
        }
      });


    const validateTel = (tel) => {
      let str = tel[0].value.replace('+', '').length;
      if (str < 8) {
        form.appendChild(statusMessage);
        statusMessage.style.cssText = `font-size: 2rem;
              color: red; `;
        statusMessage.textContent = errorInput;
        return false;
      } else {
        return true;
      }
  
    };
  
      const postData = (body) => {
        console.log('body: ', body);
        return fetch('./server.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body),
          mode: 'cors'
        }); 
      };
  
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formTel = [...event.target.elements].filter((item) => item.name === 'user_phone');
        if (!validateTel(formTel)) {
          return;
        } 
        
        
        form.appendChild(statusMessage);
        statusMessage.style.cssText = `font-size: 2rem;
              color: #fff; `;
        const formData = new FormData(form);
        statusMessage.textContent = loadMessage;
  
      
        let body = {};
        for (let val of formData.entries()) {
          body[val[0]] = val[1];
        }
  
        const outputData = () => {
            statusMessage.style.cssText = `font-size: 2rem;
              color: green; `;
            statusMessage.textContent = successMessage;
            form.reset();
        };
  
        const error = () => {
            statusMessage.style.cssText = `font-size: 2rem;
              color: red; `;
            statusMessage.textContent = errorMessage;
        };
        
  
        postData(body)
          .then((response) => {
            if (response.status !== 200) {
                throw 'error !!! ';
            }          
            outputData();
          })
          .catch(error);
  
      });
    });
  
  }; 
});





