const express = require("express");
const {
  getWalletBalance,
  updateWalletBalance,
  offlineRechargeAndUpdateWallet,
  dthConnectionAndUpdateWallet,
} = require("../../controllers/PaymentGateway/wallet");

const router = express.Router();

router.get("/getWalletBalance/:userId", getWalletBalance);
router.put("/updateWalletBalance", updateWalletBalance);
router.post("/offlineRechargeAndUpdateWallet", offlineRechargeAndUpdateWallet);
router.post("/dthConnectionAndUpdateWallet", dthConnectionAndUpdateWallet);

module.exports = router;
