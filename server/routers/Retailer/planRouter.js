const express = require("express");
const {
  getOperatorAndCircle,
  getMobilePlans,
  getBillInfo,
  getDTHPlans,
  getDTHPlansINFOCheck,
} = require("../../controllers/Retailer/planController");

const router = express.Router();

// Route to check operator and circle
router.get("/operator-circle-check", getOperatorAndCircle);
router.get("/getMobilePlans", getMobilePlans);
router.get("/getBillInfo", getBillInfo);
router.get("/getDTHPlans", getDTHPlans);
router.get("/getDTHPlansINFOCheck", getDTHPlansINFOCheck);

module.exports = router;
