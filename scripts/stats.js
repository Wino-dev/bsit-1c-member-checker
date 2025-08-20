import {studentList} from '../data/studentList.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

// Renders relevant statistics on the webpage

export function renderStats() {
  // Generates the date set on the '.js-last-update' when this function
  // is called 
  const today = dayjs();
  const todayFormat = today.format('h:mmA, MMMM D, YYYY');

  document.querySelector('.js-last-update').innerText = `Last Updated Since ${todayFormat}`

  // Checks how many students are unchecked when the funciton is called
  // and sets it inside '.js-status'
  let uncheckedQuantity = 0;
  studentList.forEach(student => {
    if (student.isChecked === false) {
      uncheckedQuantity++
    }
  });

  document.querySelector('.js-status').innerText = `Number of Students Unchecked: ${uncheckedQuantity}`

};