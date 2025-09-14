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

    const taskEdit = document.createElement('button');
    taskEdit.textContent = 'Edit';
    taskEdit.addEventListener('click', (e) => {
      const taskId = e.target.closest('[data-idtask]').dataset.idtask;
      const edtitle = document.querySelector('#newtitle');
      const eddes = document.querySelector('#newDescription');
      const eddate = document.querySelector('#newDate');
      const edprio = document.querySelector('#newPriority');

      edtitle.value = element.title;
      eddes.value = element.description;
      eddate.value = element.duedate;
      element.isPriority ? (edprio.checked = true) : (edprio.checked = false);

      document.querySelector('.edit-dialog').showModal();
      editTask(taskId);
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

  if (showDone) {
    const doneTask = task.filter((t) => t.state === true);
    doneTask.forEach((element) => {
      const donetaskCard = document.createElement('div');
      donetaskCard.style.backgroundColor = 'rgba(26, 255, 0, 1)';
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

function editTask(taskId) {
  document.querySelector('#edToDo').addEventListener('click', (e) => {
    e.preventDefault();

    const formEl = document.querySelector('#formEditTodo');
    const formData = new FormData(formEl);
    const formDatas = Object.fromEntries(formData);
    formDatas.newPriority = formEl.querySelector(
      '[name="newPriority"]',
    ).checked;

    editTodo(Number(taskId), formDatas);
    renderUpdatedTask();
    console.log(typeof taskId);
    console.log(formDatas);
    console.log(formDatas);
    closeModal(formEl);
  });
}

function renderUpdatedTask() {
  renderTodos(getAllTask());
}

renderTodos(getAllTask());
