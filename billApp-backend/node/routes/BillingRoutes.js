const express = require('express')
const router = express.Router();
const {saveBill,getBill,getAllOrders,getSum,getRecentOrder,getTodaysOrders,getBillsPagination} = require("../controller/BillingController")

router.route("/saveBill").post(saveBill)
router.route("/getBill/:id").get(getBill)
router.route("/getAllOrders").get(getAllOrders)
router.route("/getSum").get(getSum)
router.route("/getLastOrder").get(getRecentOrder)
router.route("/getTodaysOrders").get(getTodaysOrders)
router.route("/getBillSet").get(getBillsPagination)

module.exports = router;