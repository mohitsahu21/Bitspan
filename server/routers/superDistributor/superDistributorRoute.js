const express = require("express");
const {
  getSuperDistributorUserList,
  getAllOtherOfflineFormDetails,
  getPanCardOfflineFormDetails,
  getRechargeOfflineFormDetails,
  getDTHConnectionOfflineFormDetails,
  updateTwoStepPin,
} = require("../../controllers/superDistributor/superDistributor");

const router = express.Router();

router.get("/getSuperDistributorUserList", getSuperDistributorUserList);
router.get(
  "/getAllOtherOfflineFormDetails/:userId",
  getAllOtherOfflineFormDetails
);

router.get(
  "/getPanCardOfflineFormDetails/:userId",
  getPanCardOfflineFormDetails
);

router.get(
  "/getRechargeOfflineFormDetails/:userId",
  getRechargeOfflineFormDetails
);

router.get(
  "/getDTHConnectionOfflineFormDetails/:userId",
  getDTHConnectionOfflineFormDetails
);

router.put("/updateTwoStepPin/:userId", updateTwoStepPin);

module.exports = router;
