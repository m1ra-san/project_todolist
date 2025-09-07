import { TodoCreate } from './creation.js';
import {
  addTodo,
  removeTodo,
  editTodo,
  getTask,
  generateTodo,
  toDos,
  updateLocal,
} from './modify.js';
import { datePeriods, generateRandom } from './helper.js';

generateTodo();

document.querySelector('#addbutton').addEventListener('click', (e) => {
  document.querySelector('.input-dialog').showModal();
  console.log('hello');
});

document.querySelector('#submitToDo').addEventListener('click', (e) => {
  e.preventDefault();

  const formEl = document.querySelector('#formAddTodo');
  const formData = new FormData(formEl);
  const formDatas = Object.fromEntries(formData);
  formDatas.isPriority = formEl.querySelector('[name="isPriority"]').checked;

  addTodo(formDatas);
  renderTodos(getTask());
  console.log(getTask());
  closeModal(formEl);
});

function closeModal(form) {
  document.querySelector('.input-dialog').close();
  form.reset();
}

function renderTodos(task) {
  const library = document.querySelector('.library');
  library.innerHTML = '';
  task.forEach((element) => {
    const taskCard = document.createElement('div');
    taskCard.style.backgroundColor = 'rgb(0, 0, 255)';
    taskCard.setAttribute('data-idtask', element.taskId);

    const taskTitle = document.createElement('h2');
    taskTitle.textContent = element.title;

    const taskDes = document.createElement('p');
    taskDes.textContent = element.description;

    const taskPrio = document.createElement('span');
    taskPrio.textContent = `Priority: ${element.isPriority ? 'True' : 'False'}`;

    const taskDue = document.createElement('p');
    taskDue.textContent = element.duedate;

    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDes);
    taskCard.appendChild(taskPrio);
    taskCard.appendChild(taskDue);
    library.appendChild(taskCard);
  });
}
renderTodos(getTask());
