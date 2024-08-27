const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  applyOfflineForm,
  getApplyOfflineFormByid,
  getApplyOfflineForm,
  updateApplyOfflineForm,
  bankidForm,
} = require("../controllers/retailerController");

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

router.post(
  "/applyOfflineForm",
  upload.fields([
    { name: "attached_form", maxCount: 1 },
    { name: "attached_photo", maxCount: 1 },
    { name: "attached_sign", maxCount: 1 },
    { name: "attached_kyc", maxCount: 10 },
  ]),
  applyOfflineForm
);
router.post(
  "/bankidForm",
  upload.fields([
    { name: "attached_photo", maxCount: 1 },
    { name: "attached_kyc", maxCount: 10 },
    { name: "bank_passbook", maxCount: 1 },
    { name: "shop_photo", maxCount: 1 },
    { name: "electric_bill", maxCount: 1 },
  ]),
  bankidForm
);
router.get("/getApplyOfflineFormByid/:id", getApplyOfflineFormByid);
router.get("/getApplyOfflineForm", getApplyOfflineForm);
router.put("/updateApplyOfflineForm/:id", updateApplyOfflineForm);

module.exports = router;
