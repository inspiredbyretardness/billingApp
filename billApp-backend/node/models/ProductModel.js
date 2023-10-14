const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    ProductName:{ type: String, required: true },
    Metal:{type: mongoose.Types.ObjectId, ref: "Metal"}
})

const product = mongoose.model("Product",ProductSchema)
module.exports = product