function handleTaskSubmission(event) {
  event.preventDefault(); // Prevent the form from refreshing

  // Get the task input value
  let taskInputValue = document.getElementById("taskInput").value;

  if (taskInputValue.length > 20) {
    alert("Task is too long. Please limit it to 20 characters.");
  } else {
    // If valid, log the task to the console
    console.log("Task entered:", taskInputValue);
    addTaskToBackend(taskInputValue);

    // Clear the input field after submission
    document.getElementById("taskInput").value = "";
  }
}

function addTaskToBackend(task) {
  fetch ("http://localhost:3000/tasks", {
    method: "POST", // We're sending data to the server
    headers: {
      "Content-Type": "application/json" // Tell the server we're sending JSON
    },
    body: JSON.stringify({ task }) // Convert the task into a JSON string
  })
  .then ((response) => response.json()) // Parse the response as JSON
  .then ((newTask) => {
    addCommentWithDelete(newTask); // Add the new task to the DOM
  })
  .catch ((error) => {
    console.error("Error adding task:", error); // Handle any errors
  });
}

function deleteTaskFromBackend (taskId, taskElement) {
  fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: "DELETE"
  })
  .then (() => {
    taskElement.remove(); // Remove from the page
  })
  .catch ((error) => {
    console.error("Error deleting task:", error) ;
  });
}

function addTaskToList(task) {
  let taskList = document.getElementById("taskList");
  let newTask = document.createElement("li");
  newTask.textContent = task.task;

    // Create a delete button
  // const deleteButton = document.createElement("button");
  // deleteButton.textContent = "Delete";

  // // Add event listener for the delete button
  // deleteButton.addEventListener("click", function () {
  //   deleteTaskFromBackend(task.id, newTask);
  // });

  // newTask.appendChild(deleteButton);
  taskList.appendChild(newTask);
}

function addCommentWithDelete(task) {
  let taskList = document.getElementById("taskList");
  let newTask = document.createElement("li");
  newTask.textContent = task.task;

    // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // Add event listener for the delete button
  deleteButton.addEventListener("click", function () {
    deleteTaskFromBackend(task.id, newTask);
  });

  newTask.appendChild(deleteButton);
  taskList.appendChild(newTask);
    
}

// Step 2: Attach the event listener to the form
document
  .getElementById("taskForm")
  .addEventListener("submit", handleTaskSubmission);

window.addEventListener("DOMContentLoaded", fetchTasks);

function fetchTasks() {
  fetch("http://localhost:3000/tasks") // Send a GET request to the server
  .then((response) => response.json()) // Convert the response to JSON
  .then((tasks) => {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear the existing list
    tasks.forEach((task) => {
      addTaskToList(task);
    });
  })
  .catch((error) => console.error("Error fetching tasks:",error));
}