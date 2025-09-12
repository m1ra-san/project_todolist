import { TodoCreate } from './creation.js';

//kkaksjd
let toDos = [
  //   {
  //     title: 'Task1 ',
  //     description: 'About TAsk 1',
  //     duedate: '2025-09-19',
  //     isPriority: true,
  //     taskId: 199810,
  //   },
];
window.toDos = toDos;

function generateTodo() {
  const datas = JSON.parse(localStorage.getItem('task')) || [];

  datas.forEach((item) => {
    const task = new TodoCreate(
      item.title,
      item.description,
      item.duedate,
      item.isPriority,
      item.taskId,
      item.state,
    );
    toDos.push(task);
  });
}

function updateLocal() {
  // Convert class instances into plain objects
  const plainData = toDos.map((todo) => ({
    title: todo.title,
    description: todo.description,
    duedate: todo.duedate,
    isPriority: todo.isPriority,
    taskId: todo.taskId,
    state: todo.state,
  }));

  localStorage.setItem('task', JSON.stringify(plainData));
}

function addTodo(newdata) {
  const newTodo = new TodoCreate(
    newdata.title,
    newdata.description,
    newdata.dueDate,
    newdata.isPriority,
  );
  toDos.push(newTodo);
  console.log(getUnfinisedTask());
  updateLocal();
}

function removeTodo(todo) {
  const indextodo = toDos.findIndex((task) => task.taskId === todo);
  console.log(indextodo);
  toDos.splice(indextodo, 1);
  updateLocal();
}

const editTodo = (function () {
  //Edit indviduals but not needed
  function editTitle(title, newtitle) {
    const task = toDos.find((task) => task.title === title);
    if (!task) return;
    task.title = newtitle;
  }
  function editDescription(title, newDescription) {
    const task = toDos.find((t) => t.title === title);
    if (!task) return;
    task.description = newDescription;
  }

  function editDueDate(title, newDate) {
    const task = toDos.find((t) => t.title === title);
    if (!task) return;
    task.duedate = newDate;
  }

  function editPriority(title, newPriority) {
    const task = toDos.find((t) => t.title === title);
    if (!task) return;
    task.isPriority = newPriority;
  }

  //newdate should look liek this{newtitle:" ",newDescription:" "}
  function editAll(title, newdatas) {
    const task = toDos.find((task) => task.title === title);
    if (!task) return;
    task.title = newdatas.newtitle;
    task.description = newdatas.newDescription;
    task.duedate = newdatas.newDate;
    task.isPriority = newdatas.newPriority;
  }

  //slowerapproach- AVOID NEXT TIME
  // function editAll(title,newdatas){
  //     if (!task) return;
  //     editTitle(title,newdatas.newtitle)
  //     editDescription(title,newdatas.newDescription)
  //     editDueDate(title, newdatas.newDate)
  //     editPriority(title,newdatas.newPriority)
  // }

  return editAll;
})();

function taskFinished(id) {
  const task = toDos.find((task) => task.taskId === id);
  console.log(task);
  task.state = true;
}

function getTask() {
  return toDos.filter((task) => task.state === false);
}

function getFinishedTask() {
  return toDos.filter((task) => task.state === true);
}

function getAllTask() {
  return toDos;
}

export {
  addTodo,
  removeTodo,
  getTask,
  generateTodo,
  editTodo,
  updateLocal,
  taskFinished,
  getAllTask,
  getFinishedTask,
};
