const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { addPackage, getPackages, editPackage, deletePackage, getPendingUsers, approveUser, rejectUser, getActiveUsers, deactivateUser, activateUser, getdeactiveUsers, getUserRelations, getAllUsers, getPendingPaymentUsers, markPaymentComplete, getUserIdPriceList, addUserIdPrice, updateUserIdPrice, getSuperAdminEmployee, complainGetData, resolveComplaint, getApplyOfflineForm, ApproveOfflineForm, rejectOfflineForm, getPANOfflineForm, ApprovePANOfflineForm, rejectPANOfflineForm, getBankIdForm, ApproveBankIdForm, rejectBankIdForm, getEdistrictForms, ApproveEdistrictForm, rejectEdistrictForm, getOfflineRecharge, ApproveOfflineRecharge, rejectOfflineRecharge, getOfflineDTHConnection, ApproveOfflineDTHConnection,markForEditOfflineDTHConnection,SuccessOfflineDTHConnection, rejectOfflineDTHConnection, getWalletWithdrawRequests, ApproveWalletWithdrawRequests, rejectWalletWithdrawRequests, getPendingWalletWithdrawRequests, getWalletTransactions, getPendingWalletAddMoneyRequests, ApproveWalletAddMoneyRequests, rejectWalletAddMoneyRequests, getAllWalletAddMoneyRequests, getAllApiList, ActiveApi, DeactiveApi, getAllServicesList, ActiveServices, DeactiveServices, getSuperAdminSettings, UpdateGenralSetting, UpdateSocialLinkSetting, UpdateLogoImageSetting, UpdateHomePageSetting, getUserNotification, UpdateUserNotification, UpdateSAWebsiteJoiningPrice, AddWalletAddMoneyDirect, WithdrawWalletAddMoneyDirect, getBuyUserIdSummary, getVerifyEdistrictForms, ApproveVerifyEdistrictForm, rejectVerifyEdistrictForm, getSambalForms, ApproveSambalForm, rejectSambalForm, markForEditOfflineForm, SuccessOfflineForm, markForEditPANOfflineForm, SuccessPANOfflineForm, markForEditBankIdForm, SuccessBankIdForm, getOnlineRecharge, getOnlineDthConnection, getPanCouponRequests, approvePanCouponRequest, rejectPanCouponRequest, getUserRelationData, changeUserWhiteLabel, changeUserSuperDistributor, changeUserDistributor, ChangeUserInfo, getOnlinePanApplyData, getOnlinePanCorrectionData, getTodayWalletTransactions, markForEditEdistrictForm, SuccessEdistrictForm, markForEditVerifyEdistrictForm, SuccessVerifyEdistrictForm, markForEditSambalForm, SuccessSambalForm, getDTHConnectionPlans, CreateDTHConnectionPlans, EditDTHConnetionPlans, DeleteDTHConnetionPlans, getPendingComplaintData, getPendingOfflineRecharge, getPendingApplyOfflineForm, getPendingPANOfflineForm, getPendingBankIdForm } = require("../../controllers/SuperAdmin/superAdminController");

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
const uploadGenralSetting = upload.fields([
    { name: 'QR_Code', maxCount: 1 }, 
  ]);

  const uploadImageLogoSetting = upload.fields([
    { name: 'Home_Page_Background', maxCount: 1 }, 
    { name: 'Logo', maxCount: 1 }, 
    { name: 'Fav_Icon', maxCount: 1 }, 
    { name: 'Signature_With_Stamp', maxCount: 1 }, 
  ]);

  const uploadHomePageSetting = upload.fields([
    { name: 'Offer_Banner', maxCount: 1 }, 
  ]);


