const express = require('express');
const { getManage } = require('../controllers/admin.controller');


var authorize = require("../middleware/auth")
var adminController = require("../controllers/admin.controller")
const router = express.Router();


router.get("/manage",authorize.auth, adminController.getManage);

router.get("/accept/:id", authorize.auth, adminController.postAccept);
router.get("/refuse/:id", authorize.auth, adminController.postConfuse);
router.get("/match", authorize.auth, adminController.getMatch);

router.get("/tournament", authorize.auth, adminController.getTournament);
router.post("/tournament", authorize.auth, adminController.postTour);
router.post("/arrange/:id", authorize.auth, adminController.arrangeTour);

router.get("/alternative", adminController.getAlternative);
router.get("/edittournament",adminController.getEditTournament);
router.post("/edittournament",  adminController.postEditTournament);

router.post("/resetPassword", authorize.auth, adminController.postReset)

module.exports = router;