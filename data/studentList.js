export let studentList = JSON.parse(localStorage.getItem('studentList')) || [];

export function saveToStorage() {
  localStorage.setItem('studentList', JSON.stringify(studentList));
};

export function addStudent() {
  const input = document.querySelector('.js-inputbox');
  
  if (input.value === '') {
    return;
  };

  let isDuplicateName = false;

  studentList.forEach((student) => {
    if (student.name === input.value) {
      isDuplicateName = true;
    }
  });

  if (isDuplicateName) {
    alert("Name already on the list.");
    return;
  }

  let id = studentList.length + 1;
  const name = input.value;
  
  studentList.push({
    id: id,
    name: name,
    isChecked: false    
  });

  input.value = '';
}

export function reassignId() {
  let id = 1;
  studentList.forEach((student) => {
    student.id = id;
    id++;
  });
}





