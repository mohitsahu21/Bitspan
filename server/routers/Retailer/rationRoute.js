const express = require("express");
const {
  rationVerification,
} = require("../../controllers/Retailer/rationController");
const router = express.Router();

router.post("/rationVerification", rationVerification);

module.exports = router;
