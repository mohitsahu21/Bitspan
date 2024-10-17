const express = require("express");
const { zlinkBalance, zlinkNewPanRequest, zlinkCorrectionPanRequest, zlinkIncompletePan } = require("../../controllers/Retailer/panZlinkController");
const router = express.Router();


router.get("/zlinkBalance", zlinkBalance );
router.post("/zlinkNSDLNewPanRequest", zlinkNewPanRequest);
router.post("/zlinkIncompletePan", zlinkIncompletePan);
// router.post("/easySmartNSDLNewPanRequest", easySmartNewPanRequest);
// router.post("/easySmartNewPanTransactionStatus", easySmartNewPanTransactionStatus);
// router.post("/easySmartNewPanAckStatus", easySmartNewPanAckStatus);
router.post("/zlinkCorrectionPanRequest", zlinkCorrectionPanRequest);



module.exports = router;