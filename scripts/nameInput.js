import {addStudent, saveToStorage} from '../data/studentList.js';
import {renderStats} from "./stats.js";
import {renderStudentChecklist} from './renderStudentChecklist.js';

// This js is used mainly for handling the 'Enter' and the add button
// when inputting a name

// Initializes the inputbox
const input = document.querySelector('.js-inputbox');

// Handles the input process (takes the name inside the input and places
// it inside the list)
function processInput() {
  addStudent();
  saveToStorage();
  renderStudentChecklist();
  renderStats();
}

// Handles the input when the inputbox is selected and the 'Enter' key
// is pressed
export function enterFunction() {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      processInput();
    }
  });
}; 

// Handles the input when the add button is pressed
const inputButton = document.querySelector('.js-add-button');
inputButton.addEventListener('click', processInput);

