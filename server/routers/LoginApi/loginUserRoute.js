const express = require("express");
const {
  userRegiser,
  loginUser,
  loginUserWithOTP,
  verifyOtpAndLogin,
  superAdminEmployeeRegiser,
} = require("../../controllers/LoginApi/loginUser");
const authenticateToken = require("../../middleware/authenticateToken");

const router = express.Router();

router.post("/user-register", userRegiser);
router.post("/login", loginUser);
router.post("/superAdminEmployeeRegiser", superAdminEmployeeRegiser);
router.post("/loginWithOTP", loginUserWithOTP);

router.post("/verifyOTP", verifyOtpAndLogin);

router.get("/home-page", authenticateToken, (req, res) => {
  res.json({
    status: "Success",
    message: "Welcome to the dashboard",
    user: req.user,
  });
});

module.exports = router;
