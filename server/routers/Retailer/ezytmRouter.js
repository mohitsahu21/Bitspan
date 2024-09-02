const express = require("express");
const { getBalanceEzytm } = require("../../controllers/Retailer/ezytm");

const router = express.Router();

router.get("/get-balance-ezytm", getBalanceEzytm);
module.exports = router;
