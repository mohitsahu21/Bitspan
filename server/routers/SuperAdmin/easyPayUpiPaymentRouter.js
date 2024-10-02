const express = require("express");
const { createOrder } = require("../../controllers/SuperAdmin/easyPayUpiPaymentController");
const router = express.Router();


router.get("/create-order" , createOrder )

module.exports = router;