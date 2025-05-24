const express = require("express");
const { getBalanceEzytm, rechargeMobile, rechargeCallback, getRechargeStatus,billPayment, billFetch} = require("../../controllers/Retailer/ezytm");

const router = express.Router();

router.get("/get-balance-ezytm", getBalanceEzytm);
router.post("/recharge", rechargeMobile);
router.post("/recharge-status", getRechargeStatus);
router.get("/recharge-callback", rechargeCallback);
router.post("/bill-pay-ezytm", billPayment);
router.post("/bill-fetch-ezytm", billFetch);
module.exports = router;
