
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

const allFilter = document.getElementById("allFilter");
const activeFilter = document.getElementById("activeFilter");
const completedFilter = document.getElementById("completedFilter");

const taskCount = document.getElementById("taskCount");

let currentFilter = "all";

// Update task counter
function updateTaskCount() {

    let tasks = taskList.children;
    let remaining = 0;

    for (let i = 0; i < tasks.length; i++) {

        if (!tasks[i].querySelector("input").checked) {
            remaining++;
        }

    }

    taskCount.innerText =
        remaining + (remaining === 1 ? " task remaining" : " tasks remaining");

}

// Apply current filter
function applyFilter() {

    let tasks = taskList.children;

    for (let i = 0; i < tasks.length; i++) {

        if (currentFilter === "all") {
            tasks[i].style.display = "flex";
        }
        else if (tasks[i].dataset.status === currentFilter) {
            tasks[i].style.display = "flex";
        }
        else {
            tasks[i].style.display = "none";
        }

    }

}

// Highlight selected filter
function updateFilterHighlight() {

    allFilter.classList.toggle("active", currentFilter === "all");

    activeFilter.classList.toggle("active", currentFilter === "active");

    completedFilter.classList.toggle("active", currentFilter === "completed");

}

// Set up one task
function setupTask(task) {

    let checkbox = task.querySelector("input");
    let taskText = task.querySelector("span");

    let deleteBtn = task.querySelector("button");

    task.dataset.status = checkbox.checked ? "completed" : "active";

    taskText.style.textDecoration =
        checkbox.checked ? "line-through" : "none";

    // Complete or uncomplete task
    checkbox.addEventListener("change", function() {

        task.dataset.status =
            checkbox.checked ? "completed" : "active";

        taskText.style.textDecoration =
            checkbox.checked ? "line-through" : "none";

        applyFilter();
        updateTaskCount();

    });

    // Delete task
    deleteBtn.addEventListener("click", function() {

        task.remove();

        updateTaskCount();

    });

}

// Set up all original HTML tasks
let originalTasks = taskList.children;

for (let i = 0; i < originalTasks.length; i++) {
    setupTask(originalTasks[i]);
}

// Add new task
function addTask() {

    let task = taskInput.value.trim();

    if (task === "") {
        return;
    }

    let newTask = document.createElement("div");
    newTask.classList.add("task-item");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let taskText = document.createElement("span");
    taskText.innerText = task;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑️";

    newTask.appendChild(checkbox);
    newTask.appendChild(taskText);
    newTask.appendChild(deleteBtn);

    taskList.appendChild(newTask);

    setupTask(newTask);

    taskInput.value = "";

    applyFilter();
    updateTaskCount();

}

// Add button click
addBtn.addEventListener("click", function() {
    addTask();
});

// Press Enter to add task
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Clear all tasks
clearBtn.addEventListener("click", function() {

    taskList.innerHTML = "";

    updateTaskCount();

});

// Filter buttons
allFilter.addEventListener("click", function() {

    currentFilter = "all";

    applyFilter();
    updateFilterHighlight();

});

activeFilter.addEventListener("click", function() {

    currentFilter = "active";

    applyFilter();
    updateFilterHighlight();

});

completedFilter.addEventListener("click", function() {

    currentFilter = "completed";

    applyFilter();
    updateFilterHighlight();

});

// Initial setup
updateTaskCount();
updateFilterHighlight();
