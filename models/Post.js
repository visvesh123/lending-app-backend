const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
   userId : String,
   productName : String,
   imgurl : String,
   description : String,
   pointsPerDay : Number,
   categories : String,
   till_date : String
})


module.exports = mongoose.model('Post', postSchema)