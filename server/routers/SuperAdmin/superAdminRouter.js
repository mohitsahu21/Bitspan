const express = require("express");
const { addPackage, getPackages, editPackage, deletePackage, getPendingUsers, approveUser, rejectUser, getActiveUsers, deactivateUser, activateUser, getdeactiveUsers, getUserRelations } = require("../../controllers/SuperAdmin/superAdminController");
const router = express.Router();


router.post("/addPackage" , addPackage );
router.get('/getPackage',  getPackages);
router.put('/editPackage',  editPackage);
router.delete('/deletePackage',  deletePackage);
router.get("/getPendingUsers", getPendingUsers);
router.get("/getActiveUsers", getActiveUsers);
router.get("/getdeactiveUsers", getdeactiveUsers);
router.get("/getUserRelations/:userId", getUserRelations);
router.put('/approveUser',  approveUser);
router.put('/rejectUser',  rejectUser);
router.put('/deactivateUser',  deactivateUser);
router.put('/activateUser',  activateUser);
module.exports = router;
