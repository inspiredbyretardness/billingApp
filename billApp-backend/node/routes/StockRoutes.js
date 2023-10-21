const express = require('express')
const router = express.Router();
const {addStock,updateStock,getStock} = require('../controller/StockController')

router.route("/addStock").post(addStock)
router.route("/updateStock/:id").put(updateStock)
router.route("/getStock").get(getStock)
module.exports = router;
