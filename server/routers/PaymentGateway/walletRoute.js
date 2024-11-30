const express = require("express");
const {
  getWalletBalance,
  updateWalletBalance,
  offlineRechargeAndUpdateWallet,
} = require("../../controllers/PaymentGateway/wallet");

const router = express.Router();

router.get("/getWalletBalance/:userId", getWalletBalance);
router.put("/updateWalletBalance", updateWalletBalance);
router.post("/offlineRechargeAndUpdateWallet", offlineRechargeAndUpdateWallet);

module.exports = router;
