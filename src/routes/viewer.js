const { Router } = require('express');
const express= require('express');

var controllers = require('../controllers/viewer.controller');

var authorize = require("../middleware/auth")


const router = express.Router();



router.get('/tournament', controllers.getviewTour);

module.exports = router;