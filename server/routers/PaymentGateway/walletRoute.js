const express = require("express");
const {
  getWalletBalance,
  updateWalletBalance,
  offlineRechargeAndUpdateWallet,
  dthConnectionAndUpdateWallet,
} = require("../../controllers/PaymentGateway/wallet");
const authenticateToken = require("../../middleware/authenticateToken");

const router = express.Router();

router.get("/getWalletBalance/:userId", getWalletBalance);
router.put("/updateWalletBalance", updateWalletBalance);
router.post(
  "/offlineRechargeAndUpdateWallet",
  authenticateToken,
  offlineRechargeAndUpdateWallet
);
router.post(
  "/dthConnectionAndUpdateWallet",
  authenticateToken,
  dthConnectionAndUpdateWallet
);

module.exports = router;
