const express = require('express');
const { getManage } = require('../controllers/admin.controller');


var authorize = require("../middleware/auth")
var adminController = require("../controllers/admin.controller")
const router = express.Router();


router.get("/manage", adminController.getManage);

router.get("/accept/:id", adminController.postAccept);
router.get("/refuse/:id", adminController.postConfuse);
router.get("/match", adminController.getMatch);

router.get("/tournament", adminController.getTournament);
router.post("/tournament", adminController.postTour);
router.post("/arrange/:id", adminController.arrangeTour);

router.get("/alternative", adminController.getAlternative);
router.get("/edittournament", adminController.getEditTournament);

router.post("/resetPassword",)

module.exports = router;