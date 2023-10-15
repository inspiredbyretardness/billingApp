const express = require('express')
const router = express.Router();
const {saveBill,getBill} = require("../controller/BillingController")

router.route("/saveBill").post(saveBill)
router.route("/getBill/:id").get(getBill)

module.exports = router;