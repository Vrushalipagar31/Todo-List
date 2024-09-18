let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; // Clear the input field
        updateTaskList(); // Update the task list and progress bar
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear the list before rendering

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = 
        `<div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="https://img.icons8.com/material-rounded/24/000000/edit.png" onClick="editTask(${index})" alt="Edit Task"/>
                <img src="https://img.icons8.com/material-rounded/24/000000/delete-forever.png" onClick="deleteTask(${index})" alt="Delete Task"/>
            </div>
        </div>`;
        
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });

    updateProgress();
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList(); // Re-render the task list and update the progress bar
};

const editTask = (index) => {
    const newTaskText = prompt("Edit Task:", tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index].text = newTaskText.trim();
        updateTaskList(); // Update the task list
    }
};

const deleteTask = (index) => {
    tasks.splice(index, 1); // Remove task from the list
    updateTaskList(); // Update the task list
};

const updateProgress = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    // Update task counters
    document.getElementById("taskCount").textContent = `Total Tasks: ${totalTasks}`;
    document.getElementById("completedCount").textContent = `Completed Tasks: ${completedTasks}`;

    // Update progress bar
    const progressBarFill = document.querySelector(".progress-bar-fill");
    const progressPercentage = (totalTasks > 0) ? (completedTasks / totalTasks) * 100 : 0;
    progressBarFill.style.width = `${progressPercentage}%`;

    // Show celebration if all tasks are completed
    if (totalTasks > 0 && completedTasks === totalTasks) {
        showCelebration();
        launchConfetti();
    } else {
        hideCelebration();
    }
};

const showCelebration = () => {
    document.getElementById("celebration").classList.remove("hidden");
};

const hideCelebration = () => {
    document.getElementById("celebration").classList.add("hidden");
};

// Launch confetti when all tasks are completed
const launchConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });

    // Trigger more bursts of confetti for extra celebration!
    const duration = 3 * 1000; // 3 seconds
    const animationEnd = Date.now() + duration;
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        confetti({
            particleCount: 50,
            startVelocity: 30,
            spread: 100,
            origin: { y: Math.random() - 0.2 },
        });
    }, 250);
};

// Event listener for the "Add Task"
// Event listener for the "Add Task" button
document.getElementById("newTask").addEventListener("click", function(e) {
    e.preventDefault();
    addTask();
});
