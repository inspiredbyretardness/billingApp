const asyncHandler = require("express-async-handler");

const Product = require("../models/ProductModel")

const getProducts = asyncHandler(async(req,res)=>{
    try {
        const getAllProducts = await Product.find({}).populate('metal').populate('stones')
        res.json(getAllProducts)
    } catch (error) {
        res.json(error)
    }
})

const saveProduct = asyncHandler(async(req,res)=>{
    const {productId,productName,metal,grossWeight,makingCharges,wastage,isStone,stones,stoneWeight,} = req.body;
    try {
        const saveAProduct = await Product.create({productId,productName,metal,grossWeight,makingCharges,wastage,isStone,stones,stoneWeight})
        res.json(saveAProduct)
    } catch (error) {
        res.sendStatus(400).json(error)
    }
})

module.exports = {getProducts,saveProduct}