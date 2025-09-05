import { TodoCreate } from "./creation.js";
import { addTodo, removeTodo, editTodo, getTask, createTodo } from "./modify.js";
import { datePeriods } from "./helper.js";

addTodo()
console.log(getTask());
const tasks = getTask(); // this returns your array of todos
const firstTask = tasks[0]; // get the first one (or find the one you want)
console.log(datePeriods(firstTask.duedate));





