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