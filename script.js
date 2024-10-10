function handleCommentSubmission(event) {
  event.preventDefault(); // Prevent the form from refreshing

  // Get the comment input value
  let commentInputValue = document.getElementById("commentInput").value;

  if (commentInputValue.length > 100) {
    alert("Comment is too long. Please limit it to 100 characters.");
  } else {
    // If valid, log the comment to the console
    console.log("Comment entered:", commentInputValue);
    addCommentToBackend(commentInputValue);

    // Clear the input field after submission
    document.getElementById("commentInput").value = "";
  }
}

function addCommentToBackend(comment) {
  fetch ("https://jessicas-js-experiments.onrender.com/comments", {
    method: "POST", // We're sending data to the server
    headers: {
      "Content-Type": "application/json" // Tell the server we're sending JSON
    },
    body: JSON.stringify({ comment }) // Convert the comment into a JSON string
  })
  .then ((response) => response.json()) // Parse the response as JSON
  .then ((newComment) => {
    addCommentWithDelete(newComment); // Add the new comment to the DOM
  })
  .catch ((error) => {
    console.error("Error adding comment:", error); // Handle any errors
  });
}

function deleteCommentFromBackend (commentId, commentElement) {
  fetch(`https://jessicas-js-experiments.onrender.com/comments/${commentId}`, {
    method: "DELETE"
  })
  .then (() => {
    commentElement.remove(); // Remove from the page
  })
  .catch ((error) => {
    console.error("Error deleting comment:", error) ;
  });
}

function addCommentToList(comment) {
  let commentList = document.getElementById("commentList");
  let newComment = document.createElement("li");
  newComment.textContent = comment.comment;

    // Create a delete button
  // const deleteButton = document.createElement("button");
  // deleteButton.textContent = "Delete";

  // // Add event listener for the delete button
  // deleteButton.addEventListener("click", function () {
  //   deleteCommentFromBackend(comment.id, newComment);
  // });

  // newComment.appendChild(deleteButton);
  commentList.appendChild(newComment);
}

function addCommentWithDelete(comment) {
  let commentList = document.getElementById("commentList");
  let newComment = document.createElement("li");
  newComment.textContent = comment.comment;

    // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // Add event listener for the delete button
  deleteButton.addEventListener("click", function () {
    deleteCommentFromBackend(comment.id, newComment);
  });

  newComment.appendChild(deleteButton);
  commentList.appendChild(newComment);
    
}

// Step 2: Attach the event listener to the form
document
  .getElementById("commentForm")
  .addEventListener("submit", handleCommentSubmission);

window.addEventListener("DOMContentLoaded", fetchComments);

function fetchComments() {
  fetch("https://jessicas-js-experiments.onrender.com/comments") // Send a GET request to the server
  .then((response) => response.json()) // Convert the response to JSON
  .then((comments) => {
    const commentList = document.getElementById("commentList");
    commentList.innerHTML = ""; // Clear the existing list
    comments.forEach((comment) => {
      addCommentToList(comment);
    });
  })
  .catch((error) => console.error("Error fetching comments:",error));
}