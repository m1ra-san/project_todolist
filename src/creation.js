
class TodoCreate {
    static countId = 0;
    constructor(title, description, duedate, isPriority) {
        this._title = title;
        this._description = description;
        this._duedate = duedate;
        this._isPriority = isPriority;
        this.tempid = TodoCreate.counter();
    }

    // new Date(duedate)|| new Date


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

export { TodoCreate };
