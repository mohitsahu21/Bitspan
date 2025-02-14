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
  getSpecificUserTransactions,
  getEDistrictHistory,
  getVerifyEDistrictHistory,
  getOfflinePan,
  getOnlinePan,
  raiseComplaint,
  getOfflineDTHConnection,
  getOnlineDTHConnection,
  getSdOnlineRecharges,
  getActiveUsers,
  getSuperDistributorUsersData,
  getDeactiveUsers,
  getPendingKycUsers,
  getAllComplaintsData,
  addBankDetails,
  getBankDetails,
  getActiveBankDetails,
  getBankAccountDetails,
  changePassword,
  getNsdlPanCorrectionHistory,
  deleteBankDetails,
  sendOtpForVerification,
  verifyOtpAndChangeBankStatus,
  changeBankStatus,
  getPendingPaymentUsers,
  getWalletBalance,
  // submitWithdrawalRequest,
  SdWithdrawOrApproveWalletRequest,
  walletToWalletTransfer,
  getWalletToWalletTransfer,
  WalletWithdraw,
  getWalletWithdrawHistory,
  getAllCommission,
  buyId,
  getRemainingIds,
  getBoughtUserId,
  updateUserProfile,
  getAllPartner,
  getProfileImage,
  getAllMonthCommission,
  getTodaysCommission,
  getApplyOfflineFormById,
  getUserDetails,
  getCoupanHistory,
  getUserNotification,
  SAContactUs,
  SAGetContactUs,
} = require("../../controllers/SuperDistributor/superDistributorController");

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
// used API to all super distributor

router.post("/SAContactUs", SAContactUs);
router.get("/SAGetContactUs", SAGetContactUs);

router.get(
  "/getSuperDistributorUsersData/:userId",
  authenticateToken,
  getSuperDistributorUsersData
);
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

router.get("/getWalletSummary/:userId", authenticateToken, getWalletSummary);
router.get(
  "/getUserNotification/:userId",
  authenticateToken,
  getUserNotification
);

router.get(
  "/getWalletToWalletTransfer/:userId",
  authenticateToken,
  getWalletToWalletTransfer
);
router.get("/getActiveUsers/:userId", authenticateToken, getActiveUsers);
router.get("/getWalletBalance/:userId", authenticateToken, getWalletBalance);
router.get("/getUserDetails/:userId", authenticateToken, getUserDetails);

router.post(
  "/walletToWalletTransfer",
  authenticateToken,
  walletToWalletTransfer
);
router.get(
  "/getActiveBankDetails/:userId",
  authenticateToken,
  getActiveBankDetails
);
router.post("/WalletWithdraw/:userId", authenticateToken, WalletWithdraw);

router.get(
  "/getWalletWithdrawHistory/:userId",
  authenticateToken,
  getWalletWithdrawHistory
);
router.get(
  "/getApplyOfflineFormById/:userId",
  authenticateToken,
  getApplyOfflineFormById
);
router.get(
  "/getOfflineDTHConnection/:userId",
  authenticateToken,
  getOfflineDTHConnection
);
router.get(
  "/getSpecificUserTransactions/:userId",
  authenticateToken,
  getSpecificUserTransactions
);
router.get("/getAllCommission/:userId", authenticateToken, getAllCommission);
router.get(
  "/getOnlineDTHConnection/:userId",
  authenticateToken,
  getOnlineDTHConnection
);
router.get(
  "/getSdOnlineRecharges/:userId",
  authenticateToken,
  getSdOnlineRecharges
);
router.get(
  "/getEDistrictHistory/:userId",
  authenticateToken,
  getEDistrictHistory
);

router.get(
  "/getVerifyEDistrictHistory/:userId",
  authenticateToken,
  getVerifyEDistrictHistory
);
router.get("/getOfflinePan/:userId", authenticateToken, getOfflinePan);
router.get("/getOnlinePan/:userId", authenticateToken, getOnlinePan);
router.get("/getCoupanHistory/:userId", authenticateToken, getCoupanHistory);
router.get(
  "/getNsdlPanCorrectionHistory/:userId",
  authenticateToken,
  getNsdlPanCorrectionHistory
);
router.get("/getRemainingIds/:userId", authenticateToken, getRemainingIds);
router.put("/updateUserProfile", authenticateToken, updateUserProfile);
router.get("/getAllPartner/:userId", authenticateToken, getAllPartner);
router.get("/getPackageData/:packageId", authenticateToken, getPackageData);
router.get("/getBoughtUserId/:userId", authenticateToken, getBoughtUserId);
router.get("/getDeactiveUsers/:userId", authenticateToken, getDeactiveUsers);
router.get(
  "/getPendingKycUsers/:userId",
  authenticateToken,
  getPendingKycUsers
);
router.get(
  "/getPendingPaymentUsers/:userId",
  authenticateToken,
  getPendingPaymentUsers
);
router.get(
  "/getAllComplaintsData/:userId",
  authenticateToken,
  getAllComplaintsData
);

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
router.get("/getBankDetails/:userId", authenticateToken, getBankDetails);
router.post("/addBankDetails/:userId", authenticateToken, addBankDetails);
router.delete("/deleteBankDetails/:bid", authenticateToken, deleteBankDetails);
router.get(
  "/getBankAccountDetails/:bid",
  authenticateToken,
  getBankAccountDetails
);

router.post("/changeBankStatus", authenticateToken, changeBankStatus);
router.post(
  "/verifyOtpAndChangeBankStatus",
  authenticateToken,
  verifyOtpAndChangeBankStatus
);
router.post("/buyId", authenticateToken, buyId);

// used API to all super distributor

router.get("/getApplyOfflineForm", getApplyOfflineForm);
router.put("/updateApplyOfflineForm/:id", updateApplyOfflineForm);

router.post("/offline-recharge", offlineRecharge);
router.get("/getRechargeData", getRechargeData);
router.get("/getApiRechargeData/:userId", getApiRechargeData);
router.post("/offline-dth-connection", offlineDthConnection);

router.post("/raiseComplaint/:userId", raiseComplaint);

router.post("/changePassword/:userId", changePassword);

router.post(
  "/SdWithdrawOrApproveWalletRequest",
  SdWithdrawOrApproveWalletRequest
);

// router.get("/getOfflineDTHConnection /:userId", getOfflineDTHConnection);

const raiseComplaintStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "complainUpload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const raiseComplaintUpload = multer({ storage: raiseComplaintStorage });

router.post(
  "/raiseComplaint/:userId",
  raiseComplaintUpload.fields([{ name: "complainFile", maxCount: 1 }]),
  raiseComplaint
);

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
  profileDataUpload.fields([
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "panCardFront", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),

  profileInfo
);

router.post(
  "/kyc-profile",
  profileDataUpload.fields([
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "panCardFront", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
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
router.get(
  "/getVerifyEdistrict/:userId",
  authenticateToken,
  getVerifyEdistrict
);
router.get("/getSambalHistory/:userId", authenticateToken, getSambalHistory);

router.get("/getProfileImage/:userId", getProfileImage);

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

router.get("/getDthConnectionPlan", getDthConnectionPlan);

module.exports = router;
