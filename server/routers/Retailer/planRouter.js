const express = require("express");
const {
  getOperatorAndCircle,
  getMobilePlans,
  getBillInfo,
} = require("../../controllers/Retailer/planController");

const router = express.Router();

// Route to check operator and circle
router.get("/operator-circle-check", getOperatorAndCircle);
router.get("/getMobilePlans", getMobilePlans);
router.get("/getBillInfo", getBillInfo);

module.exports = router;
