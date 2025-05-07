const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  addPackage,
  getPackages,
  editPackage,
  deletePackage,
  getPendingUsers,
  approveUser,
  rejectUser,
  getActiveUsers,
  deactivateUser,
  activateUser,
  getdeactiveUsers,
  getUserRelations,
  getAllUsers,
  getPendingPaymentUsers,
  markPaymentComplete,
  getUserIdPriceList,
  addUserIdPrice,
  updateUserIdPrice,
  getSuperAdminEmployee,
  complainGetData,
  resolveComplaint,
  getApplyOfflineForm,
  ApproveOfflineForm,
  rejectOfflineForm,
  getPANOfflineForm,
  ApprovePANOfflineForm,
  rejectPANOfflineForm,
  getBankIdForm,
  ApproveBankIdForm,
  rejectBankIdForm,
  getEdistrictForms,
  ApproveEdistrictForm,
  rejectEdistrictForm,
  getOfflineRecharge,
  ApproveOfflineRecharge,
  rejectOfflineRecharge,
  getOfflineDTHConnection,
  ApproveOfflineDTHConnection,
  markForEditOfflineDTHConnection,
  SuccessOfflineDTHConnection,
  rejectOfflineDTHConnection,
  getWalletWithdrawRequests,
  ApproveWalletWithdrawRequests,
  rejectWalletWithdrawRequests,
  getPendingWalletWithdrawRequests,
  getWalletTransactions,
  getPendingWalletAddMoneyRequests,
  ApproveWalletAddMoneyRequests,
  rejectWalletAddMoneyRequests,
  getAllWalletAddMoneyRequests,
  getAllApiList,
  ActiveApi,
  DeactiveApi,
  getAllServicesList,
  ActiveServices,
  DeactiveServices,
  getSuperAdminSettings,
  UpdateGenralSetting,
  UpdateSocialLinkSetting,
  UpdateLogoImageSetting,
  UpdateHomePageSetting,
  getUserNotification,
  UpdateUserNotification,
  UpdateSAWebsiteJoiningPrice,
  AddWalletAddMoneyDirect,
  WithdrawWalletAddMoneyDirect,
  getBuyUserIdSummary,
  getVerifyEdistrictForms,
  ApproveVerifyEdistrictForm,
  rejectVerifyEdistrictForm,
  getSambalForms,
  ApproveSambalForm,
  rejectSambalForm,
  markForEditOfflineForm,
  SuccessOfflineForm,
  markForEditPANOfflineForm,
  SuccessPANOfflineForm,
  markForEditBankIdForm,
  SuccessBankIdForm,
  getOnlineRecharge,
  getOnlineDthConnection,
  getPanCouponRequests,
  approvePanCouponRequest,
  rejectPanCouponRequest,
  getUserRelationData,
  changeUserWhiteLabel,
  changeUserSuperDistributor,
  changeUserDistributor,
  ChangeUserInfo,
  getOnlinePanApplyData,
  getOnlinePanCorrectionData,
  getTodayWalletTransactions,
  markForEditEdistrictForm,
  SuccessEdistrictForm,
  markForEditVerifyEdistrictForm,
  SuccessVerifyEdistrictForm,
  markForEditSambalForm,
  SuccessSambalForm,
  getDTHConnectionPlans,
  CreateDTHConnectionPlans,
  EditDTHConnetionPlans,
  DeleteDTHConnetionPlans,
  getPendingComplaintData,
  getPendingOfflineRecharge,
  getPendingApplyOfflineForm,
  getPendingPANOfflineForm,
  getPendingBankIdForm,
  getPendingEdistrictForms,
  getPendingSambalForms,
  getPendingVerifyEdistrictForms,
  getPendingPanCouponRequests,
  getUserPackageDetails,
  CreditCommission,
  addCommissionEntry,
  getCommissionEntry,
  getUploadedDocuments,
  EditSuperAdminProfile,
  getUserDetails,
  getSpecificUserTransactions,
  getWalletBalance,
  WalletWithdraw,
  getUsersUsingPAN,
  SAContactUs,
  SAGetContactUs,
  getWhiteLabelWebisiteJoinUsers,
  AddCommisionForWhiteLabelJoinUser,
  SuccessNSDLForm,
  rejectNSDLForm,
  SuccessNSDLCorrectionForm,
  rejectNSDLCorrectionForm,
  getSuperAdminWebsiteJoinUsers,
  getWalletToWalletTransfer,
  getShareIdsSummary,
  getAllOperatorList,
  ActiveOperator,
  DeactiveOperator,
  getDSCForms,
  rejectDSCForm,
  SuccessDSCForm,
  markForEditDSCForm,
  ApproveDSCForm,
  getDSCTokenRequests,
  rejectDSCTokenRequest,
  approveDSCTokenRequest,
} = require("../../controllers/SuperAdmin/superAdminController");
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

