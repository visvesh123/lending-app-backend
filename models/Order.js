const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
   borrowerId : String,
   lenderId : String ,
   postId : String,
   time : String
})


module.exports = mongoose.model('Order', orderSchema)