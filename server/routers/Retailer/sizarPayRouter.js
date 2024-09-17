const express = require("express");
const { sizarpayBalance } = require("../../controllers/Retailer/sizarpay");


const router = express.Router();

router.get("/sizarpayBalance", sizarpayBalance);

module.exports = router;