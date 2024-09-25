const express = require("express");
const { easySmartBalance, easySmartNewPanRequest } = require("../../controllers/Retailer/nsdlPanEasysmartController");
const router = express.Router();


router.get("/easysmartBalance", easySmartBalance );
router.post("/easySmartNSDLNewPanRequest", easySmartNewPanRequest);



module.exports = router;