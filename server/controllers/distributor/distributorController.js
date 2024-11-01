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

const getDistributorUserList = (req, res) => {
  try {
    const selectQuery =
      "SELECT * FROM user_relations WHERE distributor IS NOT NULL";
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

const getWalletBalance = (req, res) => {
  try {
    const userId = req.params.userId;
    const selectQuery = "SELECT * FROM user_wallet WHERE userId = ?";
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

const makePurchaseUserId = (req, res) => {
  try {
    const {
      userId,
      selectUserIdType,
      noOfId,
      paymentMethod,
      totalAmount,
      paymentId,
    } = req.body;
    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // Step 1: Retrieve the last orderId from the table
    const getLastOrderIdQuery =
      "SELECT MAX(orderId) AS lastOrderId FROM userid_bought_summary";

    db.query(getLastOrderIdQuery, (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      // Determine the next orderId
      let newOrderId = "0000000001"; // Default if no entries exist
      if (result[0].lastOrderId) {
        // Increment the last orderId and pad it to 10 characters
        newOrderId = String(parseInt(result[0].lastOrderId) + 1).padStart(
          10,
          "0"
        );
      }

      // Step 2: Insert the new record with the calculated orderId
      const insertQuery =
        "INSERT INTO userid_bought_summary (userId, number_of_userId, userId_type, bought_date, total_amount, payment_method, orderId, transactionId, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      const insertParams = [
        userId,
        noOfId,
        selectUserIdType,
        createdAt,
        totalAmount,
        paymentMethod,
        newOrderId,
        paymentId,
        paymentStatus,
      ];

      db.query(insertQuery, insertParams, (err, result) => {
        if (err) {
          return res.status(400).json({ success: false, message: err.message });
        }

        res.status(200).json({
          success: true,
          message: "Successfully added userId",
          orderId: newOrderId,
        });
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getDistributorUserList,
  getAllOtherOfflineFormDetails,
  getPanCardOfflineFormDetails,
  getWalletBalance,
  makePurchaseUserId,
};
