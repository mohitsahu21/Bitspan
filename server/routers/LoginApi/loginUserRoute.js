const express = require("express");
const { userRegiser, loginUserWithOTP, verifyOtpAndLogin,   forgotPassword,
  verifyOtpAndResetPassword,
  changePasswordRequest,
  verifyOtpAndChangePassword, createPin, requestOtpForPinChange, verifyOtp, getUserId, verifyPin,superAdminEmployeeRegiser } = require("../../controllers/LoginApi/loginUser");
const authenticateToken = require("../../middleware/authenticateToken");

const router = express.Router();

router.post("/user-register", userRegiser);

router.post("/loginWithOTP", loginUserWithOTP);

router.post("/verifyOTP", verifyOtpAndLogin);

router.post("/forgot-password", forgotPassword);
router.post("/verifyOTP-forgot", verifyOtpAndResetPassword);

router.post("/change-password-request", authenticateToken, changePasswordRequest);
router.post("/verify-otp-change-password", authenticateToken, verifyOtpAndChangePassword);

router.get("/home-page", authenticateToken, (req, res) => {
  res.json({
    status: "Success",
    message: "Welcome to the dashboard",
    user: req.user,
  });
});

router.post("/create-pin", authenticateToken, createPin);
router.post("/request-otp", authenticateToken, requestOtpForPinChange);
router.post("/verify-otp", authenticateToken, verifyOtp);
router.get("/check-user", authenticateToken, getUserId);
router.post("/verify-pin", authenticateToken, verifyPin);
router.post("/superAdminEmployeeRegiser", superAdminEmployeeRegiser);

module.exports = router;
