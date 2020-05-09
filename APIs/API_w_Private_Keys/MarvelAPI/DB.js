const mongoose = require('mongoose')
const url = 'mongodb://localHost:27017/marvelAPI'
mongoose.connect(url, {useNewUrlParser: true , useUnifiedTopology: true })
.then(()=> console.log('connected to db'))
.catch()
let charSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'ID must be given']
    },
    name: String,
    description: {
        type: String,
        default: 'No description given'
    }
})
let CharModel = mongoose.model('Character', charSchema)


module.exports = CharModel

