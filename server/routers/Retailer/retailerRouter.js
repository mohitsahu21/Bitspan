const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  applyOfflineForm,
  getApplyOfflineFormByid,
  getApplyOfflineForm,
  updateApplyOfflineForm,
  bankidForm,
  offlineRecharge,
  getRechargeData,
  getApiRechargeData,
  offlineDthConnection,
  panFromData,
  nsdlTransactionNewRequest,
  nsdlTransactionCorrection,
  panFourZeroGetAPI,
  complainInsertApi,
  complainGetData,
} = require("../../controllers/Retailer/retailerController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/applyOfflineForm",
  upload.fields([
    { name: "attached_form", maxCount: 1 },
    { name: "attached_photo", maxCount: 1 },
    { name: "attached_sign", maxCount: 1 },
    { name: "attached_kyc", maxCount: 10 },
  ]),
  applyOfflineForm
);
router.post(
  "/bankidForm",
  upload.fields([
    { name: "attached_photo", maxCount: 1 },
    { name: "attached_kyc", maxCount: 10 },
    { name: "bank_passbook", maxCount: 1 },
    { name: "shop_photo", maxCount: 1 },
    { name: "electric_bill", maxCount: 1 },
  ]),
  bankidForm
);
router.get("/getApplyOfflineFormByid/:id", getApplyOfflineFormByid);
router.get("/getApplyOfflineForm", getApplyOfflineForm);
router.put("/updateApplyOfflineForm/:id", updateApplyOfflineForm);
router.post("/offline-recharge", offlineRecharge);
router.get("/getRechargeData", getRechargeData);
router.get("/getApiRechargeData", getApiRechargeData);
router.post("/offline-dth-connection", offlineDthConnection);

const panDataStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "panUploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const panDataUpload = multer({ storage: panDataStorage });
router.post(
  "/pan-4.0",
  panDataUpload.fields([
    { name: "documentUpload", maxCount: 10 },
    { name: "attachment_form", maxCount: 10 },
    { name: "attachment_photo", maxCount: 10 },
    { name: "attachment_signature", maxCount: 10 },
  ]),
  panFromData
);

router.get("/nsdl-trans-new-requst", nsdlTransactionNewRequest);
router.get("/nsdl-trans-correction", nsdlTransactionCorrection);
router.get("/pan-4.0", panFourZeroGetAPI);

const complainDataStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "complainUpload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const complainDataUpload = multer({ storage: complainDataStorage });
router.post(
  "/complain-query",
  complainDataUpload.fields([{ name: "complainFile", maxCount: 1 }]),
  complainInsertApi
);

router.get("/complain-data", complainGetData);

module.exports = router;
