const express = require("express");
const { easySmartBalance, easySmartNewPanRequest, easySmartNewPanTransactionStatus, easySmartNewPanAckStatus } = require("../../controllers/Retailer/nsdlPanEasysmartController");
const router = express.Router();


router.get("/easysmartBalance", easySmartBalance );
router.post("/easySmartNSDLNewPanRequest", easySmartNewPanRequest);
router.post("/easySmartNewPanTransactionStatus", easySmartNewPanTransactionStatus);
router.post("/easySmartNewPanAckStatus", easySmartNewPanAckStatus);



module.exports = router;