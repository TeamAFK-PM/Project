const express= require('express');

var controllers = require('../controllers/matches.controller');

var authorize = require("../middleware/auth")


const router = express.Router();

router.get('/match', controllers.getMatches);
router.get('/match', controllers.getMatches);
module.exports = router;