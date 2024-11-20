const { db } = require("../../connect");
const moment = require("moment-timezone");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { error } = require("console");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const rolePrefixes = {
  SuperAdmin: "SA",
  WhiteLabel: "WL",
  SuperDistributor: "SD",
  Distributor: "DT",
  Retailer: "RT",
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

const userRegisterDumy = async (req, res) => {
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
    Status,
    payment_status,
    White_Label_Website_URL,
    created_By_User_Id,
    created_By_User_Role,
    created_By_Website,
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
    !PinCode ||
    !Status ||
    !payment_status ||
    !created_By_User_Id ||
    !created_By_User_Role ||
    !created_By_Website
  ) {
    return res.status(400).json({
      status: "Failure",
      error: "All fields are required",
      message: "All fields are required",
    });
  }

  try {
    // Generate UserId first
    // const cleanedName = cleanName(UserName);
    const cleanName = (name) => {
      return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    };
    // let namePart = cleanedName.slice(0, 4).toUpperCase();
    // if (cleanedName.length < 4) {
    //   namePart = (cleanedName + cleanedName.slice(0, 4))
    //     .slice(0, 4)
    //     .toUpperCase();
    // }
    let namePart = cleanName(UserName).slice(0, 4);
    if (namePart.length < 4) {
      namePart = (namePart + namePart.slice(0, 4)).slice(0, 4);
    }

    const rolePrefix = rolePrefixes[role];
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
        // const numericPart = lastUserId.match(/\d+$/);
        // if (numericPart) {
        //   sequenceNumber = parseInt(numericPart[0], 10) + 1;
        // }
        const numericPart = lastUserId.replace(
          new RegExp(`^${rolePrefix}-${namePart}`),
          ""
        );
        if (/^\d+$/.test(numericPart)) {
          sequenceNumber = parseInt(numericPart, 10) + 1;
        }
      }

      const paddingLength = 4;

      const shortTimestamp = Date.now().toString().slice(-7);
      const userId = `${rolePrefix}-${namePart}${shortTimestamp}`;

      // Perform duplicate check with UserId
      const duplicateCheckQuery = `
              SELECT * FROM userprofile 
              WHERE Email = ? OR ContactNo = ? OR UserId = ?`;
      const duplicateCheckValues = [Email, ContactNo, userId];

      db.query(
        duplicateCheckQuery,
        duplicateCheckValues,
        async (dupErr, dupResults) => {
          if (dupErr) {
            console.error("Error checking for duplicates:", dupErr);
            return res
              .status(500)
              .json({ status: "Failure", message: "Internal server error" });
          }

          if (dupResults.length > 0) {
            return res.status(400).json({
              status: "Failure",
              message:
                "A user with the same Email, Contact Number, or User ID already exists.",
            });
          }

          // Proceed with user registration
          const createdAt = moment()
            .tz("Asia/Kolkata")
            .format("YYYY-MM-DD HH:mm:ss");
          const password = generatePassword();
          const hashedPassword = await bcrypt.hash(password, 10);

          const insertUserQuery = `INSERT INTO userprofile (UserId, password, UserName, role, ContactNo, Email, PanCardNumber, AadharNumber, BusinessName, City, State, PinCode, Status, payment_status, White_Label_Website_URL, created_By_User_Id, created_By_User_Role, created_By_Website, CreateAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
            Status,
            payment_status,
            White_Label_Website_URL,
            created_By_User_Id,
            created_By_User_Role,
            created_By_Website,
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

            // Insert userId and password into the credentials log table
            const logQuery = `INSERT INTO user_credentials (userId, password, created_at) VALUES (?, ?, ?)`;
            const logValues = [userId, password, createdAt];

            db.query(logQuery, logValues, (logErr, logResult) => {
              if (logErr) {
                return db.rollback(() => {
                  console.error("Error logging credentials:", logErr);
                  return res.status(500).json({
                    status: "Failure",
                    message: "Internal server error",
                  });
                });
              }

              // Commit transaction and send response
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

                const transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                    user: process.env.EMAILSENDER,
                    pass: process.env.EMAILPASSWORD,
                  },
                });

                const mailOptions = {
                  from: process.env.EMAILSENDER,
                  to: Email,
                  subject: "Your Account Details",
                  html: `
                                     <p>Hello ${UserName},</p>
                                     <p>Your account has been successfully created.</p>
                                     <p>User ID: <span style="color: #333333; font-weight: bold;">${userId}</span></p>
                                     <p>Password: <span style="color: #333333; font-weight: bold;">${password}</span></p>
                                     <p>Please keep this information secure.</p>
                                     <p>Please log in using this ID and password, and complete the KYC process to activate your account.</p>
                                     <br>
                                     <p>Regards,<br>Bitspan.com</p>
                                   `,
                  // text: `Hello ${UserName},\n\nYour account has been successfully created.\n\nUser ID: ${userId}\nPassword: ${password}\n\nPlease keep this information secure.\n\nPlease login using this ID and password, and complete the KYC process to activate your account.\n\nRegards,\nBitspan.com`,
                };

                transporter.sendMail(mailOptions, (emailErr, info) => {
                  if (emailErr) {
                    console.error("Error sending email:", emailErr);
                    return res.status(500).json({
                      status: "Failure",
                      message: "Internal server error",
                    });
                  }

                  res.json({
                    message: "User registered successfully",
                    status: "Success",
                    userId,
                  });
                });
              });
            });
          });
        }
      );
    });
  } catch (err) {
    console.error("Error processing request:", err);
    res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

module.exports = { userRegisterDumy };
