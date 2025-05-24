const express = require("express");
const {
  PanByAadhaar,
  PanDetails,
  fetchRcDetails,
  fetchDLdetails,
  voterCardVerification,
  fetchVoterVerification,
  passportVerification,
  getOtp,
  verifyOtp,
  aadhaarSendOtp,
  aadhaarVerifyOtp,
  handleVehicleRCVerification,
  VehicleRCVerification,
  verifyDLController,
  gstVerificationController,
  fetchGSTVerification
} = require("../../controllers/Retailer/aadharController");
const router = express.Router();

router.post("/PanByAadhaar", PanByAadhaar);
router.post("/PanDetails", PanDetails);
router.post("/fetchRcDetails", fetchRcDetails);
router.post("/fetchDLdetails", fetchDLdetails);
router.get("/voterCardVerification", voterCardVerification);
router.post("/fetchVoterVerification", fetchVoterVerification);
router.post("/passportVerification", passportVerification);
router.get("/getOtp", getOtp);
router.get("/verifyOtp", verifyOtp);
router.post("/aadhaarSendOtp", aadhaarSendOtp);
router.post("/aadhaarVerifyOtp", aadhaarVerifyOtp);
router.get("/handleVehicleRCVerification", handleVehicleRCVerification);
router.post("/VehicleRCVerification", VehicleRCVerification);
router.get("/verifyDLController", verifyDLController);
router.get("/gstVerificationController", gstVerificationController);
router.post("/fetchGSTVerification", fetchGSTVerification);

module.exports = router;
