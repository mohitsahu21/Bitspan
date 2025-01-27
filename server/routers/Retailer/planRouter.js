const express = require("express");
const {
  getOperatorAndCircle,
  getMobilePlans,
  getBillInfo,
  getDTHPlans,
  getDTHPlansINFOCheck,
  getElectricityPlans,
  getBillCheckPlans,
} = require("../../controllers/Retailer/planController");

const router = express.Router();

// Route to check operator and circle
router.get("/operator-circle-check", getOperatorAndCircle);
router.get("/getMobilePlans", getMobilePlans);
router.get("/getBillInfo", getBillInfo);
router.get("/getDTHPlans", getDTHPlans);
router.get("/getDTHPlansINFOCheck", getDTHPlansINFOCheck);
router.get("/getElectricityPlans", getElectricityPlans);
router.get("/getBillCheckPlans", getBillCheckPlans);

module.exports = router;
