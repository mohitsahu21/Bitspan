const express = require("express");
const { sizarpayBalance, sizarpayRecharge, sizarPayRechargeStatusCheck} = require("../../controllers/Retailer/sizarpay");


const router = express.Router();

router.get("/sizarpayBalance", sizarpayBalance);
router.post("/sizarpayRecharge", sizarpayRecharge);
router.post("/sizarPayRechargeStatusCheck", sizarPayRechargeStatusCheck);
// router.post("/sizarpayDthRecharge", sizarpayDthRecharge);
// router.post("/sizarpayBroadbandRecharge", sizarpayBroadbandRecharge);

module.exports = router;