// Create upload handler for form fields
const uploadGenralSetting = upload.fields([{ name: "QR_Code", maxCount: 1 }]);

const uploadImageLogoSetting = upload.fields([
  { name: "Home_Page_Background", maxCount: 1 },
  { name: "Logo", maxCount: 1 },
  { name: "Fav_Icon", maxCount: 1 },
  { name: "Signature_With_Stamp", maxCount: 1 },
]);

const uploadHomePageSetting = upload.fields([
  { name: "Offer_Banner", maxCount: 1 },
]);

const profileDataStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profile-data/"); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Save file with timestamp
  },
});

const profileDataUpload = multer({ storage: profileDataStorage });

router.post("/addPackage", authenticateToken, addPackage);
router.get("/getPackage", authenticateToken, getPackages);
router.put("/editPackage", authenticateToken, editPackage);
router.delete("/deletePackage", authenticateToken, deletePackage);
router.get("/getAllUsers", authenticateToken, getAllUsers);
router.get("/getPendingUsers", authenticateToken, getPendingUsers);
router.get(
  "/getPendingPaymentUsers",
  authenticateToken,
  getPendingPaymentUsers
);
router.get("/getActiveUsers", authenticateToken, getActiveUsers);
router.get("/getdeactiveUsers", authenticateToken, getdeactiveUsers);
router.get("/getUserRelations/:userId", authenticateToken, getUserRelations);
router.put("/approveUser", authenticateToken, approveUser);
router.put("/rejectUser", authenticateToken, rejectUser);
router.put("/deactivateUser", authenticateToken, deactivateUser);
router.put("/activateUser", authenticateToken, activateUser);
router.put("/markPaymentComplete", authenticateToken, markPaymentComplete);
router.get("/getUserIdPriceList", authenticateToken, getUserIdPriceList);
router.post("/addUserIdPrice", addUserIdPrice);
router.put("/updateUserIdPrice", authenticateToken, updateUserIdPrice);
router.get("/getSuperAdminEmployee", authenticateToken, getSuperAdminEmployee);
router.get("/complainGetData", authenticateToken, complainGetData);
router.get(
  "/getPendingComplaintData",
  authenticateToken,
  getPendingComplaintData
);
router.put("/resolveComplaint", authenticateToken, resolveComplaint);

router.get("/getApplyOfflineForm", authenticateToken, getApplyOfflineForm);
router.put("/ApproveOfflineForm", authenticateToken, ApproveOfflineForm);
router.put(
  "/markForEditOfflineForm",
  authenticateToken,
  markForEditOfflineForm
);
router.put("/SuccessOfflineForm", authenticateToken, SuccessOfflineForm);
router.put("/rejectOfflineForm", authenticateToken, rejectOfflineForm);

