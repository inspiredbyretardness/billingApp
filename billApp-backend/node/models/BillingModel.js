const mongoose = require('mongoose')

const Billing = mongoose.Schema({
    BillId:{type:String,required:true},
    date:{type:String,required:true},
    time:{type:String,required:true},
    name:{type:String,required:true},
    phone:{type:String,required:false},
    email:{type:String,required:false},
    pan:{type:String,required:false},
    address:{type:String,required:false},
    product:[{type: mongoose.Types.ObjectId, ref: "Product"}],
    notes:{type:String,required:false},
    billAmt:{type:Number,required:true},
    paymentMethod:{type:String,required:true},
    transctionId:{type:String,required:true}
    
},{
  timestamps: true
})

const billing = mongoose.model("Billing",Billing)
module.exports = billing;