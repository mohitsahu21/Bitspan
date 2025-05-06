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
  buyCoupon,
  getCoupon,
  getAddMoneyToWalletOnline,
  update_bankidForm,
  update_applyOfflineForm,
  EditSambalForm,
  UpdateeDistrictFormData,
  UpdateVerifyDistrictForm,
  UpdatePanFromData,
  getDTHConnectionData,
  getOfflineRecharge,
  getOfflineDTHConnection,
  getAllServicesList,
  getAllMonthCommission,
  getTodaysCommission,
  getUserNotification,
  getAllMonthRecharge,
  getAllMonthRechargeOffline,
  getTodaysRechargeOffline,
  getTodaysRecharge,
  getAllCommission,
  getCertificateDetails,
  getSuperAdminData,
  getWhiteLableData,
  digitalSignaturePlan,
  updateDigitalSignaturePlan,
  getdigitalSignaturePlan,
  getActiveDigitalSignaturePlans,
  addDSCForm,
  getDSCFormData,
  buyDSCcoupon,
} = require("../../controllers/Retailer/retailerController");
const authenticateToken = require("../../middleware/authenticateToken");

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
  authenticateToken,
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
  authenticateToken,
  upload.fields([
    { name: "attached_photo", maxCount: 1 },
    { name: "attached_kyc", maxCount: 10 },
    { name: "bank_passbook", maxCount: 1 },
    { name: "shop_photo", maxCount: 1 },
    { name: "electric_bill", maxCount: 1 },
  ]),
  bankidForm
);

router.get(
  "/getApplyOfflineFormByid/:id",
  authenticateToken,
  getApplyOfflineFormByid
);
router.get("/getApplyOfflineForm", authenticateToken, getApplyOfflineForm);
router.put(
  "/updateApplyOfflineForm/:id",
  authenticateToken,
  updateApplyOfflineForm
);
router.post("/offline-recharge", authenticateToken, offlineRecharge);
router.get("/getRechargeData", authenticateToken, getRechargeData);
router.get(
  "/getApiRechargeData/:userId",
  authenticateToken,
  getApiRechargeData
);
router.post("/offline-dth-connection", authenticateToken, offlineDthConnection);

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
  authenticateToken,
  upload.fields([
    { name: "documentUpload", maxCount: 10 },
    { name: "attachment_form", maxCount: 10 },
    { name: "attachment_photo", maxCount: 10 },
    { name: "attachment_signature", maxCount: 10 },
  ]),
  panFromData
);

router.get(
  "/nsdl-trans-new-requst",
  authenticateToken,
  nsdlTransactionNewRequest
);
router.get(
  "/nsdl-trans-correction",
  authenticateToken,
  nsdlTransactionCorrection
);
router.get("/pan-4.0/:user_id", authenticateToken, panFourZeroGetAPI);

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
  authenticateToken,
  complainDataUpload.fields([{ name: "complainFile", maxCount: 1 }]),
  complainInsertApi
);

router.get("/complain-data/:userid", authenticateToken, complainGetData);

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
  authenticateToken,
  upload.fields([
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "panCardFront", maxCount: 1 },
  ]),
  profileInfo
);

router.post(
  "/kyc-profile",
  authenticateToken,
  profileDataUpload.fields([
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "panCardFront", maxCount: 1 },
  ]),
  profileUserKyc
);

router.post(
  "/e-district-Form",
  authenticateToken,
  upload.array("documentUpload", 10),
  eDistrictFormData
);
router.put(
  "/UpdateeDistrictFormData",
  authenticateToken,
  upload.array("documentUpload", 10),
  UpdateeDistrictFormData
);

router.get(
  "/getSelectedServices/:user_id",
  authenticateToken,
  getSelectedServices
);
router.get("/getAllBranchId/:id", authenticateToken, getAllBranchId);
router.get("/getEdistrictData/:user_id", authenticateToken, getEdistrictData);
router.get("/getAllRechargeApi", authenticateToken, getAllRechargeApi);
router.get("/getAllDTHeApi", authenticateToken, getAllDTHeApi);
router.get(
  "/getApiPostRechargeData/:userId",
  authenticateToken,
  getApiPostRechargeData
);
router.get(
  "/getApiDTHRechargeData/:userId",
  authenticateToken,
  getApiDTHRechargeData
);
router.get(
  "/getApiEletricityRechargeData/:userId",
  authenticateToken,
  getApiEletricityRechargeData
);
router.get(
  "/getApiBroadbrandRechargeData/:userId",
  authenticateToken,
  getApiBroadbrandRechargeData
);
router.post("/addSambalForm", authenticateToken, addSambalForm);
router.put("/EditSambalForm", authenticateToken, EditSambalForm);
router.post("/verify-Edistrict", authenticateToken, addVerifyDistrictForm);
router.put(
  "/UpdateVerifyDistrictForm",
  authenticateToken,
  UpdateVerifyDistrictForm
);
router.get(
  "/getVerifyEdistrict/:userId",
  authenticateToken,
  getVerifyEdistrict
);
router.get("/getSambalHistory/:userId", authenticateToken, getSambalHistory);

