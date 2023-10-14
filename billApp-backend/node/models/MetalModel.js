const mongoose = require('mongoose')

const MetalSchema = mongoose.Schema({
    Metal:{type:String,required:true}
})

const metal = mongoose.model("Metal",MetalSchema) 

module.exports = metal