const express = require('express');
const { getManage } = require('../controllers/admin.controller');


var authorize = require("../middleware/auth")
var adminController = require("../controllers/admin.controller")
const router = express.Router();


router.get("/manage", adminController.getManage);

router.get("/accept/:id", adminController.postAccept);
router.get("/refuse/:id", adminController.postConfuse);

module.exports = router;