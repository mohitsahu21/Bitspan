const express = require("express");
const { easySmartBalance , easySmartNewPanRequest , easySmartNewPanTransactionStatus , easySmartNewPanAckStatus , easySmartCorrectionPanRequest , easySmartUtiAgentOnbording, easySmartUtiLogin} = require("../../controllers/Retailer/nsdlPanEasysmartController");
const router = express.Router();


router.get("/easysmartBalance", easySmartBalance );
router.post("/easySmartNSDLNewPanRequest", easySmartNewPanRequest);
router.post("/easySmartNewPanTransactionStatus", easySmartNewPanTransactionStatus);
router.post("/easySmartNewPanAckStatus", easySmartNewPanAckStatus);
router.post("/easySmartCorrectionPanRequest", easySmartCorrectionPanRequest);


// uti routes
router.post("/easySmartUtiAgentOnbording", easySmartUtiAgentOnbording);
router.post("/easySmartUtiLogin", easySmartUtiLogin);
// router.post("/cgonepayRecharge", cgonepayRecharge);



module.exports = router;