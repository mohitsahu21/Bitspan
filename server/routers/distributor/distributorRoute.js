const express = require("express");
const path = require("path");
const multer = require("multer");
const {
  getDistributorUserList,
  getAllOtherOfflineFormDetails,
  getPanCardOfflineFormDetails,
  getWalletBalance,
  makePurchaseUserId,
} = require("../../controllers/distributor/distributorController");

const router = express.Router();

router.get("/getDistributorUserList", getDistributorUserList);
router.get(
  "/getAllOtherOfflineFormDetails/:userId",
  getAllOtherOfflineFormDetails
);

router.get(
  "/getPanCardOfflineFormDetails/:userId",
  getPanCardOfflineFormDetails
);

router.get("/getWalletBalance/:userId", getWalletBalance);
router.post("/makePurchaseUserId", makePurchaseUserId);

module.exports = router;
