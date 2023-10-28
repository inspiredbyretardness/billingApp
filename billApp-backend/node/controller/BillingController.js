const asyncHandler = require("express-async-handler");
const Billing = require("../models/BillingModel");
const Product = require("../models/ProductModel");
const Stock = require("../models/StockModel");


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
    const {BillId,name,phone,email,pan,address,products,notes,billAmt,paymentMethod,transctionId} = req.body;
    var date = getData();
    var productsList = products
    var time = new Date().toLocaleTimeString();
    try {
        const saveABilll = await Billing.create({BillId,date,time,name,phone,email,pan,address,products,notes,billAmt,paymentMethod,transctionId})
        var saveStock =  productsList?.map((p)=>{
           return  updateStock(p.product,p.qty)
        })
        console.log(saveStock);
        //saveABilll["stock"] = stockObj
        res.json(saveABilll)
        res.send("saveABilll")
    } catch (error) {
        console.log(error);
        res.json(error.errors)
    }
})
const updateStock = async(id,qty)=>{
    var stockObj = {}
    try {
        var pstock = await Product.findById(id)
        console.log(pstock.stock);
        if(pstock.stock > 0 ){ 
            var stockUp = await Product.findByIdAndUpdate(id,{"stock":pstock.stock - qty})
        }else{
            stockObj["stockUpdate"]=`Product (${productName}) out of stock`
        }
    } catch (error) {
        return {"stockUpdate":`Error updating stock`}
    }
    return stockObj;
}
const getBill = asyncHandler(async(req,res)=>{
    try {
        var getABill = await Billing.findById(req.params.id)
       getABill = await await Product.populate(getABill,{
        path: "products.product",
        
     })
        res.json(getABill)
    } catch (error) {
        console.log(error);
        res.json(error.errors)
    }
})
const getAllOrders = asyncHandler(async(req,res)=>{
    try {
        var getAllBills = await Billing.find({}).sort({ _id: -1 }).limit(5);
        getAllBills = await Product.populate(getAllBills,{
            path: "products.product",
            
         })
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
        var getRecentOrder = await Billing.find().sort({'_id':-1}).limit(1)
        getRecentOrder = await await Product.populate(getRecentOrder,{
            path: "products.product",
            
         })
        console.log(getRecentOrder);
        res.json(getRecentOrder);
    } catch (error) {
        console.log(error);
        res.json(error.errors)        
    }
})
module.exports = {saveBill,getBill,getAllOrders,getSum,getRecentOrder}