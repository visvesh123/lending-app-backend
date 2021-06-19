const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
// const {buildSchema} = require('graphql')
const mongoose = require('mongoose')

const schema = require('./schema/schema')




const app = express()

app.use(bodyParser.json())
app.use('/graphql' , graphqlHttp.graphqlHTTP({
    schema : schema ,
    graphiql: true
}))

try{
    mongoose.connect('mongodb+srv://support:support@cluster0.zjijz.mongodb.net/lending?retryWrites=true&w=majority',
    {
        useNewUrlParser : true ,
        useUnifiedTopology: true
    })

    mongoose.connection.once('open', ()=>{
        console.log("Connected to database cluster lending")
    })
}
catch(err){
    console.log(err)
}


app.listen(3000 , ()=>{
    console.log("Connected to port 3000")
})