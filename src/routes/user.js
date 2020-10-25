const express= require('express');

var controllers = require('../controllers/user.controller');

var authorize = require("../middleware/auth")


const router = express.Router();


       
router.post('/profile', controllers.login);

router.get('/a', authorize.auth, controllers.index)

//router.get('/:id', authorize.auth, controllers.index)




module.exports = router;



