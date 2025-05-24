const express = require("express");
const { cgonePayBalance ,cgonepayRecharge , cgonePayRechargeStatusCheck } = require("../../controllers/Retailer/cgonePayController");
const router = express.Router();


router.get("/cgonePayBalance", cgonePayBalance );
router.post("/cgonepayRecharge", cgonepayRecharge);
router.post("/cgonepayRechargeStatusCheck", cgonePayRechargeStatusCheck);


module.exports = router;