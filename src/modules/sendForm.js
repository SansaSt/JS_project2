const sendForm = () => {
  const errorMessage = 'Что-то пошло не так',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо, мы скоро с вами свяжемся!',
        forms = document.querySelectorAll('form');
  const statusMessage = document.createElement('div');
  statusMessage.style.cssText = 'fort-size: 2rem';

  const validateTel = (tel) => {
    let str = tel[0].value.replace('+', '').length;
    if (str < 8) {
      alert('Минимум 8 цифр');
      return false;
    } else {
      return true;
    }

  };

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

export default sendForm;