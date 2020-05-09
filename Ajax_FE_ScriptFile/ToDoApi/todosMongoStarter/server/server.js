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


// NOTE: HOW TO CONVERT TO MONGO/MONGOOSE
// 1) Build our connection
//    a) install Mongoose
//    b) connect
const mongoose = require('mongoose')
let url = 'mongodb://localHost:27017/lmm_todo_list'
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log(`CONNECTED: ${url}`)
)
.catch((err)=>console.error("ERROR: ", err)
)
// 2) Build blueprints
//    a) Schema
const todoSchema = mongoose.Schema({
  // id: Number, - Mongo creates an id automatically, this is not longer needed 
  description: {
    type: String,
    require: [true, "Description required"]
  }, 
  isComplete: {
    type: Boolean,
    default: false
  }
})

//    b) Model
const TodoModel = mongoose.model("Item", todoSchema) //collection will be items

// 3) Build queries
//    a) Read with Mongoose

//    b) Create with Mongoose
//    c) Delete with Mongoose
//    d) Update with Mongoose


// let toDoArray = [
//   { id: 1, description: "Call mom", isComplete: false },
//   { id: 2, description: "Buy groceries", isComplete: false },
//   { id: 3, description: "Go to movies", isComplete: false }
// ];

let num = 4;


app.get("/", function(req, res) {
  res.send("Hello");
});

// Read data
app.get("/todos", function(req, res) {
  TodoModel.find({}, (err, results)=>{
    if(err){
      console.error(`Error in DB ${err}`)
    } else {
      console.log(results)
      res.json(results);
    } 
  })
  
});

// Create data
app.post("/todos", function(req, res) {
  let newTodo = new TodoModel({ 
    description: req.body.description 
  })
  newTodo.save((err, item)=>{
    if(err){
      console.error(`Error: ${err}`);
    } else{
      console.log("Saved ", item)
      res.status(201).json(item)    
    }
  })
});

// Delete data
app.delete("/todos/:id", (req, res) => {
  let requestedToDoId = req.params.id
  console.log(requestedToDoId);
  
  TodoModel.findByIdAndDelete(requestedToDoId, (err, result)=>{
    if(err){
      console.error(`Error: ${err}`) 
      res.status(400).send('Id does not exist for deletion')
    } else {
      console.log(result)
      res.status(201).send(result)
    }    
  })
});

// Update
app.put("/todos/:id", (req, res) => {
  let requestedToDoId = req.params.id
  // TodoModel.findByIdAndUpdate - can complete this in one step
  TodoModel.findById(requestedToDoId, (err, result)=>{
    if(err){
      console.error(`Error: ${err}`);  
      res.status(666).send('Id does not exist for updating')    
    } else {
      console.log(result);
      //toggles class
      result.isComplete = !result.isComplete
      //updates DB
      result.save((error, updatedItem)=>{
        if(error) {
          console.error(`Issue updating class: ${error}`)
        } else{
          console.log(updatedItem)
                //sending to front to update document
          res.status(202).send(updatedItem)
        }
      })
        //Do not add res.status here b/c it will run regardless
    }
  })
});

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
