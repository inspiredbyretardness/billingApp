const mongoose = require('mongoose')

const StockSchema = new mongoose.Schema({
    stockId:{type:String,required:true},
    product:{type:mongoose.Types.ObjectId, ref: "Product"},
    quantity:{type:Number,required:true},
    notes:{type:String,required:true}
},{
    timestamps: true
})

const stock = mongoose.model("Stock",StockSchema)
module.exports = stock