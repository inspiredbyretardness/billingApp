const asyncHandler = require("express-async-handler");
const Billing = require("../models/BillingModel");
const Product = require("../models/ProductModel");
const Stock = require("../models/StockModel");
const Customer = require("../models/Customer");
const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015


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
    const {BillId,customer,products,notes,billAmt,paymentMethod,transctionId} = req.body;
    var date = getData();
    var productsList = products
    var timeStr = new Date()
    var hrs = (timeStr.getHours() < 10 ? '0' : '') + timeStr.getHours()
    var min = (timeStr.getMinutes() < 10 ? '0' : '') + timeStr.getMinutes()
    var sec = (timeStr.getSeconds() < 10 ? '0' : '') + timeStr.getSeconds() 
    var time = `${hrs}:${min}:${sec}`
    try {
        const saveABilll = await Billing.create({BillId,date,time,customer,products,notes,billAmt,paymentMethod,transctionId})
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
     getABill = await await Customer.populate(getABill,{
        path:"customer"
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
         getAllBills = await await Customer.populate(getAllBills,{
            path:"customer"
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
         getRecentOrder = await await Customer.populate(getRecentOrder,{
            path:"customer"
         })
        console.log(getRecentOrder);
        res.json(getRecentOrder);
    } catch (error) {
        console.log(error);
        res.json(error.errors)        
    }
})
const getTodaysOrders = asyncHandler(async(req,res)=>{
    const start = dayjs().startOf('day').format(); // set to 12:00 am today
    const end = dayjs().endOf('day').format(); // set to 23:59 pm today
    console.log(start,end);
    try {
        var getTodaysAllOrder = await Billing.find({createdAt: {$gte: new Date(start), $lt: new Date(end)}})
        var getTodaysHrsData =  await Billing.aggregate([
            {
              $match: {
                createdAt: {
                  "$gte": new Date(start),
                  "$lt": new Date(end)
                }
              }
            },
            {
              $group: {
                _id: {
                  $substr: [
                    "$time",
                    0,
                    2
                  ]
                },
                count: {
                  "$sum": 1
                },
                amount: {
                  $sum: "$billAmt"
                }
              }
            },
            {
              $addFields: {
                time: {
                    $concat: [
                      "$_id",
                      ":00"
                    ]
                  }
              }
            }
          ]).sort({time:1})
        res.json(getTodaysHrsData)
        
    } catch (error) {
        console.log(error);
        res.json(error.errors)
    }
})

module.exports = {saveBill,getBill,getAllOrders,getSum,getRecentOrder,getTodaysOrders}