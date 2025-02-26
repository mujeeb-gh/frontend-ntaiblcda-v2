const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static("./"));

// Serve files from src directory
app.use("/src", express.static(path.join(__dirname, "src")));

// Handle root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about/index.html"));
});

// Add routes for other pages as needed

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
