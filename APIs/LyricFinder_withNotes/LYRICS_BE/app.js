//installed w/NPM - need to require
const express = require('express');
//have to invoke an instance in order to set route handlers
const app = express();
//backend fetch for http requests
const $fetch = require("node-fetch");

//setting files to ejs so file extension doesn't have to be typed
app.set("view engine", "ejs");

//used to serve static files (css/images/etc) - must point middleware to the correct folder
app.use(express.static('public'));

//api url
let url = 'https://api.lyrics.ovh/v1';

//allows for use of default port, if none, then use port 3000
const port = process.env.PORT || 3000;

//root route - renders the home page
app.get("/", (req, res)=>{
    res.render("home")
})

//results route - using GET so data sent through URL not body
app.get("/lyricResults", (req, res)=>{
    //var name comes from home.ejs pg - name attribute of input field
    let artist = req.query.doggy;
    let title = req.query.kitty

    //have to construct the api url - URL start is in url var above. artist and title are pulled through query. All are assembled to create full url for api request
    $fetch(`${url}/${artist}/${title}`)

    //response is received
    .then((response)=>{
        //if stmt checks for error
        if(!response.ok){
            throw Error;
        }
        // .json is used b/c this is node-fetch. Alternative would be installing and using Request which would require body parser
        return response.json();
        //this renders data and sends it to next .then
    })

    //take data and do something
    .then((data)=>{

        //rendering results page and sending data to front for display - can console log data and see what is returned. which is how you determine object rec'd and lyrics is what you want. 
        res.render("results", {lyrics : data.lyrics});
        
    })
    //instructions on what to do if error rec'd
    .catch((error)=>{
        res.render("error");
    })
})

//have to create listen protocol
app.listen(port, ()=>{
    console.log(`Listening on: ${port}`);
    
})
