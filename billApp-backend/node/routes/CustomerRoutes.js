const express = require('express')
const router = express.Router();
const {saveCustomer} = require('../controller/CustomerController')

router.route('/createUser').post(saveCustomer)

module.exports = router;