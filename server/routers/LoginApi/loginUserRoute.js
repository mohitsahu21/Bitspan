const express = require("express");
const {
  userRegiser,
  loginUser,
  loginUserWithOTP,
  verifyOtpAndLogin,
  forgotPassword,
  verifyOtpAndResetPassword,
  changePasswordRequest,
  verifyOtpAndChangePassword,
} = require("../../controllers/LoginApi/loginUser");
const authenticateToken = require("../../middleware/authenticateToken");

const router = express.Router();

router.post("/user-register", userRegiser);
router.post("/login", loginUser);

router.post("/loginWithOTP", loginUserWithOTP);

router.post("/verifyOTP", verifyOtpAndLogin);

router.post("/forgot-password", forgotPassword);
router.post("/verifyOTP-forgot", verifyOtpAndResetPassword);

router.post("/change-password-request", changePasswordRequest);
router.post("/verify-otp-change-password", verifyOtpAndChangePassword);

router.get("/home-page", authenticateToken, (req, res) => {
  res.json({
    status: "Success",
    message: "Welcome to the dashboard",
    user: req.user,
  });
});

module.exports = router;
