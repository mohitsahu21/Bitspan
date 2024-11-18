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
  userPinGenerate,
  createPin,
  requestOtpForPinChange,
  verifyOtp,
  getUserId,
  verifyPin,
  superAdminEmployeeRegiser,
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

router.post("/user-pin", userPinGenerate); //this api work pin create and update
router.post("/create-pin", createPin);
router.post("/request-otp", requestOtpForPinChange);
router.post("/verify-otp", verifyOtp);
router.get("/check-user", getUserId);
router.post("/verify-pin", verifyPin);
router.post("/superAdminEmployeeRegiser", superAdminEmployeeRegiser);

module.exports = router;
