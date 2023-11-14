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

module.exports = {saveCustomer}