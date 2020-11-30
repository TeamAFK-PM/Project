const express= require('express');

var controllers = require('../controllers/user.controller');

var authorize = require("../middleware/auth")


const router = express.Router();


       
router.post('/profile', controllers.login);
router.get('/logout', authorize.auth, controllers.logout)

router.get('/a', authorize.auth, controllers.index)

router.get('/login', controllers.getLogin);
//router.get('/:id', authorize.auth, controllers.index)




module.exports = router;



