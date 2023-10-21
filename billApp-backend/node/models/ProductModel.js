const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    //productId is human understandable id sequence, you still need to use objectID to fetch records
    productId:{type: String, required: true},
    productName: { type: String, required: true },
    productDescription:{type:String,required:true},
    grossWeight: { type: Number, required: true },
    netWeight:{type:Number, required:true},
    caretGold:{type:String,required:true,default: 'NA'},
    caretStone:{type:String,required:true,default: 'NA'},
    makingCharges: { type: Number, required: true },
    wastage: { type: Number, required: true },
    metal:{type: mongoose.Types.ObjectId, ref: "Metal"},
    isStone: { type: Boolean, required: true },
    stoneWeight: { type: Number, required: true },
    stones:[{type: mongoose.Types.ObjectId, ref: "Stone"}],
    notes:{type:String,required:false}
},{
    timestamps: true
})

const product = mongoose.model("Product",ProductSchema)
module.exports = product