router.post("/addPackage" , addPackage );
router.get('/getPackage',  getPackages);
router.put('/editPackage',  editPackage);
router.delete('/deletePackage',  deletePackage);
router.get("/getAllUsers", getAllUsers);
router.get("/getPendingUsers", getPendingUsers);
router.get("/getPendingPaymentUsers", getPendingPaymentUsers);
router.get("/getActiveUsers", getActiveUsers);
router.get("/getdeactiveUsers", getdeactiveUsers);
router.get("/getUserRelations/:userId", getUserRelations);
router.put('/approveUser',  approveUser);
router.put('/rejectUser',  rejectUser);
router.put('/deactivateUser',  deactivateUser);
router.put('/activateUser',  activateUser);
router.put('/markPaymentComplete',  markPaymentComplete);
router.get("/getUserIdPriceList",  getUserIdPriceList);
router.post("/addUserIdPrice" , addUserIdPrice );
router.put("/updateUserIdPrice" , updateUserIdPrice );
router.get("/getSuperAdminEmployee" , getSuperAdminEmployee);
router.get("/complainGetData" , complainGetData);
router.get("/getPendingComplaintData", getPendingComplaintData);
router.put("/resolveComplaint" , resolveComplaint );


router.get("/getApplyOfflineForm" , getApplyOfflineForm);
router.put("/ApproveOfflineForm" , ApproveOfflineForm);
router.put("/markForEditOfflineForm" , markForEditOfflineForm);
router.put("/SuccessOfflineForm" , SuccessOfflineForm);
router.put("/rejectOfflineForm" , rejectOfflineForm);

router.get("/getPANOfflineForm" , getPANOfflineForm);
router.put("/ApprovePANOfflineForm" , ApprovePANOfflineForm);
router.put("/markForEditPANOfflineForm" , markForEditPANOfflineForm);
router.put("/SuccessPANOfflineForm" , SuccessPANOfflineForm);
router.put("/rejectPANOfflineForm" , rejectPANOfflineForm);


router.get("/getBankIdForm" , getBankIdForm);
router.put("/ApproveBankIdForm" , ApproveBankIdForm);
router.put("/markForEditBankIdForm" , markForEditBankIdForm);
router.put("/SuccessBankIdForm" , SuccessBankIdForm);
router.put("/rejectBankIdForm" , rejectBankIdForm );

router.get("/getEdistrictForms" , getEdistrictForms);
router.put("/ApproveEdistrictForm" , ApproveEdistrictForm);
router.put("/markForEditEdistrictForm" , markForEditEdistrictForm);
router.put("/SuccessEdistrictForm" , SuccessEdistrictForm);
router.put("/rejectEdistrictForm" , rejectEdistrictForm);

router.get("/getVerifyEdistrictForms" , getVerifyEdistrictForms);
router.put("/ApproveVerifyEdistrictForm" , ApproveVerifyEdistrictForm);
router.put("/markForEditVerifyEdistrictForm" , markForEditVerifyEdistrictForm);
router.put("/SuccessVerifyEdistrictForm" , SuccessVerifyEdistrictForm);
router.put("/rejectVerifyEdistrictForm" , rejectVerifyEdistrictForm);

router.get("/getSambalForms" , getSambalForms);
router.put("/ApproveSambalForm" , ApproveSambalForm);
router.put("/markForEditSambalForm" , markForEditSambalForm);
router.put("/SuccessSambalForm" , SuccessSambalForm);
router.put("/rejectSambalForm" , rejectSambalForm);



router.get("/getOfflineRecharge" , getOfflineRecharge);
router.put("/ApproveOfflineRecharge" , ApproveOfflineRecharge);
router.put("/rejectOfflineRecharge" , rejectOfflineRecharge);

router.get("/getOfflineDTHConnection" , getOfflineDTHConnection);
router.put("/ApproveOfflineDTHConnection" , ApproveOfflineDTHConnection);
router.put("/markForEditOfflineDTHConnection" , markForEditOfflineDTHConnection);
router.put("/SuccessOfflineDTHConnection" , SuccessOfflineDTHConnection);
router.put("/rejectOfflineDTHConnection" , rejectOfflineDTHConnection);

