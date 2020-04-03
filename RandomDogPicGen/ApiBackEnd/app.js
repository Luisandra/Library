const express = require("express");
const app = express();
const _fetch = require("node-fetch")

app.set("view engine", "ejs");

const port = process.env.PORT || 3000

var image = "https://images.dog.ceo/breeds/pyrenees/n02111500_7655.jpg"

const url = "https://dog.ceo/api/breeds/image/random"

app.use(express.static('public'))

app.get("/", (req, res) =>{
    res.render("home", {image: image});
})

app.get('/dogSearch', (req, res) =>{
    _fetch(url)
    .then((response)=>{
        if(!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })

    .then((data)=>{
        res.render("home", {image: data.message})        
    })

    .catch((error)=>{
        console.error("Error in network", error);
        
        
    })
})

app.listen(port, ()=>{
    console.log(`app listening on port: ${port}`);
    
})