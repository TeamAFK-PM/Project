const express= require('express');

var controllers = require('../controllers/user.controller');

var authorize = require("../middleware/auth")


const router = express.Router();

router.post('/register', controllers.regis);