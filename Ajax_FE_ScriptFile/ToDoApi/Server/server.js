const express = require("express");
const svr = express();

const bodyParser = require("body-parser");
svr.use(bodyParser.urlencoded({extended: true}));

const morgan = require("morgan");
svr.use(logger('dev'));

const port = process.env.PORT || 3000;

var toDoArray = [
    {
        id: 1,
        description: "Call mom", 
        isComplete: false
    }, 
    {
        id: 2, 
        description: "Buy groceries",
        isComplete: false
    }, 
    {
        id: 3, 
        description: "Go to movies",
        isComplete: false   
    }
];

//Route Handlers:

svr.get("/", (req, res)=>{
    res.send("Msg from Home Page");
})

//Get - to read existing item (read)
svr.get("/todos", (req, res)=>{
    res.send({todos: toDoArray});
})

//Post to add new (create)
svr.post("/todos", (req, res)=>{
    let newObj = {
        id: 4,
        description: "Buy more stuff",
        isComplete: false
    };
    toDoArray.push(newObj);
    res.send(toDoArray);
})


//Delete-  to remove item (delete)
svr.delete("/todos/:id", (req, res)=>{
    let n = req.params.id;
    num = Number(n);
    let index = toDoArray.findIndex(i => i.id ===num);

    // If not found index is -1, splice still runs
    // Need if stmt to ensure delete doesn't occur when num not found
    //*** in SPLICE, -1 means start at the end */
    if(index>=0){
        toDoArray.splice(index, 1);
    }
    res.send(toDoArray);
})


//Put method to update/alter (update)
svr.put("/todos/:todoid", (req, res)=>{
    //
    let n = req.params.todoid;
    
    num = Number(n);

    let index = toDoArray.findIndex(i => i.id ===num);
    
    if(index<0 || typeof num !== "number"){
        res.status(404).send({
            errorCode: 100404, 
            message: "ToDoID not found"});
    }

    //
    let thisToDoObj = toDoArray[index];
    //runs only if undefined
    if(thisToDoObj){
        //
        thisToDoObj["isComplete"] = !thisToDoObj.isComplete
        //
        
        //sending updated data back to the client 
        res.send(thisToDoObj);
        //use this code if you want to send a different status code. .send will automatically send 200
        // res.statusCode(202).send(thisToDoObj);
    } else {
        res.status(404).end()
    }
    
})

svr.listen(port, ()=>{
    console.log(`Listening on port ${port}`);

    
    
})