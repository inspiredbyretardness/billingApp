const asyncHandler = require("express-async-handler");

const Product = require("../models/ProductModel")

const getProducts = asyncHandler(async(req,res)=>{
    try {
        const getAllProducts = await Product.find({}).populate('metal').populate('stones')
        res.json(getAllProducts)
    } catch (error) {
        console.log(error.errors);
        res.json(error.errors)
    }
})

const saveProduct = asyncHandler(async(req,res)=>{
    const {productId,productName,productDescription,metal,grossWeight,netWeight,caretGold,caretStone,makingCharges,wastage,isStone,stones,stoneWeight,stock,notes} = req.body;
    try {
        const saveAProduct = await Product.create({productId,productName,productDescription,metal,grossWeight,netWeight,caretGold,caretStone,makingCharges,wastage,isStone,stones,stoneWeight,stock,notes})
        res.json(saveAProduct)
    } catch (error) {
        console.log(error.errors);
        res.json(error.errors)
    }
})
const getAProduct = asyncHandler(async(req,res)=>{
    try {
        const getOneProduct = await Product.findById(req.params.id) 
        res.json(getOneProduct)       
    } catch (error) {
        console.log(error.errors || error);
        res.json(error.errors || error)
    }

})
const updateStock = asyncHandler(async(req,res)=>{
    try {
        const updateAStock = await Product.findById()
    } catch (error) {
        
    }
})
module.exports = {getProducts,saveProduct,getAProduct}