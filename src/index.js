
let toDos = []
window.toDos = toDos;

class TodoCreate {
    static countId = 0;
    constructor(title, description, duedate, isPriority) {
        this._title = title;
        this._description = description;
        this._duedate = duedate;
        this._isPriority = isPriority;
        this.tempid = TodoCreate.counter();
    }


    //id increment
    static counter() {
        return this.countId += 1;
    }

    //internal validation
    get title() { return this._title; }
    set title(val) {
        // if (!val.trim()) throw new Error("Title cannot be empty!");
        if (!val.trim()) return;
        this._title = val;
    }

    get description() { return this._description; }
    set description(val) {
        // if (!val.trim()) throw new Error("Description cannot be empty!");
        if (!val.trim()) return;
        this._description = val;
    }

    get duedate() { return this._duedate; }
    set duedate(val) {
        // if (!val || isNaN(new Date(val))) throw new Error("Invalid due date!");
        if (!val.trim()) return;
        this._duedate = val;
    }

    get isPriority() { return this._isPriority; }
    set isPriority(val) {
        this._isPriority = Boolean(val); // ensures true/false
    }

}




function addTodo() {
    const newTodo = new TodoCreate("Task1", "about Task1", "2025-09-2", false)
    toDos.push(newTodo)
}


function removeTodo(todo) {
    const indextodo = toDos.findIndex(task => task.tempid === todo);
    console.log(indextodo)
    toDos.splice(indextodo, 1)

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


function datePeriods(duedate) {
    const today = new Date();
    const date = new Date(duedate)
    const formatDate = (d) => d.toISOString().slice(0, 10);

    const todayStr = formatDate(today);
    const taskStr = formatDate(date);

    //Today 
    if (taskStr === todayStr) return `Today`;

    //Tommorow
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1);
    if (taskStr === formatDate(tomorrow)) return "Tomorrow";

    //Week
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const getDayName = (dates) => {
        return dates.toLocaleDateString("en-US", { weekday: 'long' });
    }
    if (date >= startOfWeek && date <= endOfWeek) return `${getDayName(date)}`;

    return duedate
}

console.log(datePeriods("2025-09-03"));
console.log(datePeriods("2025-09-04"));
console.log(datePeriods("2025-09-05"));
console.log(datePeriods("2025-08-30"));


addTodo()
editTodo("Task1", { 
    newtitle: "task2", 
    newDescription: "",    // leave empty
    newDate: "2025-09-03", // example date
    newPriority: true      // example priority
});
console.log(toDos)