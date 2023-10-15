const express = require('express')
const {getAllMetalls,saveMetal,getAllStone,saveStone} = require("../controller/MiscController") 
const router = express.Router();

router.route("/getAllMetals").get(getAllMetalls);
router.route("/saveMetal").post(saveMetal);
router.route("/getAllStone").get(getAllStone);
router.route("/saveStone").post(saveStone);

module.exports = router