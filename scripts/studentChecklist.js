import {studentList, saveToStorage, reassignId} from "../data/studentList.js";
import {renderStats} from "./stats.js";

export function renderStudentChecklist() {
  let studentChecklistHTML = '';

  studentList.forEach((student) => {
    const id = student.id;
    const name = student.name;

    const html = `
      <div class="student-info" data-student-id="${id}">
        <div class="student-name-container">
          <div class="student-name">${name}</div>
        </div>
        <div class="student-options">
          <input class="checkbox js-checkbox js-checkbox-${id}" type="checkbox" data-id="${id}">
          <button class="delete-button js-delete-button" data-id="${id}">x</button>
        </div>
      </div>
    `;

    studentChecklistHTML += html;
  });

  document.querySelector('.js-students-checklist-container').innerHTML = studentChecklistHTML

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

    
  })

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
      renderStats();
    });
  });
};
