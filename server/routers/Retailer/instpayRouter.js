const express = require("express");
const {
  getBalance,
  panVerification,
  gstVerification,
  adharVerification,
  adharotpVerification,
  bankverification,
  getDthPlan,
  applyDth,
  billfetch,
  rechargeApi,
} = require("../../controllers/Retailer/instpay");

const router = express.Router();

router.get("/get-balance", getBalance);
router.get("/pan-verify", panVerification);
router.get("/gst-verify", gstVerification);
router.get("/adhar-verify", adharVerification);
router.get("/adhar-otp-verify", adharotpVerification);
router.get("/bank-verify", bankverification);
router.get("/dth-plan", getDthPlan);
router.post("/dth-recharge", applyDth);
router.post("/bill-fetch", billfetch);
router.post("/recharge-instpy", rechargeApi);

module.exports = router;
