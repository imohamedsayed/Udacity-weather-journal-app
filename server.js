// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
const server = app.listen(port, () => {
  console.log("Server is Running ");
  console.log(`Running on localhost : ${port}`);
});

// get all data

app.get("/all", (req, res) => {
  res.send(projectData);
});

// post data

app.post("/postData", (req, res) => {
  const data = req.body;

  const newEntry = {
    temp: data.temp,
    date: data.date,
    content: data.content,
  };
  projectData = newEntry;

  res.send(projectData);
});
