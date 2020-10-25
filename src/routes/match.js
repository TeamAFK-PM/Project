const express = require('express');

const controllers = require('../controllers/sort.controller');
var authorize = require("../middleware/auth")

const router = express.Router();


router.get('/match', controllers.Sort)



module.exports = router;