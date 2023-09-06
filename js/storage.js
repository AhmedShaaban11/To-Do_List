class TasksStorage {

    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || {};
        this.lastId = localStorage.getItem("lastId") || 1;
    }

    addTask(task) {
        const id = this.lastId++;
        this.tasks[id] = task;
        localStorage.setItem("lastId", this.lastId);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        return id;
    }

    removeTask(id) {
        if (!this.tasks[id]) { return; }
        delete this.tasks[id];
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    updateTask(id, task) {
        if (!this.tasks[id]) { return; }
        this.tasks[id] = task;
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    getTask(id) {
        return this.tasks[id];
    } 

    get getToDoTasks() {
        return Object.entries(this.tasks).filter((task) => !task[1].isCompleted);
    }

    get getCompletedTasks() {
        return Object.entries(this.tasks).filter((task) => task[1].isCompleted);
    }

};

export default TasksStorage;