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

// const userRegiser = async (req, res) => {
//   const {
//     UserName,
//     role,
//     ContactNo,
//     Email,
//     PanCardNumber,
//     AadharNumber,
//     BusinessName,
//     City,
//     State,
//     PinCode,
//   } = req.body;

//   if (
//     !UserName ||
//     !role ||
//     !ContactNo ||
//     !Email ||
//     !PanCardNumber ||
//     !AadharNumber ||
//     !BusinessName ||
//     !City ||
//     !State ||
//     !PinCode
//   ) {
//     return res
//       .status(400)
//       .json({ status: "Failure", error: "All fields are required" });
//   }

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const cleanedName = cleanName(UserName);
//   let namePart = cleanedName.slice(0, 4).toUpperCase();

//   if (cleanedName.length < 4) {
//     namePart = (cleanedName + cleanedName.slice(0, 4))
//       .slice(0, 4)
//       .toUpperCase();
//   }

//   const rolePrefix = rolePrefixes[role];

//   try {
//     // Start a transaction to ensure atomicity
//     db.beginTransaction(async (transactionErr) => {
//       if (transactionErr) {
//         console.error("Error starting transaction:", transactionErr);
//         return res
//           .status(500)
//           .json({ status: "Failure", message: "Internal server error" });
//       }

//       const getLastUserIdQuery = `SELECT UserId FROM userprofile WHERE UserId LIKE '${rolePrefix}-%' ORDER BY UserId DESC LIMIT 1`;

//       db.query(getLastUserIdQuery, async (err, results) => {
//         if (err) {
//           console.error("Error fetching latest UserId:", err);
//           return res
//             .status(500)
//             .json({ status: "Failure", message: "Internal server error" });
//         }

//         let sequenceNumber = 1;
//         if (results.length > 0) {
//           const lastUserId = results[0].UserId;
//           const numericPart = lastUserId.match(/\d+$/);
//           if (numericPart) {
//             sequenceNumber = parseInt(numericPart[0], 10) + 1;
//           }
//         }

//         const paddingLength = 4;
//         const userId = `${rolePrefix}-${namePart}${sequenceNumber
//           .toString()
//           .padStart(paddingLength, "0")}`;

