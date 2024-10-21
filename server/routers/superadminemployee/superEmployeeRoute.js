const express = require("express");
const {
  getAllOfflineServices,
  getDthConnectionOfflineServices,
  getAllOfflineRecharge,
  getAllPanOffline,
  getAllPanOfflineById,
  updatePanStatus,
  updateDTHConnectStatus,
  updateRechargeStatus,
  getAllOfflineServicesById,
  updateOfflineServiceStatus,
} = require("../../controllers/superadminEmployee/superadminEmpController");

const router = express.Router();

router.get("/getAllOfflineServices", getAllOfflineServices);
router.get("/getDthConnectionOfflineServices", getDthConnectionOfflineServices);
router.get("/getAllOfflineRecharge", getAllOfflineRecharge);
router.get("/getAllPanOffline", getAllPanOffline);
router.get("/getAllPanOfflineById/:pid", getAllPanOfflineById);
router.put("/updatePanStatus/:pid", updatePanStatus);
router.put("/updateDTHConnectStatus/:pid", updateDTHConnectStatus);
router.put("/updateRechargeStatus/:pid", updateRechargeStatus);
router.get("/getAllOfflineServicesById/:pid", getAllOfflineServicesById);
router.put("/updateOfflineServiceStatus/:pid", updateOfflineServiceStatus);

module.exports = router;