router.get("/getPANOfflineForm", authenticateToken, getPANOfflineForm);
router.put("/ApprovePANOfflineForm", authenticateToken, ApprovePANOfflineForm);
router.put(
  "/markForEditPANOfflineForm",
  authenticateToken,
  markForEditPANOfflineForm
);
router.put("/SuccessPANOfflineForm", authenticateToken, SuccessPANOfflineForm);
router.put("/rejectPANOfflineForm", authenticateToken, rejectPANOfflineForm);

router.get("/getBankIdForm", authenticateToken, getBankIdForm);
router.put("/ApproveBankIdForm", authenticateToken, ApproveBankIdForm);
router.put("/markForEditBankIdForm", authenticateToken, markForEditBankIdForm);
router.put("/SuccessBankIdForm", authenticateToken, SuccessBankIdForm);
router.put("/rejectBankIdForm", authenticateToken, rejectBankIdForm);

router.get("/getEdistrictForms", authenticateToken, getEdistrictForms);
router.put("/ApproveEdistrictForm", authenticateToken, ApproveEdistrictForm);
router.put(
  "/markForEditEdistrictForm",
  authenticateToken,
  markForEditEdistrictForm
);
router.put("/SuccessEdistrictForm", authenticateToken, SuccessEdistrictForm);
router.put("/rejectEdistrictForm", authenticateToken, rejectEdistrictForm);

router.get(
  "/getVerifyEdistrictForms",
  authenticateToken,
  getVerifyEdistrictForms
);
router.put(
  "/ApproveVerifyEdistrictForm",
  authenticateToken,
  ApproveVerifyEdistrictForm
);
router.put(
  "/markForEditVerifyEdistrictForm",
  authenticateToken,
  markForEditVerifyEdistrictForm
);
router.put(
  "/SuccessVerifyEdistrictForm",
  authenticateToken,
  SuccessVerifyEdistrictForm
);
router.put(
  "/rejectVerifyEdistrictForm",
  authenticateToken,
  rejectVerifyEdistrictForm
);

router.get("/getSambalForms", authenticateToken, getSambalForms);
router.put("/ApproveSambalForm", authenticateToken, ApproveSambalForm);
router.put("/markForEditSambalForm", authenticateToken, markForEditSambalForm);
router.put("/SuccessSambalForm", authenticateToken, SuccessSambalForm);
router.put("/rejectSambalForm", authenticateToken, rejectSambalForm);

router.get("/getOfflineRecharge", authenticateToken, getOfflineRecharge);
router.put(
  "/ApproveOfflineRecharge",
  authenticateToken,
  ApproveOfflineRecharge
);
router.put("/rejectOfflineRecharge", authenticateToken, rejectOfflineRecharge);

router.get(
  "/getOfflineDTHConnection",
  authenticateToken,
  getOfflineDTHConnection
);
router.put(
  "/ApproveOfflineDTHConnection",
  authenticateToken,
  ApproveOfflineDTHConnection
);
router.put(
  "/markForEditOfflineDTHConnection",
  authenticateToken,
  markForEditOfflineDTHConnection
);
router.put(
  "/SuccessOfflineDTHConnection",
  authenticateToken,
  SuccessOfflineDTHConnection
);
router.put(
  "/rejectOfflineDTHConnection",
  authenticateToken,
  rejectOfflineDTHConnection
);

router.get(
  "/getWalletWithdrawRequests",
  authenticateToken,
  getWalletWithdrawRequests
);
router.get(
  "/getPendingWalletWithdrawRequests",
  authenticateToken,
  getPendingWalletWithdrawRequests
);
router.put(
  "/ApproveWalletWithdrawRequests",
  authenticateToken,
  ApproveWalletWithdrawRequests
);
router.put(
  "/rejectWalletWithdrawRequests",
  authenticateToken,
  rejectWalletWithdrawRequests
);

router.get("/getWalletTransactions", authenticateToken, getWalletTransactions);

