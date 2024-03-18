// Retrieve tasks from local storage on page load
window.onload = function() {
    var savedTasks = localStorage.getItem('tasks');
    var taskList = document.getElementById('taskList');
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
    }
}

// Initialize score object
const scores = {};
let streak = 0;

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

    // Add remove button
    var removeBtn = document.createElement("span");
    removeBtn.innerHTML = " &#10060;";
    removeBtn.className = "remove-task";
    removeBtn.onclick = function() {
        var player = prompt('Enter your name:');
        if (player) {
            if (!scores[player]) {
                scores[player] = 0;
            }
            scores[player]--;
            updateScoreboard();
            updateStreak(false);
            taskList.removeChild(li);
            updateLocalStorage();
        }
    };
    li.appendChild(removeBtn);
    
    // Add tick button
    var tickBtn = document.createElement("span");
    tickBtn.innerHTML = " &#10004;";
    tickBtn.className = "tick-task";
    tickBtn.onclick = function() {
        var player = prompt('Enter your name:');
        if (player) {
            if (!scores[player]) {
                scores[player] = 0;
            }
            scores[player]++;
            updateScoreboard();
            updateStreak(true);
            taskList.removeChild(li);
            updateLocalStorage();
        }
    };
    li.appendChild(tickBtn);

    taskList.appendChild(li);

    updateLocalStorage();

    taskInput.value = "";
    deadlineInput.value = "";
}

function updateLocalStorage() {
    var taskList = document.getElementById("taskList");
    localStorage.setItem('tasks', taskList.innerHTML);
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

function clearLocalStorage() {
    localStorage.clear();
    document.getElementById('taskList').innerHTML = '';
}

// Function to update scoreboard
function updateScoreboard() {
    const scoreboard = document.getElementById('scores');
    scoreboard.innerHTML = '';
    for (const [player, score] of Object.entries(scores)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${player}: ${score} points`;
        scoreboard.appendChild(listItem);
    }
}

// Function to update streak
function updateStreak(success) {
    const streakCounter = document.getElementById('streak');
    if (success) {
        streak++;
    } else {
        streak = 0;
    }
    streakCounter.textContent = streak;
}