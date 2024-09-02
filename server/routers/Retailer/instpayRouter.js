const express = require("express");
const {
  getBalance,
  panVerification,
  gstVerification,
  adharVerification,
  adharotpVerification,
} = require("../../controllers/Retailer/instpay");

const router = express.Router();

router.get("/get-balance", getBalance);
router.get("/pan-verify", panVerification);
router.get("/gst-verify", gstVerification);
router.get("/adhar-verify", adharVerification);
router.get("/adhar-otp-verify", adharotpVerification);

module.exports = router;
