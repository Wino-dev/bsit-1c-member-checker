import {renderStats} from "./stats.js";
import {studentList, saveToStorage, reassignId} from "../data/studentList.js";
import {renderStudentChecklist} from "./renderStudentChecklist.js";

export function initFunctions() {
  document.querySelectorAll('.js-checkbox').forEach((checkbox) => {
    const id = Number(checkbox.dataset.id);
    const targetCheckbox = document.querySelector(`.js-checkbox-${id}`);
    
    let matchingStudent = {};

    studentList.forEach((student) => {
      if (student.id === id) {
        matchingStudent = student;
        targetCheckbox.checked = matchingStudent.isChecked;
      }
    });
  });

  document.querySelectorAll('.js-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      const isChecked = checkbox.checked;
      const id = Number(checkbox.dataset.id);

      let matchingStudent = {};

      studentList.forEach((student) => {
        if (id === student.id) {
          matchingStudent = student;
        }
      });

      matchingStudent.isChecked = isChecked;
      saveToStorage();
      renderStats();
    });
  });

  document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.id);
      const index = id - 1;

      studentList.splice(index, 1);
      reassignId();
      saveToStorage();
      renderStudentChecklist();
      initFunctions();
      renderStats();
    });
  });
};