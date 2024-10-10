const express = require("express"); // Import Express
const cors = require("cors"); // Import CORS middleware

const app = express(); // Initialize the Express app
const port = 3000; // Define the port where the server will listen

// Use CORS to allow requests from the frontend
app.use(cors());
// Use express.json() to parse incoming JSON requests
app.use(express.json());

let comments = [ // In-memory array to store comments
    { id: 1, comment: "Great website! Really shows your mastery with HTML and CSS." }
];

// GET route to send the list of comments to the frontend
app.get("/comments", (req, res) => {
    res.json(comments); // Send the comments array as a JSON response
});

app.post("/comments", (req, res) => {
    const newComment = {
        id: comments.length + 1, // Assign a unique ID
        comment: req.body.comment // Get the comment from the request body
    };
    comments.push(newComment) ; // Add to comments array
    res.json(newComment) ; // Send back the new comment
});

app.delete("/comments/:id", (req, res) => {
    const commentId = parseInt(req.params.id); // Convert id to integer
    comments = comments.filter((comment) => comment.id != commentId) ; // Remove the comment
    res.sendStatus(200) ; // Send OK status
});

// Start the server and listen for requests on port 3000
app.listen(port, () => {
    console.log(`https://jessicas-js-experiments.onrender.com:${port}`);
});