import { TodoCreate } from "./creation.js";

//kkaksjd
let toDos = [];
window.toDos = toDos;

function generateTodo() {
    const datas = JSON.parse(localStorage.getItem("task")) || [];

    datas.forEach(item => {
        const task = new TodoCreate(
            item.title,
            item.description,
            item.duedate,
            item.isPriority,
            item.taskId
        );
        toDos.push(task);
    });
}

function updateLocal() {
    // Convert class instances into plain objects
    const plainData = toDos.map(todo => ({
        title: todo.title,
        description: todo.description,
        duedate: todo.duedate,
        isPriority: todo.isPriority,
        taskId: todo.taskId
    }));

    localStorage.setItem("task", JSON.stringify(plainData));
}



function addTodo(newdata) {
    const newTodo = new TodoCreate(newdata.title,newdata.description, newdata.dueDate, newdata.isPriority)
    toDos.push(newTodo)

    updateLocal()
}

function removeTodo(todo) {
    const indextodo = toDos.findIndex(task => task.taskId === todo);
    console.log(indextodo)
    toDos.splice(indextodo, 1)
    updateLocal()
}


const editTodo = (function () {
    //Edit indviduals but not needed
    function editTitle(title, newtitle) {
        const task = toDos.find(task => task.title === title);
        if (!task) return;
        task._title = newtitle
    }
    function editDescription(title, newDescription) {
        const task = toDos.find(t => t.title === title);
        if (!task) return;
        task._description = newDescription;
    }

    function editDueDate(title, newDate) {
        const task = toDos.find(t => t.title === title);
        if (!task) return;
        task._duedate = newDate;
    }

    function editPriority(title, newPriority) {
        const task = toDos.find(t => t.title === title);
        if (!task) return;
        task._isPriority = newPriority;
    }

    //newdate should look liek this{newtitle:" ",newDescription:" "}
    function editAll(title, newdatas) {
        const task = toDos.find(task => task.title === title);
        if (!task) return;
        task.title = newdatas.newtitle
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

    return editAll
})();


function getTask() {
    return toDos
}




export { addTodo, removeTodo, getTask, generateTodo,editTodo };
