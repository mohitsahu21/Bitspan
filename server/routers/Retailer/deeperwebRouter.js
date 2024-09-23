const express = require("express");
const { deeperwebBalance, deeperwebRecharge, deeperwebRechargeStatusCheck } = require("../../controllers/Retailer/deeperwebController");


const router = express.Router();

router.get("/deeperwebBalance", deeperwebBalance);
router.post("/deeperwebRecharge", deeperwebRecharge);
router.post("/deeperwebRechargeStatusCheck", deeperwebRechargeStatusCheck);

module.exports = router;