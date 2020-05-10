const slider = () => {
  const slide = document.querySelectorAll('.portfolio-item'),
        btn = document.querySelectorAll('.portfolio-btn'),
        slider = document.querySelector('.portfolio-content'),
        dots = document.querySelector('.portfolio-dots');

  
  // переключение фотографий при наведении мыши
  const commandPhoto = document.querySelectorAll('#command .command__photo');

  commandPhoto.forEach(item => {
    const photoSrc = item.getAttribute('src');
    const photoData = item.dataset.img;
    item.addEventListener('mouseenter', event => event.target.src = photoData);
    item.addEventListener('mouseleave', event => event.target.src = photoSrc);
  });

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