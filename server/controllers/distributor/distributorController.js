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

module.exports = {
  getDistributorUserList,
  getAllOtherOfflineFormDetails,
  getPanCardOfflineFormDetails,
};
