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
  profileInfo,
  profileUserKyc,
  eDistrictFormData,
  getSelectedServices,
  getAllBranchId,
  getEdistrictData,
  getAllRechargeApi,
  getAllDTHeApi,
  getApiPostRechargeData,
  getApiDTHRechargeData,
  getApiEletricityRechargeData,
  getApiBroadbrandRechargeData,
  addSambalForm,
  addVerifyDistrictForm,
  getVerifyEdistrict,
  getSambalHistory,
  PanDocumentUpload,
  getPanDocument,
  walletOffline,
  getWalletOffline,
  getPackageData,
  getDthConnectionPlan,
  getWalletSummary,
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
router.get("/getApiRechargeData/:userId", getApiRechargeData);
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
  "/pan-4.0-form",
  upload.fields([
    { name: "documentUpload", maxCount: 10 },
    { name: "attachment_form", maxCount: 10 },
    { name: "attachment_photo", maxCount: 10 },
    { name: "attachment_signature", maxCount: 10 },
  ]),
  panFromData
);

router.get("/nsdl-trans-new-requst", nsdlTransactionNewRequest);
router.get("/nsdl-trans-correction", nsdlTransactionCorrection);
router.get("/pan-4.0/:user_id", panFourZeroGetAPI);

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

router.get("/complain-data/:userid", complainGetData);

const profileDataStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profile-data/"); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Save file with timestamp
  },
});

const profileDataUpload = multer({ storage: profileDataStorage });

router.put(
  "/user-profile/:UserId",
  upload.fields([
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "panCardFront", maxCount: 1 },
  ]),
  profileInfo
);

router.post(
  "/kyc-profile",
  profileDataUpload.fields([
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "panCardFront", maxCount: 1 },
  ]),
  profileUserKyc
);

router.post(
  "/e-district-Form",
  upload.array("documentUpload", 10),
  eDistrictFormData
);

router.get("/getSelectedServices/:user_id", getSelectedServices);
router.get("/getAllBranchId/:id", getAllBranchId);
router.get("/getEdistrictData/:user_id", getEdistrictData);
router.get("/getAllRechargeApi", getAllRechargeApi);
router.get("/getAllDTHeApi", getAllDTHeApi);
router.get("/getApiPostRechargeData/:userId", getApiPostRechargeData);
router.get("/getApiDTHRechargeData/:userId", getApiDTHRechargeData);
router.get(
  "/getApiEletricityRechargeData/:userId",
  getApiEletricityRechargeData
);
router.get(
  "/getApiBroadbrandRechargeData/:userId",
  getApiBroadbrandRechargeData
);
router.post("/addSambalForm", addSambalForm);
router.post("/verify-Edistrict", addVerifyDistrictForm);
router.get("/getVerifyEdistrict/:userId", getVerifyEdistrict);
router.get("/getSambalHistory/:userId", getSambalHistory);

router.post(
  "/panDocument",
  upload.fields([{ name: "podfile", maxCount: 1 }]),
  PanDocumentUpload
);
router.get("/getPanDocument/:userId", getPanDocument);
router.post(
  "/add-money-wallet",
  upload.fields([{ name: "Receiept_Attechment", maxCount: 1 }]),
  walletOffline
);
router.get("/getWalletOffline/:userId", getWalletOffline);
router.get("/getPackageData/:packageId", getPackageData);
router.get("/getDthConnectionPlan", getDthConnectionPlan);
router.get("/getWalletSummary/:userId", getWalletSummary);

module.exports = router;
