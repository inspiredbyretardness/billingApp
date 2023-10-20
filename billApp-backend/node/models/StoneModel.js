const mongoose = require('mongoose')

const StoneSchema = new mongoose.Schema({
    stoneName:{type:String,required:true},
    isPrecious:{type:Boolean,required:true}
})

const stone = mongoose.model("Stone",StoneSchema)
module.exports = stone