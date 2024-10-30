const moment = require("moment-timezone");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { NONAME } = require("dns");
const { db } = require("../../connect");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

const getSuperDistributorUserList = (req, res) => {
  try {
    const selectQuery =
      "SELECT * FROM user_relations WHERE superDistributor IS NOT NULL";
    db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllOtherOfflineFormDetails = (req, res) => {
  try {
    const userId = req.params.userId;
    const selectQuery = "SELECT * FROM apply_offline_form WHERE LoginID = ?";
    db.query(selectQuery, userId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getPanCardOfflineFormDetails = (req, res) => {
  try {
    const userId = req.params.userId;
    const selectQuery = "SELECT * FROM pan_offline WHERE LoginID = ?";
    db.query(selectQuery, userId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getRechargeOfflineFormDetails = (req, res) => {
  try {
    const userId = req.params.userId;
    const selectQuery =
      "SELECT * FROM offline_recharge WHERE created_by_userid = ?";
    db.query(selectQuery, userId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getDTHConnectionOfflineFormDetails = (req, res) => {
  try {
    const userId = req.params.userId;
    const selectQuery =
      "SELECT * FROM offline_dth_connection WHERE user_id = ?";
    db.query(selectQuery, userId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateTwoStepPin = (req, res) => {
  try {
    const userId = req.params.userId;
    const pin = req.body.pin;
    const selectQuery = "SELECT * FROM userprofile WHERE UserId = ?";
    db.query(selectQuery, [userId], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Database error: " + err.message });
      }

      if (result && result.length > 0) {
        const updateQuery =
          "UPDATE userprofile SET twostep_pin = ? WHERE UserId = ?";
        db.query(updateQuery, [pin, userId], (err, updateResult) => {
          if (err) {
            return res.status(400).json({
              success: false,
              message: "Update failed: " + err.message,
            });
          }

          if (updateResult.affectedRows === 0) {
            return res.status(400).json({
              success: false,
              message: "Update failed. No rows affected.",
            });
          }

          return res.status(200).json({
            success: true,
            message: "TwoStepPin updated successfully",
          });
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
};

const getAllUserSuperDist = (req, res) => {
  try {
    const userId = req.params.userId;
    const selectQuery =
      "SELECT * FROM userprofile WHERE created_By_User_Id = ?";
    db.query(selectQuery, userId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const makeComplaints = (req, res) => {
  const { complainType, transactionNo, mobileNo, remark, userID, status } =
    req.body;
  const attachment = req.file;
  const attachmentUrl = `http://localhost:${PORT}/complainUpload/attachment/${attachment.filename}`;
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const insertQuery = `INSERT INTO complaindata (complainType, transactionNo, mobileNo, remark, complainFile, userID, status, createdAt	) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    insertQuery,
    [
      complainType,
      transactionNo,
      mobileNo,
      remark,
      attachmentUrl,
      userID,
      status,
      createdAt,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      return res
        .status(200)
        .json({ success: true, message: "Complaints created successfully" });
    }
  );
};

const getAllComplaintsById = (req, res) => {
  try {
    const userId = req.params.userId;
    const selectQuery = "SELECT * FROM complaindata WHERE userID = ?";
    db.query(selectQuery, userId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const changePasswordSuperDist = (req, res) => {
  try {
    const userId = req.params.userId;
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword, newPassword);

    const selectQuery = "SELECT * FROM userprofile WHERE UserId = ?";
    db.query(selectQuery, userId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      if (result && result.length > 0) {
        const storedPassword = result[0]?.password;
        console.log(storedPassword);

        const match = bcrypt.compareSync(oldPassword, storedPassword);
        if (match) {
          const hashedPassword = bcrypt.hashSync(newPassword, 10);
          const updateQuery =
            "UPDATE userprofile SET password = ? WHERE UserId = ?";
          db.query(
            updateQuery,
            [hashedPassword, userId],
            (err, updateResult) => {
              if (err) {
                res.status(400).json({ success: false, message: err.message });
              }
              if (updateResult.affectedRows === 0) {
                res.status(400).json({
                  success: false,
                  message: "Update failed. No rows affected.",
                });
              }
              res.status(200).json({
                success: true,
                message: "Password updated successfully",
              });
            }
          );
        } else {
          res.status(400).json({
            success: false,
            message: "Old password does not match",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getUserDetails = (req, res) => {
  try {
    const userId = req.params.userId;
    const selectQuery = "SELECT * FROM userprofile WHERE UserId = ?";
    db.query(selectQuery, userId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateProfileKyc = (req, res) => {
  try {
    const userId = req.params.userId;
    const { PanCardNumber, AadharNumber, BusinessName, City, State, PinCode } =
      req.body;
    const { AadharFront, AadharBack, PanCard } = req.files;
    // console.log(AadharFront, AadharBack, PanCard);

    // Check PORT and file variables
    if (!PORT)
      return res
        .status(500)
        .json({ success: false, message: "Server port not set" });
    // if (!AadharFront || !AadharBack || !PanCard)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Required documents are missing" });

    const aadharFrontUrl = AadharFront
      ? `http://localhost:${PORT}/kycupload/${AadharFront[0].filename}`
      : null;
    const aadharBackUrl = AadharBack
      ? `http://localhost:${PORT}/kycupload/${AadharBack[0].filename}`
      : null;
    const panCardUrl = PanCard
      ? `http://localhost:${PORT}/kycupload/${PanCard[0].filename}`
      : null;

    console.log("File URLs:", { aadharFrontUrl, aadharBackUrl, panCardUrl });

    const selectQuery = "SELECT * FROM userprofile WHERE UserId = ?";
    db.query(selectQuery, [userId], (err, result) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });

      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (PanCardNumber) {
          updateFields.push("PanCardNumber = ?");
          updateValues.push(PanCardNumber);
        }
        if (AadharNumber) {
          updateFields.push("AadharNumber = ?");
          updateValues.push(AadharNumber);
        }
        if (BusinessName) {
          updateFields.push("BusinessName = ?");
          updateValues.push(BusinessName);
        }
        if (City) {
          updateFields.push("City = ?");
          updateValues.push(City);
        }
        if (State) {
          updateFields.push("State = ?");
          updateValues.push(State);
        }
        if (PinCode) {
          updateFields.push("PinCode = ?");
          updateValues.push(PinCode);
        }
        if (AadharFront) {
          updateFields.push("AadharFront = ?");
          updateValues.push(aadharFrontUrl);
        }
        if (AadharBack) {
          updateFields.push("AadharBack = ?");
          updateValues.push(aadharBackUrl);
        }
        if (PanCard) {
          updateFields.push("PanCardFront = ?");
          updateValues.push(panCardUrl); // Corrected PanCardFront field
        }

        if (updateFields.length === 0) {
          return res
            .status(400)
            .json({ success: false, message: "No fields provided to update" });
        }

        const updateQuery = `UPDATE userprofile SET ${updateFields.join(
          ", "
        )} WHERE UserId = ?`;
        db.query(updateQuery, [...updateValues, userId], (err, result) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Failed to update details",
              error: err.message,
            });
          }
          if (result.affectedRows === 0) {
            return res
              .status(404)
              .json({ success: false, message: "User not found" });
          }

          return res.status(200).json({
            success: true,
            message: "User details updated successfully",
          });
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const addBankDetails = (req, res) => {
  try {
    const userId = req.params.userId;
    const {
      bankholder_name,
      bankaccount_number,
      IFSC_code,
      bank_name,
      status,
    } = req.body;
    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const selectQuery =
      "SELECT * FROM bank_details WHERE bankaccount_number = ?";
    db.query(selectQuery, bankaccount_number, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      if (result && result.length === 0) {
        const insertQuery =
          "INSERT INTO bank_details (UserId, bankholder_name, bankaccount_number, IFSC_code, bank_name, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";

        const insertParams = [
          userId,
          bankholder_name,
          bankaccount_number,
          IFSC_code,
          bank_name,
          status,
          createdAt,
        ];
        db.query(insertQuery, insertParams, (err, result) => {
          if (err) {
            return res
              .status(400)
              .json({ success: false, message: err.message });
          } else {
            return res.status(200).json({ success: true, message: result });
          }
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Bank account number already exists",
        });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getBankDetails = (req, res) => {
  try {
    const userId = req.params.userId;
    const selectQuery = "SELECT * FROM bank_details WHERE UserId = ?";
    db.query(selectQuery, userId, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
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
  addBankDetails,
  getBankDetails,
};
