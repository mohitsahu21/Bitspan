const express = require("express");
const { addPackage, getPackages, editPackage, deletePackage, getPendingUsers, approveUser, rejectUser, getActiveUsers, deactivateUser, activateUser, getdeactiveUsers, getUserRelations, getAllUsers, getPendingPaymentUsers, markPaymentComplete, getUserIdPriceList, addUserIdPrice } = require("../../controllers/SuperAdmin/superAdminController");
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
module.exports = router;
