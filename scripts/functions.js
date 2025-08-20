import {renderStats} from "./stats.js";
import {studentList, saveToStorage, reassignId} from "../data/studentList.js";
import {renderStudentChecklist} from "./renderStudentChecklist.js";

function editStudent(student, name) {
  student.name = name;
  saveToStorage();
  renderStudentChecklist();
};

function deleteStudent(id) {
  // Uses the id to look for the corresponding student
  // in the studentList using its index
  const index = id - 1;

  // Removes the student from the studentList
  studentList.splice(index, 1);
  
  // Ensures that all ids are unique for each student
  reassignId();

  // Re-renders the page after saving the studentList in
  // localStorage
  saveToStorage();
  renderStudentChecklist();
  renderStats();
};

// Initializes all functions running on the page
export function initFunctions() {
  // Loops through every checkbox and grabbing their unique ids
  document.querySelectorAll('.js-checkbox').forEach((checkbox) => {
    const id = Number(checkbox.dataset.id);
    const targetCheckbox = document.querySelector(`.js-checkbox-${id}`);
    
    let matchingStudent = {};

    // Initializes the checkbox statuses using their statuses saved
    // inside localStorage
    // Run this function at the end of renderStudentChecklist
    studentList.forEach((student) => {
      if (student.id === id) {
        matchingStudent = student;
        targetCheckbox.checked = matchingStudent.isChecked;
      }
    });
  });

  // Updates the isChecked status of the students when the checkbox is
  // pressed inside the studentList
  document.querySelectorAll('.js-checkbox').forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      const isChecked = checkbox.checked;

      // The id inside studentList is a number while the id inside the
      // checklist itself is a string.
      
      // To ensure proper formatting throughout the code, all id 
      // datasets should be converted to numbers 
      const id = Number(checkbox.dataset.id);

      let matchingStudent = {};

      // Looks for the student inside the list and updates its isChecked
      // according to the checkbox's status beside the student
      studentList.forEach((student) => {
        if (id === student.id) {
          matchingStudent = student;
        }
      });

      matchingStudent.isChecked = isChecked;

      // Its not necessary to render the whole page after checking the box
      // since input tags are automatically rendered. 
      // Due to this, I've decided to only update the localStorage and
      // update the page's stats
      saveToStorage();
      renderStats();
    });
  });

  // Handles deleting a student from the list.
  document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click', () => {
      renderStudentChecklist();

      // Grabs the button's id
      const id = Number(button.dataset.id);
      
      const containerHTML = document.querySelector(`.js-delete-button-container-${id}`);

      containerHTML.innerHTML = `
        <div>Are you sure?</div>
        <button class="selection-button js-delete-${id}">Delete</button>
        <button class="selection-button js-cancel-${id}">Cancel</button>
      `;

      const cancelButton = document.querySelector(`.js-cancel-${id}`);
      const deleteButton = document.querySelector(`.js-delete-${id}`);

      cancelButton.addEventListener('click', () => {
        renderStudentChecklist();
      });
      deleteButton.addEventListener('click', () => {
        deleteStudent(id);
      });
    });
  });

  document.querySelectorAll('.js-edit-button').forEach((button) => {
    button.addEventListener('click', () => {
      renderStudentChecklist();

      const id = Number(button.dataset.id);
      let matchingStudent = {};

      studentList.forEach((student) => {
        if (student.id === id) {
          matchingStudent = student;
        };
      });

      const nameContainer = document.querySelector(`.js-student-name-container-${id}`);

      nameContainer.innerHTML = `
      <input class="edit-name js-edit-name-${id}"type="text">
      <button class="save-button js-save-button-${id}">Save</button>
      `;

      const input = document.querySelector(`.js-edit-name-${id}`);
      input.value = matchingStudent.name;

      const saveButton = document.querySelector(`.js-save-button-${id}`);

      saveButton.addEventListener('click', () => {
        editStudent(matchingStudent, input.value);
      });

      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          editStudent(matchingStudent, input.value);    
        };
      });
    });
  });
};