const asyncHandler = require('express-async-handler')
const Stock = require("../models/StockModel")
const Stone = require("../models/StoneModel")

const addStock = asyncHandler(async(req,res)=>{
    try {
        const {stockId,product,quantity,notes} = req.body;
        const addAStock = await Stock.create({stockId,product,quantity,notes})
        res.json(addAStock)
    } catch (error) {
        console.log(error);
        res.json(error.errors)
    }
})
const getStock = asyncHandler(async(req,res)=>{
    try {
        var getAllStock = await Stock.find({}).populate("product")
            getAllStock = await await Stone.populate(getAllStock,{
               path: "product.stones",
               select: "stoneName isPrecious", 
            })
       
        res.json(getAllStock)
    } catch (error) {
        console.log(error);
        res.status(400).json(error.errors || error)
    }
})
const updateStock = asyncHandler(async(req,res)=>{
    const id = req.params.id
    console.log(req.body);
    try {
        const updateAstock = await Stock.findByIdAndUpdate(id,req.body)
        res.json(updateAstock)
    } catch (error) {
        console.log(error);
        res.json(error.errors)
    }
})
module.exports = {addStock,updateStock,getStock}