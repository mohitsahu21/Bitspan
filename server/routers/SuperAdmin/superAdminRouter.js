const express = require("express");
const { addPackage } = require("../../controllers/SuperAdmin/superAdminController");
const router = express.Router();


router.post("/addPackage" , addPackage )

module.exports = router;