router.get(
  "/getPendingWalletAddMoneyRequests",
  authenticateToken,
  getPendingWalletAddMoneyRequests
);
router.get(
  "/getAllWalletAddMoneyRequests",
  authenticateToken,
  getAllWalletAddMoneyRequests
);
router.put(
  "/ApproveWalletAddMoneyRequests",
  authenticateToken,
  ApproveWalletAddMoneyRequests
);
router.put(
  "/rejectWalletAddMoneyRequests",
  authenticateToken,
  rejectWalletAddMoneyRequests
);

router.get("/getAllApiList", authenticateToken, getAllApiList);
router.put("/ActiveApi", authenticateToken, ActiveApi);
router.put("/DeactiveApi", authenticateToken, DeactiveApi);

router.get("/getAllServicesList", authenticateToken, getAllServicesList);
router.put("/ActiveServices", authenticateToken, ActiveServices);
router.put("/DeactiveServices", authenticateToken, DeactiveServices);

router.get("/getSuperAdminSettings", getSuperAdminSettings);
router.post(
  "/UpdateGenralSetting",
  authenticateToken,
  uploadGenralSetting,
  UpdateGenralSetting
);
router.post(
  "/UpdateLogoImageSetting",
  authenticateToken,
  uploadImageLogoSetting,
  UpdateLogoImageSetting
);
router.post(
  "/UpdateHomePageSetting",
  authenticateToken,
  uploadHomePageSetting,
  UpdateHomePageSetting
);
router.put(
  "/UpdateSocialLinkSetting",
  authenticateToken,
  UpdateSocialLinkSetting
);
router.put(
  "/UpdateSAWebsiteJoiningPrice",
  authenticateToken,
  UpdateSAWebsiteJoiningPrice
);

router.get("/getUserNotification", authenticateToken, getUserNotification);
router.put(
  "/UpdateUserNotification",
  authenticateToken,
  UpdateUserNotification
);

router.put(
  "/AddWalletAddMoneyDirect",
  authenticateToken,
  AddWalletAddMoneyDirect
);
router.put(
  "/WithdrawWalletAddMoneyDirect",
  authenticateToken,
  WithdrawWalletAddMoneyDirect
);

router.get("/getBuyUserIdSummary", authenticateToken, getBuyUserIdSummary);
router.get("/getOnlineRecharge", authenticateToken, getOnlineRecharge);
router.get(
  "/getOnlineDthConnection",
  authenticateToken,
  getOnlineDthConnection
);
router.get("/getPanCouponRequests", authenticateToken, getPanCouponRequests);
router.put(
  "/approvePanCouponRequest",
  authenticateToken,
  approvePanCouponRequest
);
router.put(
  "/rejectPanCouponRequest",
  authenticateToken,
  rejectPanCouponRequest
);
router.get("/getUserRelationData", authenticateToken, getUserRelationData);
router.put("/changeUserWhiteLabel", authenticateToken, changeUserWhiteLabel);
router.put(
  "/changeUserSuperDistributor",
  authenticateToken,
  changeUserSuperDistributor
);
router.put("/changeUserDistributor", authenticateToken, changeUserDistributor);
router.put("/ChangeUserInfo", authenticateToken, ChangeUserInfo);

router.get("/getOnlinePanApplyData", authenticateToken, getOnlinePanApplyData);
router.get(
  "/getOnlinePanCorrectionData",
  authenticateToken,
  getOnlinePanCorrectionData
);
router.get(
  "/getTodayWalletTransactions",
  authenticateToken,
  getTodayWalletTransactions
);

router.get("/getDTHConnectionPlans", authenticateToken, getDTHConnectionPlans);
router.post(
  "/CreateDTHConnectionPlans",
  authenticateToken,
  CreateDTHConnectionPlans
);
router.put("/EditDTHConnetionPlans", authenticateToken, EditDTHConnetionPlans);
router.delete(
  "/DeleteDTHConnetionPlans",
  authenticateToken,
  DeleteDTHConnetionPlans
);

