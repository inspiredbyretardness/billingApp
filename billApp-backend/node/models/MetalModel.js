const mongoose = require('mongoose')

const MetalSchema = mongoose.Schema({
    metalName:{type:String,required:true}
},{
    timestamps: true
})

const metal = mongoose.model("Metal",MetalSchema) 

module.exports = metal