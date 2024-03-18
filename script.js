window.onload = function() {
    var savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        document.getElementById('taskList').innerHTML = savedTasks;
    }
}

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var deadlineInput = document.getElementById("deadlineInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value === "" || deadlineInput.value === "") {
        alert("Please enter a task and its deadline.");
        return;
    }

    var task = taskInput.value;
    var deadline = new Date(deadlineInput.value);
    var now = new Date();
    var timeDifference = deadline - now;
    var daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    var li = document.createElement("li");
    li.innerHTML = task + " (Deadline: " + deadlineInput.value + ") - " + daysDifference + " days remaining";
    
    var warningBarColor;
    if (daysDifference <= 1) {
        warningBarColor = "red";
    } else if (daysDifference <= 9) {
        warningBarColor = "orange";
    } else {
        warningBarColor = "green";
    }
    li.style.borderLeft = "10px solid " + warningBarColor;
    
    taskList.appendChild(li);
    //aa
    let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span);
        //aa


    // Save tasks to local storage
    localStorage.setItem('tasks', taskList.innerHTML);

    taskInput.value = "";
    deadlineInput.value = "";
}

function toggleDarkMode() {
    var body = document.body;
    var containers = document.querySelectorAll(".container");
    var navLinks = document.querySelectorAll("nav a");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        containers.forEach(container => {
            container.classList.remove("dark-mode");
        });
        navLinks.forEach(link => {
            link.classList.remove("dark-mode");
        });
    } else {
        body.classList.add("dark-mode");
        containers.forEach(container => {
            container.classList.add("dark-mode");
        });
        navLinks.forEach(link => {
            link.classList.add("dark-mode");
        });
    }
}

