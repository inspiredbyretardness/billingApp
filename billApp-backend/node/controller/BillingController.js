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
    const {BillId,name,phone,email,pan,address,product,notes,billAmt,paymentMethod,transctionId} = req.body;
    var date = getData();
    var time = new Date().toLocaleTimeString();
    try {
        const saveABilll = await Billing.create({BillId,date,time,name,phone,email,pan,address,product,notes,billAmt,paymentMethod,transctionId})
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
const getAllOrders = asyncHandler(async(req,res)=>{
    try {
        const getAllBills = await Billing.find({}).populate("product")
        res.json(getAllBills)
    } catch (error) {
        console.log(error);
        res.json(error.errors)
    }
})
const getSum = asyncHandler(async(req,res)=>{
    try {
        const getSum = await Billing.aggregate([
        {
            $group: {
            _id: null,
            totalQty: { $sum: '$billAmt' },
            },
        },
        { $project: { _id: 0 } },
        ])
        res.json(getSum);
    } catch (error) {
        console.log(error);
        res.json(error.errors)        
    }
})
const getRecentOrder = asyncHandler(async(req,res)=>{
    try {
        const getRecentOrder = await Billing.find().sort({'_id':-1}).limit(1).populate('product')
        console.log(getRecentOrder);
        res.json(getRecentOrder);
    } catch (error) {
        console.log(error);
        res.json(error.errors)        
    }
})
module.exports = {saveBill,getBill,getAllOrders,getSum,getRecentOrder}