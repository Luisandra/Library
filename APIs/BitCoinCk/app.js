const express = require('express');
const app = express();

const $fetch = require('node-fetch');

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/", (req, res) =>{
    res.render("home");
})

app.get("/results", (req, res)=>{
    let curCode = req.query.currencyType
    const url = `https://api.coindesk.com/v1/bpi/currentprice.json`
    
    $fetch(`${url}`)
    .then((response)=>{
        if(!response.ok){
            throw Error;
        }
        return response.json();
    })
    .then((data)=>{
        let info = data["bpi"][curCode];
                
        res.render("results", {bitData: info})
        
    })
    .catch((error)=>{
        res.render(error)
    })
    
})




app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
    
})