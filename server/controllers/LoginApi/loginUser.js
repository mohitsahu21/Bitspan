const { db } = require("../../connect");
const moment = require("moment-timezone");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { NONAME } = require("dns");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const rolePrefixes = {
  superadmin: "SA",
  whitelabel: "WL",
  superdistributer: "SD",
  distributer: "DT",
  retailer: "RT",
  SuperAdmin_Employee: "SAE",
};

const cleanName = (name) => {
  return name.replace(/[^a-zA-Z]/g, "");
};

const generatePassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 6; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const userRegiser = async (req, res) => {
  const {
    UserName,
    role,
    ContactNo,
    Email,
    PanCardNumber,
    AadharNumber,
    BusinessName,
    City,
    State,
    PinCode,
  } = req.body;

  if (
    !UserName ||
    !role ||
    !ContactNo ||
    !Email ||
    !PanCardNumber ||
    !AadharNumber ||
    !BusinessName ||
    !City ||
    !State ||
    !PinCode
  ) {
    return res
      .status(400)
      .json({ status: "Failure", error: "All fields are required" });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const cleanedName = cleanName(UserName);
  let namePart = cleanedName.slice(0, 4).toUpperCase();

  if (cleanedName.length < 4) {
    namePart = (cleanedName + cleanedName.slice(0, 4))
      .slice(0, 4)
      .toUpperCase();
  }

  const rolePrefix = rolePrefixes[role];

  try {
    // Start a transaction to ensure atomicity
    db.beginTransaction(async (transactionErr) => {
      if (transactionErr) {
        console.error("Error starting transaction:", transactionErr);
        return res
          .status(500)
          .json({ status: "Failure", message: "Internal server error" });
      }

      const getLastUserIdQuery = `SELECT UserId FROM userprofile WHERE UserId LIKE '${rolePrefix}-%' ORDER BY UserId DESC LIMIT 1`;

      db.query(getLastUserIdQuery, async (err, results) => {
        if (err) {
          console.error("Error fetching latest UserId:", err);
          return res
            .status(500)
            .json({ status: "Failure", message: "Internal server error" });
        }

        let sequenceNumber = 1;
        if (results.length > 0) {
          const lastUserId = results[0].UserId;
          const numericPart = lastUserId.match(/\d+$/);
          if (numericPart) {
            sequenceNumber = parseInt(numericPart[0], 10) + 1;
          }
        }

        const paddingLength = 4;
        const userId = `${rolePrefix}-${namePart}${sequenceNumber
          .toString()
          .padStart(paddingLength, "0")}`;

        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUserQuery = `INSERT INTO userprofile (UserId, password, UserName, role, ContactNo, Email, PanCardNumber, AadharNumber, BusinessName, City, State, PinCode, CreateAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const insertValues = [
          userId,
          hashedPassword,
          UserName,
          role,
          ContactNo,
          Email,
          PanCardNumber,
          AadharNumber,
          BusinessName,
          City,
          State,
          PinCode,
          createdAt,
        ];

        db.query(insertUserQuery, insertValues, (insertErr, result) => {
          if (insertErr) {
            return db.rollback(() => {
              console.error("Error inserting user:", insertErr);
              return res
                .status(500)
                .json({ status: "Failure", message: "Internal server error" });
            });
          }

          // Commit the transaction
          db.commit((commitErr) => {
            if (commitErr) {
              return db.rollback(() => {
                console.error("Error committing transaction:", commitErr);
                return res.status(500).json({
                  status: "Failure",
                  message: "Internal server error",
                });
              });
            }

            // Respond with success
            res.json({
              message: "User registered successfully",
              status: "Success",
              userId,
              password,
            });
          });
        });
      });
    });
  } catch (err) {
    console.error("Error processing request:", err);
    res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { UserId, password } = req.body;

  if (!UserId || !password) {
    return res.status(400).json({
      status: "Failure",
      message: "User ID and Password are required",
    });
  }

  try {
    const getUserQuery = `SELECT * FROM userprofile WHERE UserId = ?`;

    db.query(getUserQuery, [UserId], async (err, results) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res
          .status(500)
          .json({ status: "Failure", message: "Internal server error" });
      }

      if (results.length === 0) {
        return res
          .status(404)
          .json({ status: "Failure", message: "Invalid user ID or password" });
      }

      const user = results[0];

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ status: "Failure", message: "Invalid user ID or password" });
      }

      const payload = {
        userId: user.UserId,
        role: user.role,
        email: user.Email,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "6h" });

      return res.json({
        status: "Success",
        message: "Login successful",
        token,
        user: {
          userId: user.UserId,
          role: user.role,
          email: user.Email,
        },
      });
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAILSENDER,
    pass: process.env.EMAILPASSWORD,
  },
});

const otpStore = new Map();

const sendOtpEmail = async (email, otp) => {
  try {
    let mailOptions = {
      from: `"Your App Name" <${process.env.EMAILSENDER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
      html: `<b>Your OTP code is: ${otp}</b>`,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const loginUserWithOTP = async (req, res) => {
  const { UserId, password } = req.body;

  if (!UserId || !password) {
    return res.status(400).json({
      status: "Failure",
      message: "User ID and password are required",
    });
  }

  try {
    const getUserQuery = `SELECT * FROM userprofile WHERE UserId = ?`;

    db.query(getUserQuery, [UserId], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ status: "Failure", message: "Internal server error" });
      }

      if (results.length === 0) {
        return res
          .status(404)
          .json({ status: "Failure", message: "User not found" });
      }

      const user = results[0];
      console.log("294", user);

      // Check password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ status: "Failure", message: "Invalid password" });
      }

      // Check if user role requires OTP (only "superadmin" or "retailer" need OTP)
      if (
        user.role === "SuperAdmin" ||
        user.role === "retailer" ||
        user.role === "SuperAdmin_Employee"
      ) {
        const otp = crypto.randomInt(100000, 999999).toString();

        const otpHash = await bcrypt.hash(otp, 10);

        otpStore.set(user.UserId, {
          otpHash,
          expiresAt: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
        });

        try {
          await sendOtpEmail(user.Email, otp);
        } catch (emailError) {
          console.error("Error sending email:", emailError);
          return res
            .status(500)
            .json({ status: "Failure", message: "Failed to send OTP email" });
        }

        return res.status(200).json({
          status: "Success",
          message: "OTP sent to your registered email",
          user: user.role,
        });
      } else {
        // For roles like "whitelabel", "superdistributer", and "distributer", log in directly
        const payload = {
          userId: user.UserId,
          role: user.role,
          email: user.Email,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "6h" });

        return res.json({
          status: "Success",
          message: "Login successful",
          token,
          user: {
            userId: user.UserId,
            role: user.role,
            email: user.Email,
          },
        });
      }
    });
  } catch (error) {
    console.error("Error processing login request:", error);
    return res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

const verifyOtpAndLogin = async (req, res) => {
  const { UserId, otp } = req.body;

  if (!UserId || !otp) {
    return res
      .status(400)
      .json({ status: "Failure", message: "User ID and OTP are required" });
  }

  try {
    // Fetch the user
    const getUserQuery = `SELECT * FROM userprofile WHERE UserId = ?`;

    db.query(getUserQuery, [UserId], async (err, results) => {
      if (err || results.length === 0) {
        return res
          .status(404)
          .json({ status: "Failure", message: "User not found" });
      }

      const user = results[0];
      const otpData = otpStore.get(user.UserId);

      if (!otpData || Date.now() > otpData.expiresAt) {
        return res
          .status(400)
          .json({ status: "Failure", message: "OTP expired or invalid" });
      }

      // Verify the OTP
      const isOtpValid = await bcrypt.compare(otp, otpData.otpHash);

      if (!isOtpValid) {
        return res
          .status(400)
          .json({ status: "Failure", message: "Invalid OTP" });
      }

      // Clear the OTP from store
      otpStore.delete(user.UserId);

      // Generate JWT token
      const payload = {
        userId: user.UserId,
        username: user.UserName,
        role: user.role,
        email: user.Email,
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "6h" });

      // Respond with JWT token
      return res.json({
        status: "Success",
        message: "Login successful",
        token,
        user: {
          userId: user.UserId,
          role: user.role,
          email: user.Email,
          username: user.UserName,
        },
      });
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

const superAdminEmployeeRegiser = async (req, res) => {
  const {
    name,
    contact,
    email,
    panNumber,
    aadhar,
    city,
    state,
    pincode,
    userType,
    password,
  } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const cleanedName = cleanName(name);
  let namePart = cleanedName.slice(0, 4).toUpperCase();

  if (cleanedName.length < 4) {
    namePart = (cleanedName + cleanedName.slice(0, 4))
      .slice(0, 4)
      .toUpperCase();
  }

  const rolePrefix = rolePrefixes[userType];

  try {
    // Check if email or contact already exists
    const checkUserQuery = `SELECT * FROM userprofile WHERE Email = ? OR ContactNo = ?`;
    db.query(checkUserQuery, [email, contact], (err, results) => {
      if (err) {
        console.error("Error checking user existence:", err);
        return res
          .status(500)
          .json({ status: "Failure", message: "Internal server error" });
      }

      if (results.length > 0) {
        return res.status(400).json({
          status: "Failure",
          message: "Email or Contact number already exists",
        });
      }

      // If no existing user found, continue with registration
      db.beginTransaction(async (transactionErr) => {
        if (transactionErr) {
          console.error("Error starting transaction:", transactionErr);
          return res
            .status(500)
            .json({ status: "Failure", message: "Internal server error" });
        }

        const getLastUserIdQuery = `SELECT UserId FROM userprofile WHERE UserId LIKE '${rolePrefix}-%' ORDER BY UserId DESC LIMIT 1`;

        db.query(getLastUserIdQuery, async (err, results) => {
          if (err) {
            console.error("Error fetching latest UserId:", err);
            return res
              .status(500)
              .json({ status: "Failure", message: "Internal server error" });
          }

          let sequenceNumber = 1;
          if (results.length > 0) {
            const lastUserId = results[0].UserId;
            const numericPart = lastUserId.match(/\d+$/);
            if (numericPart) {
              sequenceNumber = parseInt(numericPart[0], 10) + 1;
            }
          }

          const paddingLength = 4;
          const userId = `${rolePrefix}-${namePart}${sequenceNumber
            .toString()
            .padStart(paddingLength, "0")}`;

          const hashedPassword = await bcrypt.hash(password, 10);

          const insertUserQuery = `INSERT INTO userprofile (UserId, password, UserName, role, ContactNo, Email, PanCardNumber, AadharNumber, City, State, PinCode, CreateAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          const insertValues = [
            userId,
            hashedPassword,
            name,
            userType,
            contact,
            email,
            panNumber,
            aadhar,
            city,
            state,
            pincode,
            createdAt,
          ];

          db.query(insertUserQuery, insertValues, (insertErr, result) => {
            if (insertErr) {
              return db.rollback(() => {
                console.error("Error inserting user:", insertErr);
                return res.status(500).json({
                  status: "Failure",
                  message: "Internal server error",
                });
              });
            }

            // Commit the transaction
            db.commit((commitErr) => {
              if (commitErr) {
                return db.rollback(() => {
                  console.error("Error committing transaction:", commitErr);
                  return res.status(500).json({
                    status: "Failure",
                    message: "Internal server error",
                  });
                });
              }

              // Respond with success
              res.json({
                message: "User registered successfully",
                status: "Success",
                userId,
                password,
              });
            });
          });
        });
      });
    });
  } catch (err) {
    console.error("Error processing request:", err);
    res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

module.exports = {
  userRegiser,
  loginUser,
  loginUserWithOTP,
  verifyOtpAndLogin,
  superAdminEmployeeRegiser,
};