router.get(
  "/getPendingOfflineRecharge",
  authenticateToken,
  getPendingOfflineRecharge
);
router.get(
  "/getPendingApplyOfflineForm",
  authenticateToken,
  getPendingApplyOfflineForm
);
router.get(
  "/getPendingPANOfflineForm",
  authenticateToken,
  getPendingPANOfflineForm
);
router.get("/getPendingBankIdForm", authenticateToken, getPendingBankIdForm);
router.get(
  "/getPendingEdistrictForms",
  authenticateToken,
  getPendingEdistrictForms
);
router.get(
  "/getPendingVerifyEdistrictForms",
  authenticateToken,
  getPendingVerifyEdistrictForms
);
router.get("/getPendingSambalForms", authenticateToken, getPendingSambalForms);
router.get(
  "/getPendingPanCouponRequests",
  authenticateToken,
  getPendingPanCouponRequests
);
router.get(
  "/getUserPackageDetails/:userId",
  authenticateToken,
  getUserPackageDetails
);
router.put("/CreditCommission", authenticateToken, CreditCommission);
router.post("/addCommissionEntry", authenticateToken, addCommissionEntry);
router.get("/getCommissionEntry", authenticateToken, getCommissionEntry);
router.get("/getUploadedDocuments", authenticateToken, getUploadedDocuments);
router.put(
  "/EditSuperAdminProfile",
  authenticateToken,
  profileDataUpload.fields([{ name: "profileImage", maxCount: 1 }]),
  EditSuperAdminProfile
);
router.get("/getUserDetails/:userId", authenticateToken, getUserDetails);
router.get(
  "/getSpecificUserTransactions/:userId",
  authenticateToken,
  getSpecificUserTransactions
);
router.get("/getWalletBalance/:userId", authenticateToken, getWalletBalance);
router.post("/WalletWithdraw", authenticateToken, WalletWithdraw);
router.get("/getUsersUsingPAN/:PAN", getUsersUsingPAN);
router.post("/SAContactUs", SAContactUs);
router.get("/SAGetContactUs", SAGetContactUs);
router.get(
  "/getWhiteLabelWebisiteJoinUsers",
  authenticateToken,
  getWhiteLabelWebisiteJoinUsers
);
router.post(
  "/AddCommisionForWhiteLabelJoinUser",
  authenticateToken,
  AddCommisionForWhiteLabelJoinUser
);
router.put("/SuccessNSDLForm", authenticateToken, SuccessNSDLForm);
router.put("/rejectNSDLForm", authenticateToken, rejectNSDLForm);
router.put(
  "/SuccessNSDLCorrectionForm",
  authenticateToken,
  SuccessNSDLCorrectionForm
);
router.put(
  "/rejectNSDLCorrectionForm",
  authenticateToken,
  rejectNSDLCorrectionForm
);
router.get(
  "/getSuperAdminWebsiteJoinUsers",
  authenticateToken,
  getSuperAdminWebsiteJoinUsers
);
router.get(
  "/getWalletToWalletTransfer",
  authenticateToken,
  getWalletToWalletTransfer
);
router.get("/getShareIdsSummary", authenticateToken, getShareIdsSummary);

// Add routes for operator management and other functionalities
router.get("/getAllOperatorList", getAllOperatorList);
router.put("/ActiveOperator", ActiveOperator);
router.put("/DeactiveOperator", DeactiveOperator);
router.get("/getDSCForms", getDSCForms);
router.put("/rejectDSCForm", rejectDSCForm);
router.put("/SuccessDSCForm", SuccessDSCForm);
router.put("/markForEditDSCForm", markForEditDSCForm);
router.put("/ApproveDSCForm", ApproveDSCForm);
router.get("/getDSCTokenRequests", getDSCTokenRequests);
router.put("/rejectDSCTokenRequest", rejectDSCTokenRequest);
router.put("/approveDSCTokenRequest", approveDSCTokenRequest);

module.exports = router;
