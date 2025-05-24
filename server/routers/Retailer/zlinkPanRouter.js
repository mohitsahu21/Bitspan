const express = require("express");
const { zlinkBalance , zlinkNewPanRequest , zlinkCorrectionPanRequest, zlinkIncompletePan, zlinkPantxnStatus, zlinkPanStatus , zlinkUtiAgentOnbording, ZlinkUtiLogin} = require("../../controllers/Retailer/panZlinkController");
const router = express.Router();


router.get("/zlinkBalance", zlinkBalance );
router.post("/zlinkNSDLNewPanRequest", zlinkNewPanRequest);
router.post("/zlinkCorrectionPanRequest", zlinkCorrectionPanRequest);
router.post("/zlinkIncompletePan", zlinkIncompletePan);
router.post("/zlinkPantxnStatus", zlinkPantxnStatus);
router.post("/zlinkPanStatus", zlinkPanStatus);

// uti routes

router.post("/zlinkUtiAgentOnbording", zlinkUtiAgentOnbording);
router.post("/ZlinkUtiLogin", ZlinkUtiLogin);



module.exports = router;