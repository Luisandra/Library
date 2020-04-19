const express = require("express");
const app = express();

const logger = require("morgan");
app.use(logger("dev"));

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors())

const port = process.env.PORT || 3000;

let toDoArray = [
  { id: 1, description: "Call mom", isComplete: false },
  { id: 2, description: "Buy groceries", isComplete: false },
  { id: 3, description: "Go to movies", isComplete: false }
];

let num = 4;


app.get("/", function(req, res) {
  res.send("Hello");
});

// Read data
app.get("/todos", function(req, res) {
  res.json(toDoArray);
});

// Create data
app.post("/todos", function(req, res) {
  let newTodo = { 
    id: num++, 
    description: req.body.description, 
    isComplete: false 
}
  toDoArray.push(newTodo);
  console.log(toDoArray);
  res.status(201).json(newTodo);
});

// Delete data
app.delete("/todos/:id", (req, res) => {
  let requestedToDoId = parseInt(req.params.id);
  let requestedToDoIndex = toDoArray.findIndex(function(todo) {
    return todo.id === requestedToDoId;
  });

  if(requestedToDoIndex >= 0 ){
    toDoArray.splice(requestedToDoIndex, 1)

    // send the toDoArray as a confirmation only,
    // front end will not need the actual data for anything
    res.status(201).send(toDoArray)
  } else {
      // if no index is found, let front end know
    res.status(400).send('Id does not exist for deletion')
  }
});

// Update
app.put("/todos/:id", (req, res) => {
  // get the requestedToDoId from req.params and ensure it is a number
  let requestedToDoId = parseInt(req.params.id);

  // find the affected todo item
  let requestedToDo = toDoArray.find(function(todo) {
    return todo.id === requestedToDoId;
  });

  if(requestedToDo !== undefined){

    // toggle the completion status
    requestedToDo.isComplete = !requestedToDo.isComplete

    // return the toggled todo as confirmation only
    // data not needed for anything
    res.status(202).send(requestedToDo)
  } else {

    // if no element is found, let front end know
    res.status(666).send('Id does not exist for updating')
  }
});

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
