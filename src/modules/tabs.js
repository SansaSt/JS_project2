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