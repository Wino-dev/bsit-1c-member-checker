import {addStudent, saveToStorage} from '../data/studentList.js';
import {renderStats} from "./stats.js";
import {renderStudentChecklist} from './studentChecklist.js';

const input = document.querySelector('.js-inputbox');

function processInput() {
  addStudent();
  saveToStorage();
  renderStudentChecklist();
  renderStats();
}

export function enterFunction() {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      processInput();
    }
  });
}; 

const inputButton = document.querySelector('.js-add-button');

inputButton.addEventListener('click', processInput);

