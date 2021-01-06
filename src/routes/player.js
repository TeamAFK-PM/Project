const express= require('express');

var controllers = require('../controllers/players.controller');

var authorize = require("../middleware/auth")


const router = express.Router();

router.get('/player', controllers.getPlayers);
router.get('/playerinfor', controllers.getInforPlayer);

module.exports = router;