router.get("/getWalletWithdrawRequests" , getWalletWithdrawRequests);
router.get("/getPendingWalletWithdrawRequests" , getPendingWalletWithdrawRequests);
router.put("/ApproveWalletWithdrawRequests" , ApproveWalletWithdrawRequests)
router.put("/rejectWalletWithdrawRequests" , rejectWalletWithdrawRequests)

router.get("/getWalletTransactions" , getWalletTransactions);

router.get("/getPendingWalletAddMoneyRequests" , getPendingWalletAddMoneyRequests);
router.get("/getAllWalletAddMoneyRequests" , getAllWalletAddMoneyRequests);
router.put("/ApproveWalletAddMoneyRequests" , ApproveWalletAddMoneyRequests);
router.put("/rejectWalletAddMoneyRequests" , rejectWalletAddMoneyRequests);

router.get("/getAllApiList" , getAllApiList);
router.put("/ActiveApi" , ActiveApi);
router.put("/DeactiveApi" , DeactiveApi);

router.get("/getAllServicesList" , getAllServicesList);
router.put("/ActiveServices" , ActiveServices)
router.put("/DeactiveServices" , DeactiveServices)

router.get("/getSuperAdminSettings" , getSuperAdminSettings)
router.post('/UpdateGenralSetting',uploadGenralSetting, UpdateGenralSetting)
router.post('/UpdateLogoImageSetting',uploadImageLogoSetting, UpdateLogoImageSetting)
router.post('/UpdateHomePageSetting',uploadHomePageSetting, UpdateHomePageSetting)
router.put('/UpdateSocialLinkSetting', UpdateSocialLinkSetting)
router.put("/UpdateSAWebsiteJoiningPrice" , UpdateSAWebsiteJoiningPrice)

router.get('/getUserNotification', getUserNotification)
router.put("/UpdateUserNotification" , UpdateUserNotification)

router.put("/AddWalletAddMoneyDirect" , AddWalletAddMoneyDirect)
router.put("/WithdrawWalletAddMoneyDirect" , WithdrawWalletAddMoneyDirect)

router.get("/getBuyUserIdSummary" , getBuyUserIdSummary)
router.get("/getOnlineRecharge" , getOnlineRecharge)
router.get("/getOnlineDthConnection" , getOnlineDthConnection)
router.get("/getPanCouponRequests" , getPanCouponRequests)
router.put("/approvePanCouponRequest",approvePanCouponRequest)
router.put("/rejectPanCouponRequest",rejectPanCouponRequest)
router.get("/getUserRelationData" , getUserRelationData)
router.put("/changeUserWhiteLabel" , changeUserWhiteLabel)
router.put("/changeUserSuperDistributor" , changeUserSuperDistributor)
router.put("/changeUserDistributor" , changeUserDistributor)
router.put("/ChangeUserInfo" , ChangeUserInfo)

router.get("/getOnlinePanApplyData" , getOnlinePanApplyData)
router.get("/getOnlinePanCorrectionData" , getOnlinePanCorrectionData)
router.get("/getTodayWalletTransactions" , getTodayWalletTransactions)

router.get("/getDTHConnectionPlans" , getDTHConnectionPlans)
router.post("/CreateDTHConnectionPlans", CreateDTHConnectionPlans)
router.put("/EditDTHConnetionPlans", EditDTHConnetionPlans)
router.delete("/DeleteDTHConnetionPlans", DeleteDTHConnetionPlans)

router.get("/getPendingOfflineRecharge" ,  getPendingOfflineRecharge)
router.get("/getPendingApplyOfflineForm" ,  getPendingApplyOfflineForm)
router.get("/getPendingPANOfflineForm" ,  getPendingPANOfflineForm)
router.get("/getPendingBankIdForm" ,  getPendingBankIdForm)






module.exports = router;