//         const password = generatePassword();
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const insertUserQuery = `INSERT INTO userprofile (UserId, password, UserName, role, ContactNo, Email, PanCardNumber, AadharNumber, BusinessName, City, State, PinCode, CreateAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//         const insertValues = [
//           userId,
//           hashedPassword,
//           UserName,
//           role,
//           ContactNo,
//           Email,
//           PanCardNumber,
//           AadharNumber,
//           BusinessName,
//           City,
//           State,
//           PinCode,
//           createdAt,
//         ];

//         db.query(insertUserQuery, insertValues, (insertErr, result) => {
//           if (insertErr) {
//             return db.rollback(() => {
//               console.error("Error inserting user:", insertErr);
//               return res
//                 .status(500)
//                 .json({ status: "Failure", message: "Internal server error" });
//             });
//           }

//           // Commit the transaction
//           db.commit((commitErr) => {
//             if (commitErr) {
//               return db.rollback(() => {
//                 console.error("Error committing transaction:", commitErr);
//                 return res.status(500).json({
//                   status: "Failure",
//                   message: "Internal server error",
//                 });
//               });
//             }

//             // Respond with success
//             res.json({
//               message: "User registered successfully",
//               status: "Success",
//               userId,
//               password,
//             });
//           });
//         });
//       });
//     });
//   } catch (err) {
//     console.error("Error processing request:", err);
//     res
//       .status(500)
//       .json({ status: "Failure", message: "Internal server error" });
//   }
// };

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

        const insertUserQuery = `INSERT INTO userprofile (UserId, password, UserName, role, ContactNo, Email, PanCardNumber, AadharNumber, BusinessName, City, State, PinCode,Status,payment_status,White_Label_Website_URL,created_By_User_Id,
created_By_User_Role,created_By_Website , CreateAt) VALUES (?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?)`;

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
              return res
                .status(500)
                .json({ status: "Failure", message: "Internal server error" });
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

                // Respond with success
                res.json({
                  message: "User registered successfully, email sent",
                  status: "Success",
                  userId,
                  password,
                });
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

// const userRegiser = async (req, res) => {
//   const {
//     UserName,
//     role,
//     ContactNo,
//     Email,
//     PanCardNumber,
//     AadharNumber,
//     BusinessName,
//     City,
//     State,
//     PinCode,
//     Status,
//     payment_status,
//     White_Label_Website_URL,
//     created_By_User_Id,
//     created_By_User_Role,
//     created_By_Website,
//     userId_type, // Added to capture type for updating user IDs
//     number_of_userId, // Added to capture the number of user IDs
//   } = req.body;

//   if (
//     !UserName ||
//     !role ||
//     !ContactNo ||
//     !Email ||
//     !PanCardNumber ||
//     !AadharNumber ||
//     !BusinessName ||
//     !City ||
//     !State ||
//     !PinCode ||
//     !Status ||
//     !payment_status ||
//     !created_By_User_Id ||
//     !created_By_User_Role ||
//     !created_By_Website
//   ) {
//     return res.status(400).json({
//       status: "Failure",
//       error: "All fields are required",
//       message: "All fields are required",
//     });
//   }

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const cleanedName = cleanName(UserName);
//   let namePart = cleanedName.slice(0, 4).toUpperCase();

//   if (cleanedName.length < 4) {
//     namePart = (cleanedName + cleanedName.slice(0, 4))
//       .slice(0, 4)
//       .toUpperCase();
//   }

//   const rolePrefix = rolePrefixes[role];

//   try {
//     db.beginTransaction(async (transactionErr) => {
//       if (transactionErr) {
//         console.error("Error starting transaction:", transactionErr);
//         return res
//           .status(500)
//           .json({ status: "Failure", message: "Internal server error" });
//       }

//       const getLastUserIdQuery = `SELECT UserId FROM userprofile WHERE UserId LIKE '${rolePrefix}-%' ORDER BY UserId DESC LIMIT 1`;

//       db.query(getLastUserIdQuery, async (err, results) => {
//         if (err) {
//           console.error("Error fetching latest UserId:", err);
//           return res
//             .status(500)
//             .json({ status: "Failure", message: "Internal server error" });
//         }

//         let sequenceNumber = 1;
//         if (results.length > 0) {
//           const lastUserId = results[0].UserId;
//           const numericPart = lastUserId.match(/\d+$/);
//           if (numericPart) {
//             sequenceNumber = parseInt(numericPart[0], 10) + 1;
//           }
//         }

//         const paddingLength = 4;
//         const userId = `${rolePrefix}-${namePart}${sequenceNumber
//           .toString()
//           .padStart(paddingLength, "0")}`;

//         const password = generatePassword();
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const insertUserQuery = `INSERT INTO userprofile (UserId, password, UserName, role, ContactNo, Email, PanCardNumber, AadharNumber, BusinessName, City, State, PinCode,Status,payment_status,White_Label_Website_URL,created_By_User_Id,
// created_By_User_Role,created_By_Website , CreateAt) VALUES (?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?)`;

//         const insertValues = [
//           userId,
//           hashedPassword,
//           UserName,
//           role,
//           ContactNo,
//           Email,
//           PanCardNumber,
//           AadharNumber,
//           BusinessName,
//           City,
//           State,
//           PinCode,
//           Status,
//           payment_status,
//           White_Label_Website_URL,
//           created_By_User_Id,
//           created_By_User_Role,
//           created_By_Website,
//           createdAt,
//         ];

//         db.query(insertUserQuery, insertValues, (insertErr, result) => {
//           if (insertErr) {
//             return db.rollback(() => {
//               console.error("Error inserting user:", insertErr);
//               return res
//                 .status(500)
//                 .json({ status: "Failure", message: "Internal server error" });
//             });
//           }

//           // Update user profile with additional user IDs after
//           const updateQuery = `
//           UPDATE userprofile
//           SET
//             remaining_whitelable_id = CASE WHEN ? = 'whiteLabel' THEN remaining_whitelable_id - 1 ELSE remaining_whitelable_id END,
//             remaining_superDistributor_id = CASE WHEN ? = 'superDistributor' THEN remaining_superDistributor_id - 1 ELSE remaining_superDistributor_id END,
//             remaining_distributor_id = CASE WHEN ? = 'distributor' THEN remaining_distributor_id - 1 ELSE remaining_distributor_id END,
//             remaining_retailer_id = CASE WHEN ? = 'retailer' THEN remaining_retailer_id - 1 ELSE remaining_retailer_id END
//           WHERE userId = ?
//         `;

//           const updateParams = [
//             userId_type,
//             number_of_userId,
//             userId_type,
//             number_of_userId,
//             userId_type,
//             number_of_userId,
//             userId_type,
//             number_of_userId,
//             userId,
//           ];

//           db.query(updateQuery, updateParams, (updateErr, updateResult) => {
//             if (updateErr) {
//               return db.rollback(() => {
//                 console.error("Error updating user profile:", updateErr);
//                 return res
//                   .status(500)
//                   .json({ message: "Failed to update user profile." });
//               });
//             }

//             // Log the new credentials and send email
//             const logQuery = `INSERT INTO user_credentials (userId, password, created_at) VALUES (?, ?, ?)`;
//             const logValues = [userId, password, createdAt];

//             db.query(logQuery, logValues, (logErr, logResult) => {
//               if (logErr) {
//                 return db.rollback(() => {
//                   console.error("Error logging credentials:", logErr);
//                   return res.status(500).json({
//                     status: "Failure",
//                     message: "Internal server error",
//                   });
//                 });
//               }

//               // Commit transaction and send email
//               db.commit((commitErr) => {
//                 if (commitErr) {
//                   return db.rollback(() => {
//                     console.error("Error committing transaction:", commitErr);
//                     return res.status(500).json({
//                       status: "Failure",
//                       message: "Internal server error",
//                     });
//                   });
//                 }

//                 const transporter = nodemailer.createTransport({
//                   service: "gmail",
//                   auth: {
//                     user: process.env.EMAILSENDER,
//                     pass: process.env.EMAILPASSWORD,
//                   },
//                 });

//                 const mailOptions = {
//                   from: process.env.EMAILSENDER,
//                   to: Email,
//                   subject: "Your Account Details",
//                   html: `
//                   <p>Hello ${UserName},</p>
//                   <p>Your account has been successfully created.</p>
//                   <p>User ID: <span style="color: #333333; font-weight: bold;">${userId}</span></p>
//                   <p>Password: <span style="color: #333333; font-weight: bold;">${password}</span></p>
//                   <p>Please keep this information secure.</p>
//                   <p>Please log in using this ID and password, and complete the KYC process to activate your account.</p>
//                   <br>
//                   <p>Regards,<br>Bitspan.com</p>
//                 `,
//                 };

//                 transporter.sendMail(mailOptions, (emailErr, info) => {
//                   if (emailErr) {
//                     console.error("Error sending email:", emailErr);
//                     return res.status(500).json({
//                       status: "Failure",
//                       message: "Internal server error",
//                     });
//                   }

//                   // Respond with success
//                   res.json({
//                     message: "User registered successfully, email sent",
//                     status: "Success",
//                     userId,
//                     password,
//                   });
//                 });
//               });
//             });
//           });
//         });
//       });
//     });
//   } catch (err) {
//     console.error("Error processing request:", err);
//     res
//       .status(500)
//       .json({ status: "Failure", message: "Internal server error" });
//   }
// };

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
    status,
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

          const insertUserQuery = `INSERT INTO userprofile (UserId, password, UserName, role, ContactNo, Email, PanCardNumber, AadharNumber, City, State, PinCode, Status, CreateAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;

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
            status,
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

              // Send Email on Success
              const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "User Registration Successful",
                html: `
                  <h3>Welcome to Our Platform!</h3>
                  <p>Your registration was successful. Here are your login details:</p>
                  <p><strong>User ID:</strong> <span style="color: #333;">${userId}</span></p>
                  <p><strong>Password:</strong> <span style="color: #333;">${password}</span></p>
                  <p>Please keep this information secure. Use these credentials to log in.</p>
                `,
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error("Error sending email:", error);
                  return res.status(500).json({
                    status: "Failure",
                    message: "User registered, but failed to send email",
                  });
                }

                // Respond with success
                res.json({
                  message: "User registered successfully and email sent",
                  status: "Success",
                  userId,
                  password,
                });
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

// const superAdminEmployeeRegiser = async (req, res) => {
//   const {
//     name,
//     contact,
//     email,
//     panNumber,
//     aadhar,
//     city,
//     state,
//     pincode,
//     userType,
//     password,
//     status,
//   } = req.body;

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const cleanedName = cleanName(name);
//   let namePart = cleanedName.slice(0, 4).toUpperCase();

//   if (cleanedName.length < 4) {
//     namePart = (cleanedName + cleanedName.slice(0, 4))
//       .slice(0, 4)
//       .toUpperCase();
//   }

//   const rolePrefix = rolePrefixes[userType];

//   try {
//     // Check if email or contact already exists
//     const checkUserQuery = `SELECT * FROM userprofile WHERE Email = ? OR ContactNo = ?`;
//     db.query(checkUserQuery, [email, contact], (err, results) => {
//       if (err) {
//         console.error("Error checking user existence:", err);
//         return res
//           .status(500)
//           .json({ status: "Failure", message: "Internal server error" });
//       }

//       if (results.length > 0) {
//         return res.status(400).json({
//           status: "Failure",
//           message: "Email or Contact number already exists",
//         });
//       }

//       // If no existing user found, continue with registration
//       db.beginTransaction(async (transactionErr) => {
//         if (transactionErr) {
//           console.error("Error starting transaction:", transactionErr);
//           return res
//             .status(500)
//             .json({ status: "Failure", message: "Internal server error" });
//         }

//         const getLastUserIdQuery = `SELECT UserId FROM userprofile WHERE UserId LIKE '${rolePrefix}-%' ORDER BY UserId DESC LIMIT 1`;

//         db.query(getLastUserIdQuery, async (err, results) => {
//           if (err) {
//             console.error("Error fetching latest UserId:", err);
//             return res
//               .status(500)
//               .json({ status: "Failure", message: "Internal server error" });
//           }

//           let sequenceNumber = 1;
//           if (results.length > 0) {
//             const lastUserId = results[0].UserId;
//             const numericPart = lastUserId.match(/\d+$/);
//             if (numericPart) {
//               sequenceNumber = parseInt(numericPart[0], 10) + 1;
//             }
//           }

//           const paddingLength = 4;
//           const userId = `${rolePrefix}-${namePart}${sequenceNumber
//             .toString()
//             .padStart(paddingLength, "0")}`;

//           const hashedPassword = await bcrypt.hash(password, 10);

//           const insertUserQuery = `INSERT INTO userprofile (UserId, password, UserName, role, ContactNo, Email, PanCardNumber, AadharNumber, City, State, PinCode, Status, CreateAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)`;

//           const insertValues = [
//             userId,
//             hashedPassword,
//             name,
//             userType,
//             contact,
//             email,
//             panNumber,
//             aadhar,
//             city,
//             state,
//             pincode,
//             status,
//             createdAt,
//           ];

//           db.query(insertUserQuery, insertValues, (insertErr, result) => {
//             if (insertErr) {
//               return db.rollback(() => {
//                 console.error("Error inserting user:", insertErr);
//                 return res.status(500).json({
//                   status: "Failure",
//                   message: "Internal server error",
//                 });
//               });
//             }

//             // Commit the transaction
//             db.commit((commitErr) => {
//               if (commitErr) {
//                 return db.rollback(() => {
//                   console.error("Error committing transaction:", commitErr);
//                   return res.status(500).json({
//                     status: "Failure",
//                     message: "Internal server error",
//                   });
//                 });
//               }

//               // Respond with success
//               res.json({
//                 message: "User registered successfully",
//                 status: "Success",
//                 userId,
//                 password,
//               });
//             });
//           });
//         });
//       });
//     });
//   } catch (err) {
//     console.error("Error processing request:", err);
//     res
//       .status(500)
//       .json({ status: "Failure", message: "Internal server error" });
//   }
// };

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
  service: "gmail",
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

      // Check password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ status: "Failure", message: "Invalid password" });
      }

      // Check if user role requires OTP (only "superadmin" or "retailer" need OTP)
      if (user.role === "superadmin" || user.role === "retailer") {
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
        });
      } else {
        // For roles like "whitelabel", "superdistributer", and "distributer", log in directly
        const payload = {
          userId: user.UserId,
          role: user.role,
          email: user.Email,
          username: user.UserName,
          Status: user.Status,
          ContactNo: user.ContactNo,
          PanCardNumber: user.PanCardNumber,
          AadharNumber: user.AadharNumber,
          BusinessName: user.BusinessName,
          City: user.City,
          State: user.State,
          PinCode: user.PinCode,
          package_Id: user.package_Id,
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
            username: user.UserName,
            Status: user.Status,
            ContactNo: user.ContactNo,
            PanCardNumber: user.PanCardNumber,
            AadharNumber: user.AadharNumber,
            BusinessName: user.BusinessName,
            City: user.City,
            State: user.State,
            PinCode: user.PinCode,
            package_Id: user.package_Id,
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
        Status: user.Status,
        ContactNo: user.ContactNo,
        PanCardNumber: user.PanCardNumber,
        AadharNumber: user.AadharNumber,
        BusinessName: user.BusinessName,
        City: user.City,
        State: user.State,
        PinCode: user.PinCode,
        package_Id: user.package_Id,
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
          Status: user.Status,
          ContactNo: user.ContactNo,
          PanCardNumber: user.PanCardNumber,
          AadharNumber: user.AadharNumber,
          BusinessName: user.BusinessName,
          City: user.City,
          State: user.State,
          PinCode: user.PinCode,
          package_Id: user.package_Id,
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

const forgototpStore = new Map();

const passwordOtpEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"Your Password OTP" <${process.env.EMAILSENDER}>`,
      to: email,
      subject: "Password Reset OTP",
      text: `Your password reset OTP code is: ${otp}`,
      html: `<b>Your password reset OTP code is: ${otp}</b>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// *****This API is working Fine But for Email*****
// const forgotPassword = async (req, res) => {
//   const { Email } = req.body;

//   if (!Email) {
//     return res
//       .status(400)
//       .json({ status: "Failure", message: "Email is required" });
//   }

//   try {
//     const getUserQuery = `SELECT * FROM userprofile WHERE Email = ?`;

//     db.query(getUserQuery, [Email], async (err, result) => {
//       if (err || result.length === 0) {
//         return res
//           .status(400)
//           .json({ status: "Failure", message: "User not found" });
//       }
//       const user = result[0];
//       const otp = crypto.randomInt(100000, 999999).toString();

//       // Fix: Await the bcrypt.hash function
//       const otpHash = await bcrypt.hash(otp, 10);

//       forgototpStore.set(user.UserId, {
//         otpHash,
//         expiresAt: Date.now() + 5 * 60 * 1000,
//       });

//       // Send the OTP via email
//       passwordOtpEmail(user.Email, otp);

//       return res
//         .status(200)
//         .json({ status: "Success", message: "OTP sent to your email" });
//     });
//   } catch (error) {
//     console.error("Error processing forgot password request:", error);
//     return res
//       .status(500)
//       .json({ status: "Failure", message: "Internal server error" });
//   }
// };
// *****This API is working Fine But for Email*****

const forgotPassword = async (req, res) => {
  const { UserId } = req.body;

  if (!UserId) {
    return res
      .status(400)
      .json({ status: "Failure", message: "UserId is required" });
  }

  try {
    const getUserQuery = `SELECT * FROM userprofile WHERE UserId = ?`;

    db.query(getUserQuery, [UserId], async (err, result) => {
      if (err || result.length === 0) {
        return res
          .status(400)
          .json({ status: "Failure", message: "User not found" });
      }
      const user = result[0];
      const otp = crypto.randomInt(100000, 999999).toString();

      // Hash the OTP
      const otpHash = await bcrypt.hash(otp, 10);

      forgototpStore.set(user.UserId, {
        otpHash,
        expiresAt: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
      });

      // Send the OTP via email to the fetched email
      passwordOtpEmail(user.Email, otp);

      return res
        .status(200)
        .json({ status: "Success", message: `OTP sent to ${user.Email}` });
    });
  } catch (error) {
    console.error("Error processing forgot password request:", error);
    return res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

const verifyOtpAndResetPassword = async (req, res) => {
  const { UserId, otp, newPassword } = req.body;

  if (!UserId || !otp || !newPassword) {
    return res.status(400).json({
      status: "Failure",
      message: "UserId, OTP, and new password are required",
    });
  }

  try {
    const getUserQuery = `SELECT * FROM userprofile WHERE UserId = ?`;
    db.query(getUserQuery, [UserId], async (err, results) => {
      if (err || results.length === 0) {
        return res
          .status(404)
          .json({ status: "Failure", message: "User not found" });
      }

      const user = results[0];
      const otpData = forgototpStore.get(user.UserId);

      if (!otpData || Date.now() > otpData.expiresAt) {
        return res
          .status(400)
          .json({ status: "Failure", message: "OTP expired or invalid" });
      }

      console.log("OTP Provided:", otp);
      console.log("Stored OTP Hash:", otpData.otpHash);

      // Ensure OTP comparison
      const isOtpValid = await bcrypt.compare(otp.toString(), otpData.otpHash);
      console.log("OTP Valid:", isOtpValid);
      if (!isOtpValid) {
        return res
          .status(400)
          .json({ status: "Failure", message: "Invalid OTP" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the password in the database
      const updatePasswordQuery = `UPDATE userprofile SET password = ? WHERE UserId = ?`;
      db.query(updatePasswordQuery, [hashedPassword, UserId], (updateErr) => {
        if (updateErr) {
          console.error("Error updating password:", updateErr);
          return res
            .status(500)
            .json({ status: "Failure", message: "Failed to reset password" });
        }

        // Clear the OTP from the store after successful reset
        forgototpStore.delete(user.UserId);

        return res
          .status(200)
          .json({ status: "Success", message: "Password reset successful" });
      });
    });
  } catch (error) {
    console.error("Error processing password reset:", error);
    return res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

const changePasswordRequest = async (req, res) => {
  const { UserId, oldPassword, newPassword } = req.body;

  if (!UserId || !oldPassword || !newPassword) {
    return res.status(400).json({
      status: "Failure",
      message: "UserId, old password, and new password are required",
    });
  }

  try {
    // Fetch the user based on UserId
    const getUserQuery = `SELECT * FROM userprofile WHERE UserId = ?`;
    db.query(getUserQuery, [UserId], async (err, results) => {
      if (err || results.length === 0) {
        return res
          .status(404)
          .json({ status: "Failure", message: "User not found" });
      }

      const user = results[0];
      const isOldPasswordValid = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isOldPasswordValid) {
        return res.status(400).json({
          status: "Failure",
          message: "Old password is incorrect",
        });
      }

      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();
      const otpHash = await bcrypt.hash(otp, 10); // Hash the OTP

      // Store OTP hash and expiration time in the store
      forgototpStore.set(user.UserId, {
        otpHash,
        newPassword,
        expiresAt: Date.now() + 5 * 60 * 1000,
      });

      // Send OTP to the user's email
      await passwordOtpEmail(user.Email, otp);

      return res.status(200).json({
        status: "Success",
        message: "OTP sent to your email. Please verify it.",
      });
    });
  } catch (error) {
    console.error("Error processing change password request:", error);
    return res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

const verifyOtpAndChangePassword = async (req, res) => {
  const { UserId, otp } = req.body;

  if (!UserId || !otp) {
    return res.status(400).json({
      status: "Failure",
      message: "UserId and OTP are required",
    });
  }

  try {
    const otpData = forgototpStore.get(UserId);

    if (!otpData || Date.now() > otpData.expiresAt) {
      return res.status(400).json({
        status: "Failure",
        message: "OTP expired or invalid",
      });
    }

    // Compare the provided OTP with the hashed OTP
    const isOtpValid = await bcrypt.compare(otp.toString(), otpData.otpHash);
    if (!isOtpValid) {
      return res.status(400).json({
        status: "Failure",
        message: "Invalid OTP",
      });
    }

    console.log("Stored OTP Hash:", otpData.otpHash);
    console.log("Provided OTP:", otp.toString());
    console.log("New password to be changed:", otpData.newPassword);

    // Hash the new password and update it in the database
    const hashedPassword = await bcrypt.hash(otpData.newPassword, 10);
    const updatePasswordQuery = `UPDATE userprofile SET password = ? WHERE UserId = ?`;

    db.query(updatePasswordQuery, [hashedPassword, UserId], (updateErr) => {
      if (updateErr) {
        console.error("Error updating password:", updateErr);
        return res
          .status(500)
          .json({ status: "Failure", message: "Failed to change password" });
      }

      // Clear OTP data from the store after password reset
      forgototpStore.delete(UserId);

      return res.status(200).json({
        status: "Success",
        message: "Password changed successfully",
      });
    });
  } catch (error) {
    console.error("Error processing OTP verification:", error);
    return res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

// API For Pin Generate, Update, Validate

const userPinGenerate = (req, res) => {
  const { user_id, pin } = req.body;

  // Validate input
  if (!user_id || !pin) {
    return res
      .status(400)
      .json({ status: "Failure", message: "All fields are required" });
  }

  try {
    // Check if a PIN already exists for the user
    const checkUserQuery = "SELECT * FROM user_pins WHERE user_id = ?";

    db.query(checkUserQuery, [user_id], (err, rows) => {
      if (err) {
        console.error("Error checking user PIN:", err);
        return res
          .status(500)
          .json({ status: "Failure", message: "Internal server error" });
      }

      // Check if the user has an existing PIN
      if (rows.length > 0) {
        // Update existing PIN
        db.query(
          "UPDATE user_pins SET pin = ?, updated_at = NOW() WHERE user_id = ?",
          [pin, user_id],
          (updateErr) => {
            if (updateErr) {
              console.error("Error updating PIN:", updateErr);
              return res
                .status(500)
                .json({ status: "Failure", message: "Internal server error" });
            }
            return res.json({
              status: "Success",
              message: "PIN updated successfully.",
            });
          }
        );
      } else {
        // Insert new PIN
        db.query(
          "INSERT INTO user_pins (user_id, pin) VALUES (?, ?)",
          [user_id, pin],
          (insertErr) => {
            if (insertErr) {
              console.error("Error creating PIN:", insertErr);
              return res
                .status(500)
                .json({ status: "Failure", message: "Internal server error" });
            }
            return res.json({
              status: "Success",
              message: "PIN created successfully.",
            });
          }
        );
      }
    });
  } catch (error) {
    console.error("Error generating PIN:", error);
    return res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

const createPin = (req, res) => {
  const { user_id, pin } = req.body;

  // Validate input
  if (!user_id || !pin) {
    return res
      .status(400)
      .json({ status: "Failure", message: "All fields are required" });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  // Check if the user already has a PIN
  const checkUserQuery = "SELECT * FROM user_pins WHERE user_id = ?";

  db.query(checkUserQuery, [user_id], (err, rows) => {
    if (err) {
      console.error("Error checking user PIN:", err);
      return res
        .status(500)
        .json({ status: "Failure", message: "Internal server error" });
    }

    // If user exists, return a message indicating the PIN already exists
    if (rows.length > 0) {
      return res.status(409).json({
        status: "Failure",
        message: "PIN already created for this user.",
      });
    } else {
      // If user does not exist, proceed to create the PIN
      const insertQuery =
        "INSERT INTO user_pins (user_id, pin, created_at) VALUES (?, ?, ?)";
      db.query(insertQuery, [user_id, pin, createdAt], (insertErr) => {
        if (insertErr) {
          console.error("Error creating PIN:", insertErr);
          return res
            .status(500)
            .json({ status: "Failure", message: "Internal server error" });
        }
        return res.json({
          status: "Success",
          message: "PIN created successfully.",
        });
      });
    }
  });
};

const sendOtpEmailPin = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAILSENDER,
      pass: process.env.EMAILPASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Changing PIN",
    text: `Your OTP for changing your PIN is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

const otpStorage = new Map();

const requestOtpForPinChange = (req, res) => {
  const { user_id, new_pin, email } = req.body;

  if (!user_id || !new_pin || !email) {
    return res.status(400).json({
      status: "Failure",
      message: "User ID, new PIN, and email are required",
    });
  }

  // Generate a 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStorage.set(user_id, {
    otp,
    new_pin,
    email,
    expiresAt: Date.now() + 300000,
  }); // Expires in 5 minutes

  sendOtpEmailPin(email, otp)
    .then(() => {
      return res.json({
        status: "Success",
        message: "OTP sent to your email.",
      });
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
      return res
        .status(500)
        .json({ status: "Failure", message: "Failed to send OTP." });
    });
};

const verifyOtp = (req, res) => {
  const { user_id, otp } = req.body;

  if (!user_id || !otp) {
    return res
      .status(400)
      .json({ status: "Failure", message: "User ID and OTP are required" });
  }

  const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const storedOtpData = otpStorage.get(user_id);

  if (!storedOtpData) {
    return res
      .status(400)
      .json({ status: "Failure", message: "OTP not generated or expired" });
  }

  if (storedOtpData.otp !== otp || Date.now() > storedOtpData.expiresAt) {
    return res
      .status(400)
      .json({ status: "Failure", message: "Invalid or expired OTP" });
  }

  // OTP is valid, proceed to change the PIN
  otpStorage.delete(user_id); // Clear OTP after verification
  const { new_pin } = storedOtpData;

  const query =
    "UPDATE user_pins SET pin = ?, updated_at = ? WHERE user_id = ?";

  db.query(query, [new_pin, updatedAt, user_id], (err) => {
    if (err) {
      console.error("Error changing PIN:", err);
      return res
        .status(500)
        .json({ status: "Failure", message: "Internal server error" });
    }
    return res.json({
      status: "Success",
      message: "PIN changed successfully.",
    });
  });
};

const getUserId = (req, res) => {
  const { user_id } = req.query;
  // console.log(user_id);

  if (!user_id) {
    return res
      .status(400)
      .json({ status: "Failure", message: "User ID is required" });
  }
  const query = "SELECT * FROM user_pins WHERE user_id = ?";
  db.query(query, [user_id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ status: "Failure", message: "Database Error", error: err });
    }

    if (results.length > 0) {
      return res.status(200).json({ exits: true, message: "User Found" });
    } else {
      return res.status(404).json({ exits: false, message: "User Not Found" });
    }
  });
};

const verifyPin = (req, res) => {
  const { user_id, pin } = req.body;

  // Query the database for the user by user_id
  const query = "SELECT pin FROM user_pins WHERE user_id = ?";

  db.query(query, [user_id], (error, results) => {
    if (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (results.length === 0) {
      // No user found with this user_id
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the provided pin matches the stored pin
    const storedPin = results[0].pin;
    if (storedPin === pin) {
      return res.status(200).json({ success: true, message: "PIN verified" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid PIN" });
    }
  });
};

module.exports = {
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
};

// const verifyOtpAndResetPassword = async (req, res) => {
//   const { UserId, otp, newPassword } = req.body;

//   if (!UserId || !otp || !newPassword) {
//     return res
//       .status(400)
//       .json({
//         status: "Failure",
//         message: "UserId, OTP, and new password are required",
//       });
//   }

//   try {
//     const getUserQuery = `SELECT * FROM userprofile WHERE UserId = ?`;
//     db.query(getUserQuery, [UserId], async (err, results) => {
//       if (err || results.length === 0) {
//         return res
//           .status(404)
//           .json({ status: "Failure", message: "User not found" });
//       }

//       const user = results[0];
//       const otpData = otpStore.get(user.UserId);

//       // Check if OTP is valid and not expired
//       if (!otpData || Date.now() > otpData.expiresAt) {
//         return res
//           .status(400)
//           .json({ status: "Failure", message: "OTP expired or invalid" });
//       }

//       // Verify the OTP
//       const isOtpValid = await bcrypt.compare(otp, otpData.otpHash);
//       if (!isOtpValid) {
//         return res
//           .status(400)
//           .json({ status: "Failure", message: "Invalid OTP" });
//       }

//       // OTP is valid, reset the password
//       const hashedPassword = await bcrypt.hash(newPassword, 10);

//       // Update the password in the database
//       const updatePasswordQuery = `UPDATE userprofile SET password = ? WHERE UserId = ?`;
//       db.query(updatePasswordQuery, [hashedPassword, UserId], (updateErr) => {
//         if (updateErr) {
//           return res
//             .status(500)
//             .json({ status: "Failure", message: "Failed to reset password" });
//         }

//         // Clear the OTP from store after successful reset
//         otpStore.delete(user.UserId);

//         return res
//           .status(200)
//           .json({ status: "Success", message: "Password reset successful" });
//       });
//     });
//   } catch (error) {
//     console.error("Error processing password reset:", error);
//     return res
//       .status(500)
//       .json({ status: "Failure", message: "Internal server error" });
//   }
// };

// --------------------------------------

// const generateAndStoreOtp = async (UserId, otp) => {
//   try {
//     // Hash the OTP and ensure it is awaited
//     const otpHash = await bcrypt.hash(otp.toString(), 10); // Await the hash generation
//     forgototpStore.set(UserId, {
//       otpHash,
//       expiresAt: Date.now() + 10 * 60 * 1000, // Set an expiration time for the OTP (e.g., 10 minutes)
//     });
//   } catch (error) {
//     console.error("Error generating OTP hash:", error);
//   }
// };
// --------------------------------------

// // const forgotPassword = async (req, res) => {
//   const { Email } = req.body;

//   if (!Email) {
//     return res
//       .status(400)
//       .json({ status: "Failure", message: "Email is required" });
//   }

//   try {
//     const getUserQuery = `SELECT * FROM userprofile WHERE Email = ?`;

//     db.query(getUserQuery, [Email], (err, result) => {
//       if (err || result.length === 0) {
//         return res
//           .status(400)
//           .json({ status: "Failure", message: "user not found" });
//       }
//       const user = result[0];
//       const otp = crypto.randomInt(100000, 999999).toString();
//       const otpHash = bcrypt.hash(otp, 10);

//       forgototpStore.set(user.UserId, {
//         otpHash,
//         expiresAt: Date.now() + 5 * 60 * 1000,
//       });

//       passwordOtpEmail(user.Email, otp);

//       return res
//         .status(200)
//         .json({ status: "Success", message: "OTP sent to your email" });
//     });
//   } catch (error) {
//     console.error("Error processing forgot password request:", error);
//     return res
//       .status(500)
//       .json({ status: "Failure", message: "Internal server error" });
//   }
// };
