const express = require('express');
const app = express();

// bdyPrser takes info and turns it into an object which can be sent 
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:  true}));

app.set("view engine", "ejs");

const port = process.env.PORT || 3000;

//variable will reset every time server is reset
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"]

app.get("/", (req, res)=>{
    res.render("home");
})

//created this route after /friends route
app.post("/addfriend", (req, res)=>{
    //can only use req.body when bodyparser is installed
    let newFriend = req.body.newFriend;
    friends.push(newFriend);
    //should be the route in app.get line
    res.redirect("/friends");
})

app.get("/friends", (req, res)=>{    
    res.render("friends", {friends: friends});
})


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
    
})

