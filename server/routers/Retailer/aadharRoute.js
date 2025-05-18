const express = require("express");
const {
  getPanByAadhaar,
  getPanDetails,
  PanByAadhaar,
  PanDetails,
  fetchRcPdf,
  fetchRcDetails,
  dlPrintController,
  fetchDLdetails,
  voterCardVerification,
  fetchVoterVerification,
  passportVerification,
  getOtp,
  verifyOtp,
  aadhaarSendOtp,
  aadhaarVerifyOtp,
} = require("../../controllers/Retailer/aadharController");
const router = express.Router();

router.post("/getPanByAadhaar", getPanByAadhaar);
router.post("/getPanDetails", getPanDetails);
router.post("/PanByAadhaar", PanByAadhaar);
router.post("/PanDetails", PanDetails);
router.post("/fetchRcPdf", fetchRcPdf);
router.post("/fetchRcDetails", fetchRcDetails);
router.post("/dlPrintController", dlPrintController);
router.post("/fetchDLdetails", fetchDLdetails);
router.get("/voterCardVerification", voterCardVerification);
router.post("/fetchVoterVerification", fetchVoterVerification);
router.post("/passportVerification", passportVerification);
router.get("/getOtp", getOtp);
router.get("/verifyOtp", verifyOtp);
router.post("/aadhaarSendOtp", aadhaarSendOtp);
router.post("/aadhaarVerifyOtp", aadhaarVerifyOtp);

module.exports = router;
