const express = require("express");
const app = express();

const logger = require("morgan");
app.use(logger("dev"));

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//to allow for communication to front end
//will be a security issue w/ ajax/jquery if not installed
//there will be a security issue
const cors = require('cors')
app.use(cors());

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
  // sends back the current toDoArray as json
  res.json(toDoArray);
});

// Create data
app.post("/todos", function(req, res) {
  // array of hard-coded data for testing purposes
  // let newTodo = {
  //   id: 4,
  //   description: "Buy more Stuff",
  //   isComplete: false
  // };
  // NOTE: allows for real application where user inputs todo and 
  // auto-increment of id
  let newTodo = { 
    id: num++, 
    description: req.body.item, 
    isComplete: false 
}
  // append the new todo object to toDoArray array
  toDoArray.push(newTodo);
  // displaying in terminal for testing/debugging purposes
  console.log(toDoArray);
  // set status to 201 which is successful
  // send back json version of newTodo object
  // no need to send whole array back, just the new todo item
  res.status(201).json(newTodo);
});

// Delete data
app.delete("/todos/:id", (req, res) => {
  // get the requestedToDoId from req.params and ensure it is a number
  let requestedToDoId = parseInt(req.params.id);

  // use the findIndex() method to find the index of the requested
  // todo in the toDoArray
  let requestedToDoIndex = toDoArray.findIndex(function(todo) {
    return todo.id === requestedToDoId;
  });

  if(requestedToDoIndex >= 0 ){

    // use the splice() method to remove the requested todo from the toDoArray
    toDoArray.splice(requestedToDoIndex, 1)

    // send the toDoArray as a confirmation only,
    // front end will not need the actual data for anything
    res.status(201).send(toDoArray)
  } else {
      // if no index is found, let front end know
    res.status(444).send('Id does not exist for deletion')
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

// const express = require('express');
// const app = express();

// const logger = require('morgan');
// app.use(logger('dev'));
// // ('dev') - returns route type, status code, time and amnt of data sent  //GET / 200 5.064 ms - 10
// //('tiny') - reverses order of data
// //('production') - does not send time, only returns word production

// const bodyParser = require('body-parser')
// //special coding in url which can now be read by bodyparser
// app.use(bodyParser.urlencoded({extended: false}))
// //if there is json body parser will extract data
// app.use(bodyParser.json())

// const port = process.env.PORT || 3000;

// let toDoArray = [
//     {
//         id: 1,
//         description: "Call mom", 
//         isComplete: false
//     }, 
//     {
//         id: 2, 
//         description: "Buy groceries",
//         isComplete: false
//     }, 
//     {
//         id: 3, 
//         description: "Go to movies",
//         isComplete: false   
//     }
// ];

// let num = 4

// app.get("/", (req, res)=>{
//     res.send(`Root Route`)
// })

// //read
// app.get("/todos", (req, res)=>{
//     res.send(toDoArray);
// })

// //create
// app.post("/todos", (req, res)=>{
//     let newTodo = {
//         id: num++,
//         //pulling info from the body. 
//         description: req.body.item,
//         isComplete: false
//     };
//     toDoArray.push(newTodo);
//     //sending new todo back as json, since front end code likely already working w/ json
//     res.status(201).json(newTodo);
// })

// //delete
// app.delete('/todos/:id', (req, res)=>{
//     let requestedToDoId = Number(req.params.id);
//     let requestedToDoIndex = toDoArray.findIndex(requestedToDoId => 
//         requestedToDoId.id ===num)

//     //if there's no index, it will return -1 - This code will then remove the end index, b/c -1 in splice means to start at the end
//     //if stmt needed to check and not use -1
    
//     if(requestedToDoIndex >= 0 ){
//         toDoArray.splice(requestedToDoIndex, 1)
//         res.status(201).send(toDoArray);
//     } else {
//         res.status(444).send('ID not found')
//     }
    
// })

// //update
// app.put("/todos/:id", (req, res)=>{
//     let requestedToDoId = parseInt(req.params.id);
//     //this returns an object
//     let requestedToDo = toDoArray.find((todo)=>{
//         todo.id === requestedToDoId;
//     })

//     //find() returns undefined if object not found
//     //if error, sometimes undefined needs to be in quotes
//     if(requestedToDo !== undefined){
//         requestedToDo.isComplete = !requestedToDo.isComplete
//             //depending on size of object, could just send a few items from the obj instead of the whole object. Can send the changed itemed item (isComplete) and something to identify they object
//         res.status(202).send(requestedToDo)
//     } else{
//         res.status(666).send(`ID not found`)
//     }
    


// })

// app.listen(port, ()=>{
//     console.log(`listening on ${port}`);
    
// })