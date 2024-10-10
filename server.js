const express = require("express"); // Import Express
const cors = require("cors"); // Import CORS middleware

const app = express(); // Initialize the Express app
const port = 3000; // Define the port where the server will listen

// Use CORS to allow requests from the frontend
app.use(cors());
// Use express.json() to parse incoming JSON requests
app.use(express.json());

let tasks = [ // In-memory array to store tasks
    { id: 1, task: "Great website! Really shows your mastery with HTML and CSS." }
];

// GET route to send the list of tasks to the frontend
app.get("/tasks", (req, res) => {
    res.json(tasks); // Send the tasks array as a JSON response
});

app.post("/tasks", (req, res) => {
    const newTask = {
        id: tasks.length + 1, // Assign a unique ID
        task: req.body.task // Get the task from the request body
    };
    tasks.push(newTask) ; // Add to tasks array
    res.json(newTask) ; // Send back the new task
});

app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id); // Convert id to integer
    tasks = tasks.filter((task) => task.id != taskId) ; // Remove the task
    res.sendStatus(200) ; // Send OK status
});

// Start the server and listen for requests on port 3000
app.listen(port, () => {
    console.log(`Server running on <http://localhost>:${port}`);
});