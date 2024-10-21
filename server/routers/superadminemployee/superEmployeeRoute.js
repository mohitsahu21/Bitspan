const express = require("express");
const {
  getAllOfflineServices,
  getDthConnectionOfflineServices,
  getAllOfflineRecharge,
  getAllPanOffline,
  getAllPanOfflineById,
} = require("../../controllers/superadminEmployee/superadminEmpController");

const router = express.Router();

router.get("/getAllOfflineServices", getAllOfflineServices);
router.get("/getDthConnectionOfflineServices", getDthConnectionOfflineServices);
router.get("/getAllOfflineRecharge", getAllOfflineRecharge);
router.get("/getAllPanOffline", getAllPanOffline);
router.get("/getAllPanOfflineById/:pid", getAllPanOfflineById);

module.exports = router;
