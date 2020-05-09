// https://developer.marvel.com/documentation/authorization
// Need timestamp, hash, private key and public key
require('dotenv').config()
//have to require dotenv - it pulls the .env file which contains public and private keys

const express = require ('express')
const app = express()

const $fetch = require('node-fetch')
//Built in Node module for generating hash
const crypto = require('crypto')
// doc: https://nodejs.org/api/crypto.html

        //will take any default port, if none, then will run on port 3000
let port = process.env.PORT || 3000
//No one can see the values of the keys b/c it's in .env folder
const pubKey = process.env.PUB_KEY
const privKey = process.env.PRIV_KEY

const CharModel = require('./db')


app.listen(port, ()=>{
    console.log(`listening on port ${port}`)   
})

app.get('/', (req, res)=>{
    res.render('home.ejs')
})

//route handler for the ACTION attribute on input field (on home page)
app.get('/search', (req, res)=>{
    let characName = req.query.chName
    
    let ts = Date.now()
        //pubKey and privKey - technically numbers (hexdecimal), but is being passed as string (see .env file) - to keep everything as numbers and not concatenate, need to have TS first - Marvel docs show how to structure for md5 ts + privkey + pubkey
    let preHash = ts + privKey + pubKey

    //Marvel API needs 'md5 digest' - will take public and private key and convert it to a hexidecimal
    let hash = crypto.createHash('md5').update(preHash).digest('hex')

    //url needs private key, public key, hash and timestamp
    let url = 'https://gateway.marvel.com/v1/public/characters?limit=10&nameStartsWith=' 
                + characName
                + `&ts=${ts}`
                + '&apikey='
                + pubKey
                + '&hash='
                + hash
         
    $fetch(url)
             //extract data from json  
    .then(response => response.json())
    .then(results => {
        console.log('RESULTS: ', results.data.results)
                    //send data to the front so it can be displayed. Data sent as object
        res.render('results.ejs', {data: results.data.results})
    })
    .catch((error) => {
        console.log('Error', error)
    })
})

app.get('/showResult', (req, res)=>{
    CharModel.find({}, (err, results)=>{
        if(err){
            console.log(err)
        } else {
            console.log(results);
            res.render('dbResults.ejs', {data: results})   
        }
    }

    )
})
