'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

window.addEventListener('DOMContentLoaded', () => {
  // Timer
  countTimer('13 may 2020');

  // Menu
  toggleMenu();

  // Popup
  togglePopUp();

  // Табы
  tabs();

  // Slider
  slider();

  // Calculator 
  calc(100); // при вызове калькулятора передаем цену, от которой будем отталкиваться

  // Send-ajax-form
  sendForm();
});
