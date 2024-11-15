const express = require("express");
const { addPackage, getPackages, editPackage, deletePackage, getPendingUsers, approveUser, rejectUser, getActiveUsers, deactivateUser, activateUser, getdeactiveUsers, getUserRelations, getAllUsers, getPendingPaymentUsers, markPaymentComplete, getUserIdPriceList, addUserIdPrice, updateUserIdPrice, getSuperAdminEmployee, complainGetData, resolveComplaint, getApplyOfflineForm, ApproveOfflineForm, rejectOfflineForm, getPANOfflineForm, ApprovePANOfflineForm, rejectPANOfflineForm, getBankIdForm, ApproveBankIdForm, rejectBankIdForm, getEdistrictForms, ApproveEdistrictForm, rejectEdistrictForm, getOfflineRecharge, ApproveOfflineRecharge, rejectOfflineRecharge, getOfflineDTHConnection, ApproveOfflineDTHConnection, rejectOfflineDTHConnection, getWalletWithdrawRequests, ApproveWalletWithdrawRequests, rejectWalletWithdrawRequests, getPendingWalletWithdrawRequests, getWalletTransactions, getPendingWalletAddMoneyRequests, ApproveWalletAddMoneyRequests, rejectWalletAddMoneyRequests, getAllWalletAddMoneyRequests, getAllApiList, ActiveApi, DeactiveApi, getAllServicesList, ActiveServices, DeactiveServices } = require("../../controllers/SuperAdmin/superAdminController");
const router = express.Router();


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
router.put("/resolveComplaint" , resolveComplaint );


router.get("/getApplyOfflineForm" , getApplyOfflineForm);
router.put("/ApproveOfflineForm" , ApproveOfflineForm);
router.put("/rejectOfflineForm" , rejectOfflineForm);

router.get("/getPANOfflineForm" , getPANOfflineForm);
router.put("/ApprovePANOfflineForm" , ApprovePANOfflineForm);
router.put("/rejectPANOfflineForm" , rejectPANOfflineForm);


router.get("/getBankIdForm" , getBankIdForm);
router.put("/ApproveBankIdForm" , ApproveBankIdForm);
router.put("/rejectBankIdForm" , rejectBankIdForm );

router.get("/getEdistrictForms" , getEdistrictForms);
router.put("/ApproveEdistrictForm" , ApproveEdistrictForm);
router.put("/rejectEdistrictForm" , rejectEdistrictForm);

router.get("/getOfflineRecharge" , getOfflineRecharge);
router.put("/ApproveOfflineRecharge" , ApproveOfflineRecharge);
router.put("/rejectOfflineRecharge" , rejectOfflineRecharge);

router.get("/getOfflineDTHConnection" , getOfflineDTHConnection);
router.put("/ApproveOfflineDTHConnection" , ApproveOfflineDTHConnection);
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


module.exports = router;
