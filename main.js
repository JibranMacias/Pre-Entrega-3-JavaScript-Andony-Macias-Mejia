let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let completedTasks = tasks.filter(task => task.completed);
let deletedTasks = JSON.parse(localStorage.getItem('deletedTasks')) || [];
let taskIds = tasks.map(task => task.id);

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const completedTaskList = document.getElementById('completedTaskList');
const deletedTaskList = document.getElementById('deletedTaskList');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('deletedTasks', JSON.stringify(deletedTasks));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskId = Date.now();
        const task = {
            id: taskId,
            text: taskText,
            completed: false
        };
        tasks.push(task);
        taskIds.push(taskId);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task';
        if (task.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="toggleTask(${task.id})">Completada</button>
            <button onclick="deleteTask(${task.id})">Eliminar</button>
        `;
        taskList.appendChild(li);
    });

    renderCompletedTasks();
    renderDeletedTasks();
}

function renderCompletedTasks() {
    completedTaskList.innerHTML = '';
    completedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task completed';
        li.innerHTML = `<span>${task.text}</span>`;
        completedTaskList.appendChild(li);
    });
}

function renderDeletedTasks() {
    deletedTaskList.innerHTML = '';
    deletedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task';
        li.innerHTML = `<span>${task.text}</span>`;
        deletedTaskList.appendChild(li);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
            if (task.completed) {
                completedTasks.push(task);
            } else {
                completedTasks = completedTasks.filter(t => t.id !== id);
            }
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => {
        if (task.id !== id) {
            return true;
        } else {
            deletedTasks.push(task);
            completedTasks = completedTasks.filter(t => t.id !== id);
            taskIds = taskIds.filter(taskId => taskId !== id);
            return false;
        }
    });
    saveTasks();
    renderTasks();
}

const task = {
    id: Date.now(),
    text: 'Nombre de la tarea',
    completed: false
};

function getCompletedTasks() {
    return completedTasks;
}

const allCompletedTasks = getCompletedTasks();
console.log(allCompletedTasks);

function getActiveTasks() {
    return tasks.filter(task => !task.completed);
}

const activeTasks = getActiveTasks();
console.log(activeTasks);

renderTasks();