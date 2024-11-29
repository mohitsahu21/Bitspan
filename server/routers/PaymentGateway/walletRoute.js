const express = require("express");
const {
  getWalletBalance,
  updateWalletBalance,
} = require("../../controllers/PaymentGateway/wallet");

const router = express.Router();

router.get("/getWalletBalance/:userId", getWalletBalance);
router.put("/updateWalletBalance", updateWalletBalance);

module.exports = router;
