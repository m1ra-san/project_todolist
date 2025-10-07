import './style.css';
import { TodoCreate } from './creation.js';
import {
  addTodo,
  removeTodo,
  editTodo,
  getTask,
  generateTodo,
  toDos,
  updateLocal,
  taskFinished,
  getAllTask,
  getFinishedTask,
} from './modify.js';
import { datePeriods, generateRandom } from './helper.js';

generateTodo();
console.log(getAllTask());

//Add task
document.querySelector('#addbutton').addEventListener('click', (e) => {
  document.querySelector('.input-dialog').showModal();
  console.log('hello');
});
//Submit Task
document.querySelector('#submitToDo').addEventListener('click', (e) => {
  e.preventDefault();

  const formEl = document.querySelector('#formAddTodo');
  const formData = new FormData(formEl);
  const formDatas = Object.fromEntries(formData);
  formDatas.isPriority = formEl.querySelector('[name="isPriority"]').checked;

  addTodo(formDatas);
  renderUpdatedTask();
  closeModal(formEl);
});

function closeModal(form) {
  document.querySelector('.input-dialog').close();
  document.querySelector('.edit-dialog').close();
  form.reset();
}

function renderTodos(task, showDone) {
  //showDone is a bool that show and unshow done task
  const library = document.querySelector('.library');
  library.innerHTML = '';
  const undoneTask = task.filter((t) => t.state === false);

  undoneTask.forEach((element) => {
    const taskCard = document.createElement('div');
    // taskCard.style.backgroundColor = 'rgb(0, 0, 255)';
    taskCard.classList.add('undone', 'taskcard');
    taskCard.setAttribute('data-idtask', element.taskId);

    const taskTitle = document.createElement('h2');
    taskTitle.textContent = element.title;

    const taskDes = document.createElement('p');
    taskDes.textContent = element.description;

    const taskPrio = document.createElement('span');
    taskPrio.textContent = `Priority: ${element.isPriority ? 'True' : 'False'}`;

    const taskDue = document.createElement('p');
    taskDue.textContent = element.duedate;

    const taskState = document.createElement('input');
    taskState.setAttribute('type', 'checkbox');
    element.state ? (taskState.checked = true) : (taskState.checked = false); /// will be change since there will be todo for complete and noncompleted
    taskState.addEventListener('change', taskComplete);

    const taskdel = document.createElement('button');
    taskdel.textContent = 'Delete';
    taskdel.addEventListener('click', delTask);

    const taskEdit = document.createElement('button');
    taskEdit.textContent = 'Edit';
    taskEdit.addEventListener('click', () => {
      editTask(element);
    });

    taskCard.appendChild(taskEdit);
    taskCard.appendChild(taskdel);
    taskCard.appendChild(taskState);
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDes);
    taskCard.appendChild(taskPrio);
    taskCard.appendChild(taskDue);
    library.appendChild(taskCard);
  });

  if (!showDone) {
    const doneTask = task.filter((t) => t.state === true);
    doneTask.forEach((element) => {
      const donetaskCard = document.createElement('div');
      // donetaskCard.style.backgroundColor = 'rgba(26, 255, 0, 1)';
      donetaskCard.classList.add('done', 'taskcard');
      donetaskCard.setAttribute('data-idtask', element.taskId);

      const taskTitle = document.createElement('h2');
      taskTitle.textContent = element.title;

      const taskDes = document.createElement('p');
      taskDes.textContent = element.description;

      const taskPrio = document.createElement('span');
      taskPrio.textContent = `Priority: ${element.isPriority ? 'True' : 'False'}`;

      const taskDue = document.createElement('p');
      taskDue.textContent = element.duedate;

      const taskdel = document.createElement('button');
      taskdel.textContent = 'Delete';
      taskdel.addEventListener('click', delTask);

      donetaskCard.appendChild(taskdel);
      donetaskCard.appendChild(taskTitle);
      donetaskCard.appendChild(taskDes);
      donetaskCard.appendChild(taskPrio);
      donetaskCard.appendChild(taskDue);
      library.appendChild(donetaskCard);
    });
  }
}
function taskComplete(e) {
  const taskId = e.target.closest('[data-idtask]').dataset.idtask;
  taskFinished(Number(taskId));
  renderUpdatedTask();
  updateLocal();
}

function delTask(e) {
  const taskId = e.target.closest('[data-idtask]').dataset.idtask;
  removeTodo(Number(taskId));
  updateLocal();
  renderUpdatedTask();
}

//Edit task
function editTask(elementData) {
  console.log(elementData);
  //Turn Element data into Object that can be edited
  const taskData = {
    title: elementData.title,
    description: elementData.description,
    duedate: elementData.duedate,
    isPriority: elementData.isPriority,
    taskId: elementData.taskId,
    state: elementData.state,
  };
  console.log(taskData);
  createEditTodo(taskData);
}

// Create edit Task Dialouge
function createEditTodo(task) {
  //Create dialog element
  const dialog = document.createElement('dialog');
  dialog.id = 'editTodoDialog';

  //Create form
  const form = document.createElement('form');
  form.id = 'formEditTodo';
  form.method = 'dialog';

  // === Title Label + Input ===
  const labelTitle = document.createElement('label');
  labelTitle.htmlFor = 'newtitle';
  labelTitle.textContent = 'Title:';
  const inputTitle = document.createElement('input');
  inputTitle.type = 'text';
  inputTitle.name = 'newtitle';
  inputTitle.id = 'newtitle';
  inputTitle.value = task.title;

  // === Description Label + Input ===
  const labelDescription = document.createElement('label');
  labelDescription.htmlFor = 'newDescription';
  labelDescription.textContent = 'Description';
  const inputDescription = document.createElement('input');
  inputDescription.type = 'text';
  inputDescription.name = 'newDescription';
  inputDescription.id = 'newDescription';
  inputDescription.value = task.description;

  // === Date Input ===
  const inputDate = document.createElement('input');
  inputDate.type = 'date';
  inputDate.name = 'newDate';
  inputDate.id = 'newDate';
  inputDate.value = task.duedate;

  // === Priority Checkbox ===
  const inputPriority = document.createElement('input');
  inputPriority.type = 'checkbox';
  inputPriority.name = 'newPriority';
  inputPriority.id = 'newPriority';
  task.isPriority
    ? (inputPriority.checked = true)
    : (inputPriority.checked = false);

  // === Submit Button ===
  const buttonSubmit = document.createElement('button');
  buttonSubmit.type = 'submit';
  buttonSubmit.id = 'edToDo';
  buttonSubmit.textContent = 'Submit';

  // Append everything to the form
  form.appendChild(labelTitle);
  form.appendChild(inputTitle);
  form.appendChild(labelDescription);
  form.appendChild(inputDescription);
  form.appendChild(inputDate);
  form.appendChild(inputPriority);
  form.appendChild(buttonSubmit);

  // Put form inside dialog
  dialog.appendChild(form);
  document.body.appendChild(dialog);

  //Edit the Storage Task
  form.addEventListener('submit', (e) => {
    e.preventDefault;

    const formDatas = {
      newtitle: inputTitle.value,
      newDescription: inputDescription.value,
      newDate: inputDate.value,
      newPriority: inputPriority.checked,
    };

    editTodo(Number(task.taskId), formDatas);
    renderUpdatedTask();
    form.reset();
    dialog.close();
    dialog.remove();
  });

  //showDialuge
  dialog.showModal();
}

function renderUpdatedTask() {
  renderTodos(getAllTask());
}

renderTodos(getAllTask());
