const calc = (price = 100) => {

  const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

     // запрет ввода букв
  const inputs = document.querySelectorAll('input.calc-item');
  inputs.forEach(item => {
    item.addEventListener('input', e => e.target.value = e.target.value.replace(/\D/g, ''));
  });

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

export default calc;