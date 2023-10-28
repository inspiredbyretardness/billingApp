const express = require('express')
const router = express.Router();
const {getProducts,saveProduct,getAProduct} = require("../controller/ProductController");


router.route("/getProducts").get(getProducts)
router.route("/getAProduct/:id").get(getAProduct)
router.route("/saveProduct").post(saveProduct)
module.exports = router;
