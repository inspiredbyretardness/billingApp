const asyncHandler = require("express-async-handler");
const Billing = require("../models/BillingModel");

const getData = ()=>{
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return formattedToday = dd + '/' + mm + '/' + yyyy;
}
const saveBill = asyncHandler(async(req,res)=>{
    const {BillId,name,phone,email,pan,address,product,notes,paymentMethod,transctionId} = req.body;
    var date = getData();
    var time = new Date().toLocaleTimeString();
    try {
        const saveABilll = await Billing.create({BillId,date,time,name,phone,email,pan,address,product,notes,paymentMethod,transctionId})
        res.json(saveABilll)
    } catch (error) {
        console.log(error);
        res.json(error.errors)
    }
})
const getBill = asyncHandler(async(req,res)=>{
    try {
        const getABill = await Billing.find({id:req.params.id}).populate("product")
        res.json(getABill)
    } catch (error) {
        console.log(error);
        res.json(error.errors)
    }
})
module.exports = {saveBill,getBill}