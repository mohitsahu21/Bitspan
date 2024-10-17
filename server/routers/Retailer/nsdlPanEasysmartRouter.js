const express = require("express");
const { easySmartBalance, easySmartNewPanRequest, easySmartNewPanTransactionStatus, easySmartNewPanAckStatus, easySmartCorrectionPanRequest } = require("../../controllers/Retailer/nsdlPanEasysmartController");
const router = express.Router();


router.get("/easysmartBalance", easySmartBalance );
router.post("/easySmartNSDLNewPanRequest", easySmartNewPanRequest);
router.post("/easySmartNewPanTransactionStatus", easySmartNewPanTransactionStatus);
router.post("/easySmartNewPanAckStatus", easySmartNewPanAckStatus);
router.post("/easySmartCorrectionPanRequest", easySmartCorrectionPanRequest);



module.exports = router;