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
  renderUpdatedTask();
  console.log(getTask());
  console.log(getAllTask());
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

    const taskState = document.createElement('input');
    taskState.setAttribute('type', 'checkbox');
    element.state ? (taskState.checked = true) : (taskState.checked = false); /// will be change since there will be todo for complete and noncompleted
    taskState.addEventListener('change', taskComplete);

    const taskdel = document.createElement('button');
    taskdel.textContent = 'Delete';
    taskdel.addEventListener('click', delTask);

    taskCard.appendChild(taskdel);
    taskCard.appendChild(taskState);
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDes);
    taskCard.appendChild(taskPrio);
    taskCard.appendChild(taskDue);
    library.appendChild(taskCard);
  });
}
function taskComplete(e) {
  const taskId = e.target.closest('[data-idtask]').dataset.idtask;
  taskFinished(Number(taskId));
  renderUpdatedTask();
  updateLocal();
}

function delTask(e) {
  const taskId = e.target.closest('[data-idtask]').dataset.idtask;
  removeTodo(taskId);
  updateLocal();
  renderUpdatedTask();
}

function renderUpdatedTask() {
  renderTodos(getTask());
}

renderTodos(getTask());

// git commit -m "Add filter for finish and unfinish task"
