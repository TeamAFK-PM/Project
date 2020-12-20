const express= require('express');

var controllers = require('../controllers/user.controller');

var authorize = require("../middleware/auth")


const router = express.Router();

       
router.post('/login', controllers.login);
router.get('/login', controllers.getLogin);

router.get('/profile', controllers.getProfile);
router.post('/profile', controllers.updateProfile);

router.route('/register')
    .get(controllers.getRegister)
    .post(controllers.postRegister);

router.get('/logout', authorize.auth, controllers.logout)

router.get('/a', authorize.auth, controllers.index)


//router.get('/:id', authorize.auth, controllers.index)




module.exports = router;



