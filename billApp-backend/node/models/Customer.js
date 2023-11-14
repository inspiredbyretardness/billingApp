const mongoose = require('mongoose')

const Customer = mongoose.Schema({
    name:{type:String,required:true},
    phone:{type:String,required:false},
    email:{type:String,required:false},
    pan:{type:String,required:false},
    address:{type:String,required:false},
},{
    timestamps: true
  })

const customer = mongoose.model('Customer',Customer)  
module.exports = customer;