const express = require("express");
const {
  getAadharData,
} = require("../../controllers/Retailer/aadharController");
const router = express.Router();

router.post("/aadhar", getAadharData);

module.exports = router;
