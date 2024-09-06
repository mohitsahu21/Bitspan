const express = require("express");
const {
  getBalanceEzytm,
  rechargeMobile,
  rechargeCallback,
} = require("../../controllers/Retailer/ezytm");

const router = express.Router();

router.get("/get-balance-ezytm", getBalanceEzytm);
router.post("/recharge", rechargeMobile);
router.get("/recharge-callback", rechargeCallback);
module.exports = router;
