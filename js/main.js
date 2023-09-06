import TasksStorage from "./storage.js";

const storage = new TasksStorage();
const toDoSection = document.querySelector(".to-do");
const completedSection = document.querySelector(".completed");

const toggleTaskBetweenSections = (elem, isCompleted) => {
    let clone = elem.cloneNode(true);
    clone.querySelector(".checkbox").addEventListener("change", checkTask);
    clone.querySelector(".trash-btn").addEventListener("click", removeTask);
    if (isCompleted) {
        completedSection.appendChild(clone);
    } else {
        toDoSection.appendChild(clone);
    }
    elem.remove();
}

function removeTask() {
    storage.removeTask(this.parentElement.dataset["id"]);
    this.parentElement.remove();
};

function checkTask() {
    let taskElem = this.parentElement.parentElement;
    const id = taskElem.dataset["id"];
    let task = storage.getTask(id);
    task.isCompleted = this.checked;
    storage.updateTask(id, task);
    toggleTaskBetweenSections(taskElem, task.isCompleted);
}

function updateTaskTitle() {
    const id = this.parentElement.parentElement.dataset["id"];
    let task = storage.getTask(id);
    task.text = this.textContent;
    storage.updateTask(id, task);
}

const appendTaskInElem = (id, task, elem) => {
    let taskElem = document.createElement("div");
    taskElem.dataset["id"] = id;
    taskElem.classList.add("task");
    taskElem.innerHTML = `
        <div class="body">
            <input type="checkbox" class="checkbox" ${task.isCompleted ? 'checked' : ''}>
            <span class="text" contenteditable>${task.text}</span>
        </div>
        <button class="btn trash-btn">×</button>
    `;
    taskElem.querySelector(".checkbox").addEventListener("change", checkTask);
    taskElem.querySelector(".text").addEventListener("input", updateTaskTitle);
    taskElem.querySelector(".trash-btn").addEventListener("click", removeTask);
    elem.appendChild(taskElem);
}

addEventListener("DOMContentLoaded", () => {
    storage.getToDoTasks.forEach((obj) => {
        appendTaskInElem(obj[0], obj[1], toDoSection);
    });
    storage.getCompletedTasks.forEach((obj) => {
        appendTaskInElem(obj[0], obj[1], completedSection);
    });
});

// Creates task from input
const createTask = () => {
    if (!taskInput.value) { return; }
    const task = {
        isCompleted: false,
        text: taskInput.value
    };
    const id = storage.addTask(task);
    console.log(storage.getTask(id));
    appendTaskInElem(id, task, toDoSection);
    taskInput.value = "";
};

const taskInput = document.querySelector("#task-input");
const addBtn = document.querySelector("#add-btn");

addBtn.addEventListener("click", createTask);

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { createTask(); }
});
