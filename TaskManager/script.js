let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let deletedStack = JSON.parse(localStorage.getItem("deletedStack")) || [];
let taskMap = new Map();

tasks.forEach(task => {
    taskMap.set(task.name.toLowerCase(), task);
});

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("deletedStack", JSON.stringify(deletedStack));
}

function addTask() {
    let name = document.getElementById("taskName").value;
    let deadline = document.getElementById("deadline").value;
    let priority = document.getElementById("priority").value;

    let task = {
        id: Date.now(),
        name,
        deadline,
        priority,
        status: "Pending"
    };

    tasks.push(task);
    taskMap.set(name.toLowerCase(), task);

    saveData();
    renderTasks(tasks);
}

function deleteTask(id) {
    let index = tasks.findIndex(t => t.id === id);
    deletedStack.push(tasks[index]);
    tasks.splice(index, 1);

    saveData();
    renderTasks(tasks);
}

function undoDelete() {
    let task = deletedStack.pop();
    if (task) {
        tasks.push(task);
        saveData();
        renderTasks(tasks);
    }
}

function searchTask() {
    let keyword = document.getElementById("searchInput").value.toLowerCase();
    let result = taskMap.get(keyword);
    if (result) renderTasks([result]);
}

function sortByPriority() {
    const order = { High:1, Medium:2, Low:3 };
    tasks.sort((a,b)=>order[a.priority]-order[b.priority]);
    renderTasks(tasks);
}

function showByDeadline() {
    let sorted = [...tasks].sort((a,b)=>new Date(a.deadline)-new Date(b.deadline));
    renderTasks(sorted);
}

function renderTasks(arr) {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    arr.forEach(task=>{
        let li = document.createElement("li");
        li.innerHTML = `${task.name} | ${task.deadline} | ${task.priority}
        <button onclick="deleteTask(${task.id})">Delete</button>`;
        list.appendChild(li);
    });
}

renderTasks(tasks);
