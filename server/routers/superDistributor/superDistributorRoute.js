const express = require("express");
const {
  getSuperDistributorUserList,
  getAllOtherOfflineFormDetails,
  getPanCardOfflineFormDetails,
  getRechargeOfflineFormDetails,
  getDTHConnectionOfflineFormDetails,
  updateTwoStepPin,
  getAllUserSuperDist,
  makeComplaints,
  getAllComplaintsById,
  changePasswordSuperDist,
  getUserDetails,
  updateProfileKyc,
} = require("../../controllers/superDistributor/superDistributor");
const path = require("path");
const multer = require("multer");

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
router.get("/getAllUserSuperDist/:userId", getAllUserSuperDist);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "complainUpload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

router.post("/makeComplaints", upload.single("attachment"), makeComplaints);
router.get("/getAllComplaintsById/:userId", getAllComplaintsById);
router.put("/changePasswordSuperDist/:userId", changePasswordSuperDist);
router.get("/getUserDetails/:userId", getUserDetails);

const kycStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "kycupload/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const kycUpload = multer({
  storage: kycStorage,
}).fields([
  { name: "AadharFront", maxCount: 1 },
  { name: "AadharBack", maxCount: 1 },
  { name: "PanCard", maxCount: 1 },
]);

router.put("/kycupload/:userId", kycUpload, updateProfileKyc);

module.exports = router;
