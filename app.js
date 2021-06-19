const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
// const {buildSchema} = require('graphql')

const schema = require('./schema/schema')




const app = express()

app.use(bodyParser.json())
app.use('/graphql' , graphqlHttp.graphqlHTTP({
    schema : schema ,
    graphiql: true
}))


app.listen(3000 , ()=>{
    console.log("Connected to port 3000")
})