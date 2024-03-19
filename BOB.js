// Retrieve tasks from local storage on page load
window.onload = function() {
    loadTasks();
    loadScores();
    loadDarkModePreference();
    addRefreshButton();
};

// Initialize score object
let scores = JSON.parse(localStorage.getItem('scores')) || {};
let streak = 0;

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    const taskList = document.getElementById('taskList');
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
    }
}

function loadScores() {
    const savedScores = localStorage.getItem('scores');
    if (savedScores) {
        scores = JSON.parse(savedScores);
        updateScoreboard();
    }
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const deadlineInput = document.getElementById("deadlineInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value === "" || deadlineInput.value === "") {
        alert("Please enter a task and its deadline.");
        return;
    }

    const task = taskInput.value;
    const deadline = new Date(deadlineInput.value);
    const now = new Date();
    const timeDifference = deadline - now;
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const li = document.createElement("li");
    li.innerHTML = task + " (Deadline: " + deadlineInput.value + ") - " + daysDifference + " days remaining";

    const warningBarColor = daysDifference <= 1 ? "red" : daysDifference <= 9 ? "orange" : "green";
    li.style.borderLeft = "10px solid " + warningBarColor;

    const removeBtn = createButton(" &#10060;", "remove-task", removeTask);
    const tickBtn = createButton(" &#10004;", "tick-task", tickTask);

    li.appendChild(removeBtn);
    li.appendChild(tickBtn);

    taskList.appendChild(li);

    updateLocalStorage();

    taskInput.value = "";
    deadlineInput.value = "";
}

function createButton(text, className, onClickFunction) {
    const btn = document.createElement("span");
    btn.innerHTML = text;
    btn.className = className;
    btn.onclick = onClickFunction;
    return btn;
}

function removeTask() {
    const li = this.parentElement;
    const player = prompt('Enter your name:');
    if (player) {
        if (!scores[player]) {
            scores[player] = 0;
        }
        scores[player]--;
        updateScoreboard();
        updateStreak(false);
        const taskList = document.getElementById("taskList");
        taskList.removeChild(li);
        updateLocalStorage();
    }
}

function tickTask() {
    const li = this.parentElement;
    const player = prompt('Enter your name:');
    if (player) {
        if (!scores[player]) {
            scores[player] = 0;
        }
        scores[player]++;
        updateScoreboard();
        updateStreak(true);
        removeTask.bind(this)();
    }
}

function updateLocalStorage() {
    const taskList = document.getElementById("taskList");
    localStorage.setItem('tasks', taskList.innerHTML);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const darkModeEnabled = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
}

function loadDarkModePreference() {
    const darkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    }
}

function clearLocalStorage() {
    localStorage.removeItem('tasks');
    document.getElementById('taskList').innerHTML = '';
}

function updateScoreboard() {
    localStorage.setItem('scores', JSON.stringify(scores));
    const scoreboard = document.getElementById('scores');
    scoreboard.innerHTML = '';
    for (const [player, score] of Object.entries(scores)) {
        const listItem = document.createElement('li');
        listItem.textContent = `${player}: ${score} points`;
        scoreboard.appendChild(listItem);
    }
}

function updateStreak(success) {
    const streakCounter = document.getElementById('streak');
    success ? streak++ : streak = 0;
    streakCounter.textContent = streak;
}

function clearScoreboardStorage() {
    localStorage.removeItem('scores');
    scores = {};
    updateScoreboard();
}

// Function to add refresh button at the end of scoreboard
function addRefreshButton() {
    const scoreboard = document.getElementById('scoreboard');
    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Refresh';
    refreshButton.className = 'refresh-btn';
    refreshButton.onclick = clearScoreboardStorage;
    scoreboard.appendChild(refreshButton);
}







function login(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Dummy login logic (replace with your actual authentication logic)
    if (username === "Pranjal" && password === "admin") {
        window.location.href = "index.html"; // Redirect to index.html
    } else {
        alert("Invalid username or password. Please try again.");
    }
}
