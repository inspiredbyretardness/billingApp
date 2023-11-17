const asyncHandler = require("express-async-handler");
const Customer = require('../models/Customer')

const saveCustomer = asyncHandler(async(req,res)=>{
    try {
        const {name,phone,email,pan,address} = req.body
        var saveACustomer = await Customer.create({name,phone,email,pan,address})
        res.json(saveACustomer)       
    } catch (error) {
        console.log(error);
        res.json(error.errors)
    }

})
const getAllCustomers = asyncHandler(async(req,res)=>{
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10
    const pageNumber = req.query.page ? parseInt(req.query.page) : 1
    try {
        var getAllCust = await Customer.find({}).sort({_id:-1}).skip((pageNumber - 1) * pagination).limit(pagination)
        res.status(200).send(getAllCust)
    } catch (error) {
        res.status(400).send(error)
    }
})
const findByName = asyncHandler(async(req,res)=>{
    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10
    const pageNumber = req.query.page ? parseInt(req.query.page) : 1

    try {
        const getCust = await Customer.find({ $or: [
            { name:  { $regex: req.params.value, $options: "i" }},
            { phone: { $regex: req.params.value, $options: "i" }},
            { email: { $regex: req.params.value, $options: "i" }},
            { address: { $regex: req.params.value, $options: "i" }},
            ],}).sort({_id:-1}).skip((pageNumber - 1) * pagination).limit(pagination)
        res.status(200).send(getCust)
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = {saveCustomer,getAllCustomers,findByName}