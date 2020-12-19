const express= require('express');

var controllers = require('../controllers/search.controller');

var authorize = require("../middleware/auth")


const router = express.Router();

router.get('/search', controllers.getSearch);

module.exports = router;