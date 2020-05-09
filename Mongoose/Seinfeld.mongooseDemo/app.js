//Connect
const mongoose = require('mongoose')
let url = 'mongodb://localhost:27017/databases'

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
//if everything is good
.then(()=>{
    console.log(`Connected to database: ${url}`);
    
})
//if an error
.catch((err)=>{
    console.error('ERROR: ', err);    
})

//Blueprint
    //create schema
        //must use "new" - b/c you're passing info in
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
})
    //create model
        //collection should be singular form and Capital
        //collection will be created as plural and lowercase
const actorModel = mongoose.model("Actor", personSchema)
                                //(collection, schema)

//Query
let actor = new actorModel({
    name: "Jerry",
    age: 49,
    email: "jerryseinfeld@gmail.com"
})

// this replaces db.collection.insert(collection)
// actor.save((err, actor)=>{
//     //error first to stop code quicker if issue
//     if(err){
//         console.error('Error in database: ', err);        
//     } else {
//         console.log("Successfully saved: ", actor);
        
//     }
// })

//can also use create - combines new and save
actorModel.create({
    name: "Elaine",
    age: 41,
    email: "Elaine.benes@yahoo.com"
}, (err, actor)=>{
    err ? console.error('Error in database: ', err) : console.log("Successfully saved: ", actor)

    // if(err){
    //     console.error('Error in database: ', err);        
    //     } else {
    //     console.log("Successfully saved: ", actor);        
    // }
})

//Find Query
//replaces db.collection.find(search criteria)
actorModel.find({}, (error, results)=>{
    if(error){
        console.error('Error in database: ', error);        
    } else {
        console.log("Successfully saved: ", results);
        //server will remain connected
        mongoose.disconnect(); //disconnects mongoose. If process.exit() - will disconnect node
    }      
})