router.post(
  "/panDocument",
  authenticateToken,
  upload.fields([{ name: "podfile", maxCount: 1 }]),
  PanDocumentUpload
);
router.get("/getPanDocument/:userId", authenticateToken, getPanDocument);
router.post(
  "/add-money-wallet",
  authenticateToken,
  upload.fields([{ name: "Receiept_Attechment", maxCount: 1 }]),
  walletOffline
);
router.get("/getWalletOffline/:userId", authenticateToken, getWalletOffline);
router.get(
  "/getAddMoneyToWalletOnline/:userId",
  authenticateToken,
  getAddMoneyToWalletOnline
);
router.get("/getPackageData/:packageId", authenticateToken, getPackageData);
router.get("/getDthConnectionPlan", authenticateToken, getDthConnectionPlan);
router.get("/getWalletSummary/:userId", getWalletSummary);
router.post("/buyCoupon", authenticateToken, buyCoupon);
router.get("/getCoupon/:userId", authenticateToken, getCoupon);
router.put(
  "/update_bankidForm",
  authenticateToken,
  upload.fields([
    { name: "attached_photo", maxCount: 1 },
    { name: "attached_kyc", maxCount: 10 },
    { name: "bank_passbook", maxCount: 1 },
    { name: "shop_photo", maxCount: 1 },
    { name: "electric_bill", maxCount: 1 },
  ]),
  update_bankidForm
);

router.put(
  "/update_applyOfflineForm",
  authenticateToken,
  upload.fields([
    { name: "attached_form", maxCount: 1 },
    { name: "attached_photo", maxCount: 1 },
    { name: "attached_sign", maxCount: 1 },
    { name: "attached_kyc", maxCount: 10 },
  ]),
  update_applyOfflineForm
);

router.put(
  "/UpdatePanFromData",
  authenticateToken,
  upload.fields([
    { name: "documentUpload", maxCount: 10 },
    { name: "attachment_form", maxCount: 10 },
    { name: "attachment_photo", maxCount: 10 },
    { name: "attachment_signature", maxCount: 10 },
  ]),
  UpdatePanFromData
);
router.get(
  "/getDTHConnectionData/:userId",
  authenticateToken,
  getDTHConnectionData
);
router.get(
  "/getOfflineRecharge/:userId/:rechargeType",
  authenticateToken,
  getOfflineRecharge
);
router.get(
  "/getOfflineDTHConnection/:userId",
  authenticateToken,
  getOfflineDTHConnection
);
router.get("/getAllServicesList", authenticateToken, getAllServicesList);
router.get(
  "/getAllMonthCommission/:userId",
  authenticateToken,
  getAllMonthCommission
);
router.get(
  "/getTodaysCommission/:userId",
  authenticateToken,
  getTodaysCommission
);
router.get(
  "/getUserNotification/:userId",
  authenticateToken,
  getUserNotification
);
router.get(
  "/getAllMonthRecharge/:userId",
  authenticateToken,
  getAllMonthRecharge
);
router.get(
  "/getAllMonthRechargeOffline/:userId",
  authenticateToken,
  getAllMonthRechargeOffline
);

router.get(
  "/getTodaysRechargeOffline/:userId",
  authenticateToken,
  getTodaysRechargeOffline
);
router.get("/getTodaysRecharge/:userId", authenticateToken, getTodaysRecharge);
router.get("/getAllCommission/:userId", authenticateToken, getAllCommission);
router.get("/certificateDetails/:userId", getCertificateDetails);
router.get("/getSuperAdminData", getSuperAdminData);
router.get("/getWhiteLableData/:whiteLabelId", getWhiteLableData);
router.post("/digitalSignaturePlan", digitalSignaturePlan);
router.put("/updateDigitalSignaturePlan/:id", updateDigitalSignaturePlan);
router.get("/getdigitalSignaturePlan", getdigitalSignaturePlan);
router.get("/getActiveDigitalSignaturePlans", getActiveDigitalSignaturePlans);
router.post("/addDSCForm", addDSCForm);
router.get("/getDSCFormData/:userId", getDSCFormData);
router.post("/buyDSCcoupon", buyDSCcoupon);

module.exports = router;
