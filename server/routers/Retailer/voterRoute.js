const express = require("express");
const { VoterData } = require("../../controllers/Retailer/voterController");
const router = express.Router();

router.post("/voterdata", VoterData);

module.exports = router;
