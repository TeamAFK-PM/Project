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


router.get("/forgot", controllers.getforgot);
router.post("/forgot", controllers.postForgot);


router.get("/checkforgot/:token", controllers.getCheckForgot);
router.post("/checkforgot/:token", controllers.forgot);

router.get("/resetPassword/:token", controllers.getReset);
router.post("/resetPassword/:token", controllers.postResetPassword);


//router.get('/:id', authorize.auth, controllers.index)


module.exports = router;



