const express = require("express");
const { getWalletBalance } = require("../../controllers/PaymentGateway/wallet");

const router = express.Router();

router.get("/getWalletBalance/:userId", getWalletBalance);

module.exports = router;
