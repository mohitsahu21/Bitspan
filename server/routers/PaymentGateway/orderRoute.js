const express = require("express");
const {
  createOrder,
  checkOrderStatus,
  webhook,
} = require("../../controllers/PaymentGateway/orderApi");
const router = express.Router();

router.post("/create-order", createOrder);
router.post("/check-status", checkOrderStatus);
router.post("/webhook", webhook);

module.exports = router;
