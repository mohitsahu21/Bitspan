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

module.exports = {
  getSuperDistributorUserList,
  getAllOtherOfflineFormDetails,
  getPanCardOfflineFormDetails,
  getRechargeOfflineFormDetails,
  getDTHConnectionOfflineFormDetails,
  updateTwoStepPin,
};
