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

const getAllOfflineServices = (req, res) => {
  try {
    const selectQuery = `SELECT * FROM apply_offline_form`;
    db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getDthConnectionOfflineServices = (req, res) => {
  try {
    const selectQuery = `SELECT * FROM offline_dth_connection`;
    db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllOfflineRecharge = (req, res) => {
  try {
    const selectQuery = `SELECT * FROM offline_recharge`;
    db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllPanOffline = (req, res) => {
  try {
    const selectQuery = `SELECT * FROM pan_offline`;
    db.query(selectQuery, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllPanOfflineById = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = `SELECT * FROM pan_offline WHERE id = ?`;
    db.query(selectQuery, pid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updatePanStatus = (req, res) => {
  try {
    const pid = req.params.pid;
    const { status, note } = req.body;

    // Check if the request body has the necessary fields
    if (!status || !note) {
      return res
        .status(400)
        .json({ success: false, message: "Status and note are required" });
    }

    const updateQuery = `UPDATE pan_offline SET status = ?, note = ? WHERE id = ?`;

    db.query(updateQuery, [status, note, pid], (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      // Check if any rows were affected
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Record not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Record updated successfully",
        result,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const updateDTHConnectStatus = (req, res) => {
  try {
    const pid = req.params.pid;
    const { status, note } = req.body;

    // Check if the request body has the necessary fields
    if (!status || !note) {
      return res
        .status(400)
        .json({ success: false, message: "Status and note are required" });
    }

    const updateQuery = `UPDATE offline_dth_connection SET status = ?, note = ? WHERE id = ?`;

    db.query(updateQuery, [status, note, pid], (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      // Check if any rows were affected
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Record not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Record updated successfully",
        result,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const updateRechargeStatus = (req, res) => {
  try {
    const pid = req.params.pid;
    const { status, note } = req.body;

    // Check if the request body has the necessary fields
    if (!status || !note) {
      return res
        .status(400)
        .json({ success: false, message: "Status and note are required" });
    }

    const updateQuery = `UPDATE offline_recharge SET status = ?, note = ? WHERE id = ?`;

    db.query(updateQuery, [status, note, pid], (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      // Check if any rows were affected
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Record not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Record updated successfully",
        result,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getAllOfflineServicesById = (req, res) => {
  try {
    const pid = req.params.pid;
    const selectQuery = `SELECT * FROM apply_offline_form WHERE id = ?`;
    db.query(selectQuery, pid, (err, result) => {
      if (err) {
        res.status(400).json({ success: false, message: err.message });
      }
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateOfflineServiceStatus = (req, res) => {
  try {
    const pid = req.params.pid;
    const { status, note } = req.body;
    if (!status || !note) {
      return res
        .status(400)
        .json({ success: false, message: "Status and note are required" });
    }

    const updateQuery = `UPDATE apply_offline_form SET status = ?, note = ? WHERE id = ?`;

    db.query(updateQuery, [status, note, pid], (err, result) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }

      // Check if any rows were affected
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Record not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Record updated successfully",
        result,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getAllOfflineServices,
  getDthConnectionOfflineServices,
  getAllOfflineRecharge,
  getAllPanOffline,
  getAllPanOfflineById,
  updatePanStatus,
  updateDTHConnectStatus,
  updateRechargeStatus,
  getAllOfflineServicesById,
  updateOfflineServiceStatus,
};
