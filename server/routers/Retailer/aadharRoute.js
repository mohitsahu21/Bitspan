const express = require("express");
const {
  getPanByAadhaar,
  getPanDetails,
  PanByAadhaar,
  PanDetails,
  fetchRcPdf,
  fetchRcDetails,
  dlPrintController,
  fetchDLdetails,
} = require("../../controllers/Retailer/aadharController");
const router = express.Router();

router.post("/getPanByAadhaar", getPanByAadhaar);
router.post("/getPanDetails", getPanDetails);
router.post("/PanByAadhaar", PanByAadhaar);
router.post("/PanDetails", PanDetails);
router.post("/fetchRcPdf", fetchRcPdf);
router.post("/fetchRcDetails", fetchRcDetails);
router.post("/dlPrintController", dlPrintController);
router.post("/fetchDLdetails", fetchDLdetails);

module.exports = router;
