const express = require('express')
const router = express.Router();
const {getProducts,saveProduct} = require("../controller/ProductController");


router.route("/getProducts").get(getProducts)
router.route("/saveProduct").post(saveProduct)
module.exports = router;
