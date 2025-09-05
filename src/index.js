import { TodoCreate } from "./creation.js";
import { addTodo, removeTodo, editTodo, getTask, generateTodo, toDos } from "./modify.js";
import { datePeriods, generateRandom } from "./helper.js";

generateTodo()

document.querySelector("#addbutton").addEventListener("click", e => {
    document.querySelector(".input-dialog").showModal()
    console.log("hello")
})

document.querySelector("#submitToDo").addEventListener("click", e => {
    e.preventDefault();

    const formEl = document.querySelector("#formAddTodo")
    const formData = new FormData(formEl);
    const formDatas = Object.fromEntries(formData);
    formDatas.isPriority = formEl.querySelector('[name="isPriority"]').checked;

    addTodo(formDatas)
    console.log(getTask())
    closeModal(formEl)
});


function closeModal(form){
    document.querySelector(".input-dialog").close();
    form.reset();
}
