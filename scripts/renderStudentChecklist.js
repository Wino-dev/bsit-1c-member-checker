import {studentList} from "../data/studentList.js";
import {initFunctions} from "./functions.js";

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

  document.querySelector('.js-students-checklist-container').innerHTML = studentChecklistHTML;

  initFunctions();
};
