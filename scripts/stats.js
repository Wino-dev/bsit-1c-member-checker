import {studentList} from '../data/studentList.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function renderStats() {
  const today = dayjs();
  const todayFormat = today.format('h:mmA, MMMM D, YYYY');

  document.querySelector('.js-last-update').innerText = `Last Updated Since ${todayFormat}`

  let uncheckedQuantity = 0;
  studentList.forEach(student => {
    if (student.isChecked === false) {
      uncheckedQuantity++
    }
  });

  document.querySelector('.js-status').innerText = `Number of Students Unchecked: ${uncheckedQuantity}`

};