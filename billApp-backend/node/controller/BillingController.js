const asyncHandler = require("express-async-handler");
const Billing = require("../models/BillingModel");

const saveBill = asyncHandler(async(req,res)=>{
    const {BillId,name,phone,email,pan,address,product,notes} = req.body;
    try {
        const saveABilll = await Billing.create({BillId,name,phone,email,pan,address,product,notes});
        res.json(saveABilll)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})
const getBill = asyncHandler(async(req,res)=>{
    try {
        const getABill = await Billing.find({id:req.params.id}).populate("product")
        res.json(getABill)
    } catch (error) {
        console.log(error);
        res.status(400).json(error) 
    }
})
module.exports = {saveBill,getBill}