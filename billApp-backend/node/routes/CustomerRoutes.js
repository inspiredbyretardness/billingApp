const express = require('express')
const router = express.Router();
const {saveCustomer,getAllCustomers,findByName} = require('../controller/CustomerController')

router.route('/createUser').post(saveCustomer)
router.route("/getCustomers").get(getAllCustomers)
router.route("/getCustByName/:value").get(findByName)

module.exports = router;