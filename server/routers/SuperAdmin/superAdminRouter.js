const express = require("express");
const { addPackage, getPackages, editPackage, deletePackage, getPendingUsers, approveUser, rejectUser, getActiveUsers, deactivateUser, activateUser, getdeactiveUsers, getUserRelations, getAllUsers, getPendingPaymentUsers, markPaymentComplete, getUserIdPriceList, addUserIdPrice, updateUserIdPrice, getSuperAdminEmployee, complainGetData, resolveComplaint, getApplyOfflineForm, ApproveOfflineForm, rejectOfflineForm, getPANOfflineForm, ApprovePANOfflineForm, rejectPANOfflineForm, getBankIdForm, ApproveBankIdForm, rejectBankIdForm, getEdistrictForms } = require("../../controllers/SuperAdmin/superAdminController");
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

module.exports = router;
