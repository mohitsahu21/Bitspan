// const { getDataFromClientApi } = require("../../APIS URL/instpayApis");
const { db } = require("../../connect");
const moment = require("moment-timezone");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs"); // Add this at the top
const crypto = require("crypto");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAILSENDER,
    pass: process.env.EMAILPASSWORD,
  },
});
// const applyOfflineForm = (req, res) => {
//   const {
//     applicant_name,
//     applicant_father,
//     applicant_number,
//     applicant_select_service,
//     other,
//   } = req.body;

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//   const domain = "http://localhost:7777";
//   const attached_form = req.files.attached_form
//     ? `${domain}/uploads/${req.files.attached_form[0].filename}`
//     : null;
//   const attached_photo = req.files.attached_photo
//     ? `${domain}/uploads/${req.files.attached_photo[0].filename}`
//     : null;
//   const attached_sign = req.files.attached_sign
//     ? `${domain}/uploads/${req.files.attached_sign[0].filename}`
//     : null;
//   // const attached_kyc = req.files.attached_kyc
//   //   ? `${domain}/uploads/${req.files.attached_kyc[0].filename}`
//   //   : null;
//   const attached_kyc = req.files.attached_kyc
//     ? req.files.attached_kyc
//         .map((file) => `${domain}/uploads/${file.filename}`)
//         .join(",")
//     : null;

//   const orderId = `OFF${Date.now()}IS`;

//   const query = `
//         INSERT INTO apply_offline_form (
//         order_id,
//             applicant_name,
//             applicant_father,
//             applicant_number,
//             applicant_select_service,
//             other,
//             attached_form,
//             attached_photo,
//             attached_sign,
//             attached_kyc,
//             created_at
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//   db.query(
//     query,
//     [
//       orderId,
//       applicant_name,
//       applicant_father,
//       applicant_number,
//       applicant_select_service,
//       other,
//       attached_form,
//       attached_photo,
//       attached_sign,
//       attached_kyc,
//       createdAt,
//     ],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting data into MySQL:", err);
//         res.status(500).json({ error: "Database error" });
//         return;
//       }

//       res
//         .status(200)
//         .json({ message: "Form submitted successfully", id: result.insertId });
//     }
//   );
// };
const applyOfflineForm = (req, res) => {
  const {
    applicant_name,
    applicant_father,
    applicant_number,
    email,
    applicant_select_service,
    other,
    eStampAmount,
    amount,
    userId,
  } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const domain = "http://localhost:7777";
  const attached_form = req.files.attached_form
    ? `${domain}/uploads/${req.files.attached_form[0].filename}`
    : null;
  const attached_photo = req.files.attached_photo
    ? `${domain}/uploads/${req.files.attached_photo[0].filename}`
    : null;
  const attached_sign = req.files.attached_sign
    ? `${domain}/uploads/${req.files.attached_sign[0].filename}`
    : null;
  // const attached_kyc = req.files.attached_kyc
  //   ? `${domain}/uploads/${req.files.attached_kyc[0].filename}`
  //   : null;
  const attached_kyc = req.files.attached_kyc
    ? req.files.attached_kyc
        .map((file) => `${domain}/uploads/${file.filename}`)
        .join(",")
    : null;

  const orderId = `ORF${Date.now()}`;

  const status = "Pending";

  const query = `
        INSERT INTO apply_offline_form (
        order_id,
            applicant_name,
            applicant_father,
            applicant_number,
                email,
            applicant_select_service,
            other,
                eStampAmount,
    amount,
            attached_form,
            attached_photo,
            attached_sign,
            attached_kyc,
            status,
            	user_id,
            created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    query,
    [
      orderId,
      applicant_name,
      applicant_father,
      applicant_number,
      email,
      applicant_select_service,
      other,
      eStampAmount,
      amount,
      attached_form,
      attached_photo,
      attached_sign,
      attached_kyc,
      status,
      userId,
      createdAt,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }

      const queryBalance = `
      SELECT Closing_Balance 
      FROM user_wallet 
      WHERE userId = ? 
      ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC 
      LIMIT 1
    `;

      db.query(queryBalance, [userId], (err, balanceResult) => {
        if (err) {
          console.error("Error fetching wallet balance:", err);
          return res.status(500).json({
            status: "Failure",
            step: "Fetch Wallet Balance",
            error: "Failed to fetch wallet balance",
            details: err.message,
          });
        }

        if (balanceResult.length === 0) {
          return res.status(404).json({
            status: "Failure",
            step: "Fetch Wallet Balance",
            message: "No balance found for the user.",
          });
        }

        const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
        if (isNaN(currentBalance)) {
          return res.status(500).json({
            status: "Failure",
            step: "Fetch Wallet Balance",
            error: "Current balance is invalid.",
          });
        }

        if (currentBalance < amount) {
          return res.status(400).json({
            status: "Failure",
            step: "Wallet Deduction",
            message: "Insufficient balance.",
            currentBalance,
            requiredAmount: amount,
          });
        }

        const newBalance = parseFloat(currentBalance - amount).toFixed(2);
        if (isNaN(newBalance)) {
          return res.status(500).json({
            status: "Failure",
            step: "Wallet Deduction",
            error: "New balance calculation is invalid.",
          });
        }

        const transactionId = `TXNW${Date.now()}`;
        const transactionDetails = `Services Deduction ${applicant_number}`;
        const creditAmt = 0;

        const updateWalletQuery = `
        INSERT INTO user_wallet 
        (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

        db.query(
          updateWalletQuery,
          [
            userId,
            createdAt,
            orderId,
            transactionId,
            currentBalance.toFixed(2),
            newBalance,
            "Debit",
            creditAmt,
            amount,
            transactionDetails,
            "Success",
          ],
          (err, walletResult) => {
            if (err) {
              console.error("Error updating wallet balance:", err);
              return res.status(500).json({
                status: "Failure",
                step: "Update Wallet Balance",
                error: "Failed to update wallet balance",
                details: err.message,
              });
            }

            return res.status(200).json({
              status: "Success",
              message:
                "Other Services processed and wallet updated successfully.",
              details: {
                offlineServices: {
                  orderId,
                  applicant_name,
                  applicant_father,
                  applicant_number,
                  email,
                  applicant_select_service,
                  amount,
                },
                wallet: {
                  transactionId,
                  newBalance,
                  previousBalance: currentBalance.toFixed(2),
                  deductedAmount: amount,
                },
              },
            });
          }
        );
      });
    }
  );
};

// const getApplyOfflineFormByid = (req, res) => {
//   const id = req.params.id; // Extracting the id from the request parameters
//   const query = `SELECT * FROM apply_offline_form WHERE id = ?`;

//   db.query(query, [id], (err, result) => {
//     // Use array to pass the parameter
//     if (err) {
//       console.error("Error getting data from MySQL:", err);
//       res.status(500).json({ error: "Database error" });
//       return;
//     }

//     if (result.length === 0) {
//       res.status(404).json({ message: "Form not found" });
//       return;
//     }

//     res.status(200).json(result[0]); // Return the first result as it is a single form
//   });
// };

const getApplyOfflineFormById = (req, res) => {
  const { userId } = req.params; // Extracting userId from the request parameters
  const sql = `
    SELECT ur.*, t.* 
    FROM user_relations AS ur 
    INNER JOIN apply_offline_form AS t 
    ON ur.UserId = t.user_id
    WHERE ur.distributor = ? AND ur.userType = 'Retailer'
     ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error getting data from MySQL:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.status(200).json(result);
  });
};

const getApplyOfflineForm = (req, res) => {
  const { fromDate, toDate } = req.query;

  let query = `SELECT * FROM apply_offline_form`;

  if (fromDate && toDate) {
    query += ` WHERE created_at BETWEEN '${fromDate}' AND '${toDate}' ORDER BY created_at DESC`;
  } else {
    query += " ORDER BY created_at DESC";
  }

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error getting data from MySQL:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.status(200).json(result);
  });
};

const updateApplyOfflineForm = (req, res) => {
  const id = req.params.id;
  const { status, note } = req.body;

  const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const query = `UPDATE apply_offline_form SET status = ?, note = ?, updated_at = ? WHERE id = ?`;

  db.query(query, [status, note, updatedAt, id], (err, result) => {
    if (err) {
      console.error("Error updating data in MySQL:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Form not found" });
      return;
    }

    res.status(200).json({ message: "Form updated successfully" });
  });
};

const bankidForm = (req, res) => {
  const {
    applicant_name,
    applicant_father,
    applicant_mother,
    applicant_number,
    email,
    applicant_select_service,
    select_bank_service,
    aadhar_card,
    pan_card,
    business_name,
    status,
    amount,
    userId,
  } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const domain = "http://localhost:7777";
  const attached_photo = req.files.attached_photo
    ? `${domain}/uploads/${req.files.attached_photo[0].filename}`
    : null;

  const attached_kyc = req.files.attached_kyc
    ? req.files.attached_kyc
        .map((file) => `${domain}/uploads/${file.filename}`)
        .join(",")
    : null;
  const bank_passbook = req.files.bank_passbook
    ? `${domain}/uploads/${req.files.bank_passbook[0].filename}`
    : null;
  const shop_photo = req.files.shop_photo
    ? `${domain}/uploads/${req.files.shop_photo[0].filename}`
    : null;
  const electric_bill = req.files.electric_bill
    ? `${domain}/uploads/${req.files.electric_bill[0].filename}`
    : null;

  const orderId = `BNK${Date.now()}`;
  // const orderId = `BNK${createdAt}`;

  const query = `
        INSERT INTO apply_offline_form (
        order_id,
            applicant_name,
    applicant_father,
    applicant_mother,
    applicant_number,
    email,
    applicant_select_service,
    select_bank_service,
    aadhar_card,
    pan_card,
    business_name,
    attached_photo,
    attached_kyc,
    bank_passbook,
    shop_photo,
    electric_bill,
    status,
    amount,
    user_id,
    created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    query,
    [
      orderId,
      applicant_name,
      applicant_father,
      applicant_mother,
      applicant_number,
      email,
      applicant_select_service,
      select_bank_service,
      aadhar_card,
      pan_card,
      business_name,
      attached_photo,
      attached_kyc,
      bank_passbook,
      shop_photo,
      electric_bill,
      "Pending",
      amount,
      userId,
      createdAt,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }

      const queryBalance = `
        SELECT Closing_Balance 
        FROM user_wallet 
        WHERE userId = ? 
        ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC 
        LIMIT 1
      `;

      db.query(queryBalance, [userId], (err, balanceResult) => {
        if (err) {
          console.error("Error fetching wallet balance:", err);
          return res.status(500).json({
            status: "Failure",
            step: "Fetch Wallet Balance",
            error: "Failed to fetch wallet balance",
            details: err.message,
          });
        }

        if (balanceResult.length === 0) {
          return res.status(404).json({
            status: "Failure",
            step: "Fetch Wallet Balance",
            message: "No balance found for the user.",
          });
        }

        const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
        if (isNaN(currentBalance)) {
          return res.status(500).json({
            status: "Failure",
            step: "Fetch Wallet Balance",
            error: "Current balance is invalid.",
          });
        }

        if (currentBalance < amount) {
          return res.status(400).json({
            status: "Failure",
            step: "Wallet Deduction",
            message: "Insufficient balance.",
            currentBalance,
            requiredAmount: amount,
          });
        }

        const newBalance = parseFloat(currentBalance - amount).toFixed(2);
        if (isNaN(newBalance)) {
          return res.status(500).json({
            status: "Failure",
            step: "Wallet Deduction",
            error: "New balance calculation is invalid.",
          });
        }

        const transactionId = `TXNW${Date.now()}`;
        const transactionDetails = `Recharge Deduction ${applicant_number}`;

        const updateWalletQuery = `
          INSERT INTO user_wallet 
          (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, debit_amount, Transaction_details, status) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
          updateWalletQuery,
          [
            userId,
            createdAt,
            orderId,
            transactionId,
            currentBalance.toFixed(2),
            newBalance,
            "Debit",
            amount,
            transactionDetails,
            "Success",
          ],
          (err, walletResult) => {
            if (err) {
              console.error("Error updating wallet balance:", err);
              return res.status(500).json({
                status: "Failure",
                step: "Update Wallet Balance",
                error: "Failed to update wallet balance",
                details: err.message,
              });
            }

            return res.status(200).json({
              status: "Success",
              message: "Bank ID processed and wallet updated successfully.",
              details: {
                bankid: {
                  orderId,
                  applicant_name,
                  applicant_number,
                  email,
                  applicant_select_service,
                  select_bank_service,
                  business_name,
                  createdAt,
                },
                wallet: {
                  transactionId,
                  newBalance,
                  previousBalance: currentBalance.toFixed(2),
                  deductedAmount: amount,
                },
              },
            });
          }
        );
      });
    }
  );
};

const offlineRecharge = (req, res) => {
  const { mobile_no, operator_name, amount, recharge_Type, created_by_userid } =
    req.body;

  if (!mobile_no || !operator_name || !amount) {
    return res
      .status(400)
      .json({ status: "Failure", error: "Please fill all the fields" });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  // Use the current timestamp to generate the order ID
  const orderId = `${Date.now()}`;

  // Insert data into the database
  const insertQuery = `INSERT INTO offline_recharge 
    (mobile_no, operator_name, amount, orderid, recharge_Type, created_by_userid, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertQuery,
    [
      mobile_no,
      operator_name,
      amount,
      orderId,
      recharge_Type,
      created_by_userid,
      createdAt,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        return res
          .status(500)
          .json({ status: "Failure", error: "Database error" });
      }

      res.status(200).json({
        status: "Success",
        message: "Data inserted successfully",
        id: result.insertId,
        orderid: orderId,
      });
    }
  );
};

const getRechargeData = (req, res) => {
  let query = `SELECT * FROM offline_recharge`;

  db.query(query, (err, result) => {
    if (err) {
      return res.status(400).json({ status: "failure", error: err.message });
    }

    return res.status(200).json({ status: "success", data: result });
  });
};

const getApiRechargeData = (req, res) => {
  const userId = req.params.userId;
  const rechargeType = "Prepaid";

  let query = `SELECT * FROM recharges WHERE recharge_Type = ? AND created_by_userid = ? ORDER BY id DESC`;

  db.query(query, [rechargeType, userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "Failure", message: "No data found" });
    }

    return res.status(200).json({ status: "Success", data: result });
  });
};

const offlineDthConnection = (req, res) => {
  const {
    operatorName,
    first_name,
    last_name,
    full_address,
    postal_code,
    number,
    amount,
    message,
    user_id,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !full_address ||
    !postal_code ||
    !number ||
    !amount ||
    !message
  ) {
    return res
      .status(400)
      .json({ status: "Failure", error: "Please fill all the fields" });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  // Function to generate new order ID
  const generateNewOrderId = (maxOrderId) => {
    let numericPart = parseInt(maxOrderId.replace("DOR", "")) + 1;
    return `DOR${String(numericPart).padStart(5, "0")}`;
  };

  // Query to get the maximum order ID
  const getMaxOrderIdQuery = `SELECT MAX(orderid) as maxOrderId FROM offline_dth_connection`;

  db.query(getMaxOrderIdQuery, (err, result) => {
    if (err) {
      console.error("Error fetching maximum order ID:", err);
      return res
        .status(500)
        .json({ status: "Failure", error: "Database error" });
    }

    let maxOrderId = result[0].maxOrderId || "DOR00000"; // Default if no order ID is present
    let newOrderId = generateNewOrderId(maxOrderId);

    // Function to check if order ID is unique
    const checkOrderIdUnique = () => {
      const checkOrderIdQuery = `SELECT orderid FROM offline_dth_connection WHERE orderid = ?`;

      db.query(checkOrderIdQuery, [newOrderId], (err, result) => {
        if (err) {
          console.error("Error checking order ID:", err);
          return res
            .status(500)
            .json({ status: "Failure", error: "Database error" });
        }

        if (result.length > 0) {
          // Order ID exists, generate a new one
          newOrderId = generateNewOrderId(newOrderId);
          checkOrderIdUnique(); // Recursively check until unique
        } else {
          // Order ID is unique, proceed with inserting the record
          const insertQuery = `INSERT INTO offline_dth_connection
            (operatorName,
    first_name,
    last_name,
    full_address,
    postal_code,
    number,
    amount,
    orderid,
    message,
    user_id, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          db.query(
            insertQuery,
            [
              operatorName,
              first_name,
              last_name,
              full_address,
              postal_code,
              number,
              amount,
              newOrderId, // Using the newly generated order ID
              message,
              user_id,
              createdAt,
            ],
            (err, result) => {
              if (err) {
                console.error("Error inserting data into MySQL:", err);
                return res
                  .status(500)
                  .json({ status: "Failure", error: "Database error" });
              }

              res.status(200).json({
                status: "Success",
                message: "Data inserted successfully",
                id: result.insertId,
                orderid: newOrderId, // Return the new order ID to the client
              });
            }
          );
        }
      });
    };

    // Start the check for order ID uniqueness
    checkOrderIdUnique();
  });
};

const panFromData = (req, res) => {
  const {
    application_type,
    select_title,
    name,
    father_name,
    mother_name,
    dob,
    gender,
    office_address,
    aadhar_details,
    Address_Communication_OfficeResident,
    alternative_communication_Address,
    mobile_no,
    email_id,
    pin_code,
    state,
    Change_Request,
    pantype,
    amount,
    userId,
    status,
    note,
  } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const domain = "http://localhost:7777";

  // console.log("Request body:", req.body);
  // console.log("Uploaded files:", req.files);

  // Handle files carefully
  const documentUpload =
    req.files && req.files.documentUpload
      ? req.files.documentUpload
          .map((file) => `${domain}/uploads/${file.filename}`)
          .join(",")
      : null;

  const attachment_form =
    req.files && req.files.attachment_form
      ? `${domain}/uploads/${req.files.attachment_form[0].filename}`
      : null;

  const attachment_photo =
    req.files && req.files.attachment_photo
      ? `${domain}/uploads/${req.files.attachment_photo[0].filename}`
      : null;

  const attachment_signature =
    req.files && req.files.attachment_signature
      ? `${domain}/uploads/${req.files.attachment_signature[0].filename}`
      : null;

  const orderId = `PANZ${Date.now()}`;

  const sql = `INSERT INTO pan_offline (
    order_id, application_type, select_title, name, father_name, mother_name, dob, gender, office_address, aadhar_details,
    Address_Communication_OfficeResident, alternative_communication_Address, mobile_no, email_id, pin_code, state,
    Change_Request, pantype, documentUpload, attachment_form, attachment_signature, attachment_photo, Charge_Amount, user_id,
    status, note, created_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    orderId,
    application_type,
    select_title,
    name,
    father_name,
    mother_name,
    dob,
    gender,
    office_address,
    aadhar_details,
    Address_Communication_OfficeResident,
    alternative_communication_Address,
    mobile_no,
    email_id,
    pin_code,
    state,
    Change_Request,
    pantype,
    documentUpload,
    attachment_form,
    attachment_signature,
    attachment_photo,
    amount,
    userId,
    status,
    note,
    createdAt,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }
    // res.status(201).json({
    //   message: "Form data submitted successfully",
    //   formId: result.insertId,
    // });

    const queryBalance = `
    SELECT Closing_Balance 
    FROM user_wallet 
    WHERE userId = ? 
    ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC 
    LIMIT 1
  `;

    db.query(queryBalance, [userId], (err, balanceResult) => {
      if (err) {
        console.error("Error fetching wallet balance:", err);
        return res.status(500).json({
          status: "Failure",
          step: "Fetch Wallet Balance",
          error: "Failed to fetch wallet balance",
          details: err.message,
        });
      }

      if (balanceResult.length === 0) {
        return res.status(404).json({
          status: "Failure",
          step: "Fetch Wallet Balance",
          message: "No balance found for the user.",
        });
      }

      const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
      if (isNaN(currentBalance)) {
        return res.status(500).json({
          status: "Failure",
          step: "Fetch Wallet Balance",
          error: "Current balance is invalid.",
        });
      }

      if (currentBalance < amount) {
        return res.status(400).json({
          status: "Failure",
          step: "Wallet Deduction",
          message: "Insufficient balance.",
          currentBalance,
          requiredAmount: amount,
        });
      }

      const newBalance = parseFloat(currentBalance - amount).toFixed(2);
      if (isNaN(newBalance)) {
        return res.status(500).json({
          status: "Failure",
          step: "Wallet Deduction",
          error: "New balance calculation is invalid.",
        });
      }

      const transactionId = `TXNW${Date.now()}`;
      const transactionDetails = `Pan 4.0 Deduction ${mobile_no}`;
      const creditAmt = 0;

      const updateWalletQuery = `
      INSERT INTO user_wallet 
      (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      db.query(
        updateWalletQuery,
        [
          userId,
          createdAt,
          orderId,
          transactionId,
          currentBalance.toFixed(2),
          newBalance,
          "Debit",
          creditAmt,
          amount,
          transactionDetails,
          "Success",
        ],
        (err, walletResult) => {
          if (err) {
            console.error("Error updating wallet balance:", err);
            return res.status(500).json({
              status: "Failure",
              step: "Update Wallet Balance",
              error: "Failed to update wallet balance",
              details: err.message,
            });
          }

          return res.status(200).json({
            status: "Success",
            message: "Pan 4.0 processed and wallet updated successfully.",
            details: {
              dthConnection: {
                orderId,
                application_type,
                select_title,
                name,
                dob,
                gender,
                mobile_no,
                email_id,
                createdAt,
              },
              wallet: {
                transactionId,
                newBalance,
                previousBalance: currentBalance.toFixed(2),
                deductedAmount: amount,
              },
            },
          });
        }
      );
    });
  });
};

const nsdlTransactionNewRequest = (req, res) => {
  const query = `SELECT * FROM nsdlpan ORDER BY id DESC`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    } else {
      return res.status(200).json({ status: "Success", data: result });
    }
  });
};

const nsdlTransactionCorrection = (req, res) => {
  const query = `SELECT * FROM nsdlpancorrection ORDER BY id DESC`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    } else {
      return res.status(200).json({ status: "Success", data: result });
    }
  });
};

const panFourZeroGetAPI = (req, res) => {
  const applicationId = req.params.user_id;
  const query = `SELECT * FROM pan_offline WHERE user_id = ? ORDER BY id DESC`;

  db.query(query, [applicationId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    } else {
      return res.status(200).json({ status: "Success", data: result });
    }
  });
};

const complainInsertApi = (req, res) => {
  const { complainType, transactionNo, mobileNo, remark, userID } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const domain = "http://localhost:7777";

  // Default status set to 'Pending'
  const status = "Pending";

  const complainFile =
    req.files && req.files.complainFile
      ? `${domain}/complainUpload/${req.files.complainFile[0].filename}`
      : null;

  const insertquery = `INSERT INTO complaindata (complainType, transactionNo, mobileNo, remark, complainFile, userID, createdAt,status) VALUES (?,?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    complainType,
    transactionNo,
    mobileNo,
    remark,
    complainFile,
    userID,
    createdAt,
    status,
  ];

  db.query(insertquery, values, (err, result) => {
    if (err) {
      console.log(`Error Inserting record: ${err.message}`);
      return res.status(500).json({ status: "Failure", error: err.message });
    } else {
      res.status(201).json({
        status: "Success",
        message: "Submitted Successfully",
        resultID: result.insertId,
      });
    }
  });
};

const complainGetData = (req, res) => {
  const { userid } = req.params;

  // Query to fetch complaints for a specific user
  const query = `SELECT * FROM complaindata WHERE userid = ? ORDER BY id DESC`;

  // Execute the query with the `userid` parameter
  db.query(query, [userid], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500) // Use 500 for server/database errors
        .json({ status: "Failure", message: "Internal server error" });
    }

    // Return data or handle the case where no results are found
    if (result.length === 0) {
      return res.status(404).json({
        status: "Failure",
        message: "No complaints found for the given user ID.",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: result,
    });
  });
};

const profileInfo = (req, res) => {
  try {
    console.log("Request received for profile update");

    const domain = "http://localhost:7777";

    // Extract uploaded file paths
    const aadharFront = req.files?.aadharFront?.[0]?.filename
      ? `${domain}/profile-data/${req.files.aadharFront[0].filename}`
      : null;
    console.log("Extracted aadharFront:", aadharFront);

    const aadharBack = req.files?.aadharBack?.[0]?.filename
      ? `${domain}/profile-data/${req.files.aadharBack[0].filename}`
      : null;
    console.log("Extracted aadharBack:", aadharBack);

    const panCardFront = req.files?.panCardFront?.[0]?.filename
      ? `${domain}/profile-data/${req.files.panCardFront[0].filename}`
      : null;
    console.log("Extracted panCardFront:", panCardFront);

    const profileImage = req.files?.profileImage?.[0]?.filename
      ? `${domain}/profile-data/${req.files.profileImage[0].filename}`
      : null;
    console.log("Extracted profileImage:", profileImage);

    // Check if at least one file is uploaded
    if (!aadharFront && !aadharBack && !panCardFront && !profileImage) {
      console.log("No files uploaded");
      return res.status(400).json({
        status: "Failure",
        error: "No files were uploaded",
      });
    }

    // Extract UserId from params
    const { UserId } = req.params;
    console.log("Extracted UserId from params:", UserId);

    if (!UserId) {
      console.log("UserId is missing in request parameters");
      return res.status(400).json({
        status: "Failure",
        error: "UserId is required",
      });
    }

    // Build update query
    const updateFields = [];
    const updateValues = [];

    if (aadharFront) {
      updateFields.push("AadharFront = ?");
      updateValues.push(aadharFront);
    }
    if (aadharBack) {
      updateFields.push("AadharBack = ?");
      updateValues.push(aadharBack);
    }
    if (panCardFront) {
      updateFields.push("PanCardFront = ?");
      updateValues.push(panCardFront);
    }
    if (profileImage) {
      updateFields.push("profileImage = ?");
      updateValues.push(profileImage);
    }

    // // Add status field update
    // updateFields.push("Status = ?");
    // updateValues.push("Active");

    console.log("Update fields:", updateFields);
    console.log("Update values:", updateValues);

    // Construct and execute the SQL query
    const updateQuery = `UPDATE userprofile SET ${updateFields.join(
      ", "
    )} WHERE UserId = ?`;
    updateValues.push(UserId);

    console.log("Constructed SQL query:", updateQuery);
    console.log("Final query values:", updateValues);

    db.query(updateQuery, updateValues, (err, result) => {
      if (err) {
        console.error(`Error updating record in database: ${err.message}`);
        return res.status(500).json({
          status: "Failure",
          error: "Database error occurred",
        });
      }

      console.log("Database query executed successfully, result:", result);

      if (result.affectedRows === 0) {
        console.log("No user found with the provided UserId");
        return res.status(404).json({
          status: "Failure",
          error: "No user found with the given UserId",
        });
      }

      console.log("Profile updated successfully");
      res.status(200).json({
        status: "Success",
        message: "Profile updated successfully",
        updatedFields: updateFields.map((field) => field.split(" ")[0]), // List updated fields
      });
    });
  } catch (error) {
    console.error(`Unexpected error occurred: ${error.message}`);
    res.status(500).json({
      status: "Failure",
      error: "Internal server error",
    });
  }
};

// const profileInfo = (req, res) => {
//   const { userId } = req.body; // Get user ID from request body

//   if (!userId) {
//     return res
//       .status(400)
//       .json({ success: false, message: "User ID is required" });
//   }

//   // Construct URLs for the uploaded images
//   const baseUrl = `http://localhost:7777/uploads/`;

//   const aadharFrontUrl = req.files?.aadharFront?.[0]
//     ? `${baseUrl}${req.files.aadharFront[0].filename}`
//     : null;
//   const aadharBackUrl = req.files?.aadharBack?.[0]
//     ? `${baseUrl}${req.files.aadharBack[0].filename}`
//     : null;
//   const panCardFrontUrl = req.files?.panCardFront?.[0]
//     ? `${baseUrl}${req.files.panCardFront[0].filename}`
//     : null;

//   // Check if all files are null (no file uploaded)
//   if (!aadharFrontUrl && !aadharBackUrl && !panCardFrontUrl) {
//     return res.status(400).json({
//       success: false,
//       message: "At least one file must be uploaded",
//     });
//   }

//   // Update the database with the image URLs
//   const query = `
//     UPDATE userprofile
//     SET AadharFront = COALESCE(?, AadharFront),
//         AadharBack = COALESCE(?, AadharBack),
//         PanCardFront = COALESCE(?, PanCardFront)
//     WHERE UserId = ?`;

//   db.query(
//     query,
//     [aadharFrontUrl, aadharBackUrl, panCardFrontUrl, userId],
//     (err, result) => {
//       if (err) {
//         console.error("Database error:", err);
//         return res
//           .status(500)
//           .json({ success: false, message: "Database error" });
//       }

//       res.json({
//         success: true,
//         message: "Images uploaded and URLs saved successfully",
//       });
//     }
//   );
// };

const profileUserKyc = (req, res) => {
  console.log("Received request for KYC submission");

  // Log the incoming request body and files
  console.log("Request Body:", req.body);
  console.log("Request Files:", req.files);

  const { userId } = req.body;

  // Validate required fields
  if (
    !userId ||
    !req.files ||
    !req.files.aadharFront ||
    !req.files.aadharBack ||
    !req.files.panCardFront ||
    !req.files.profileImage
  ) {
    console.log("Validation failed: Missing required fields");
    return res.status(400).json({ error: "Missing required fields" });
  }

  const domain = "http://localhost:7777";

  // Log file paths being generated
  const aadharFront = req.files.aadharFront
    ? `${domain}/profile-data/${req.files.aadharFront[0].filename}`
    : null;
  console.log("Aadhar Front Path:", aadharFront);

  const aadharBack = req.files.aadharBack
    ? `${domain}/profile-data/${req.files.aadharBack[0].filename}`
    : null;
  console.log("Aadhar Back Path:", aadharBack);

  const panCardFront = req.files.panCardFront
    ? `${domain}/profile-data/${req.files.panCardFront[0].filename}`
    : null;
  console.log("PAN Card Front Path:", panCardFront);

  const profileImage = req.files.profileImage
    ? `${domain}/profile-data/${req.files.profileImage[0].filename}`
    : null;
  console.log("Profile Image Path:", profileImage);

  // Prepare the SQL query
  const query = `
        INSERT INTO profilekyc (
            userId,
            aadharFront,
            aadharBack,
            panCardFront,
            profileImage
        ) VALUES (?, ?, ?, ?, ?)
    `;

  console.log("SQL Query:", query);

  // Execute the query
  db.query(
    query,
    [userId, aadharFront, aadharBack, panCardFront, profileImage],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }

      // Log the database result
      console.log("Database Insert Result:", result);

      res
        .status(200)
        .json({ message: "KYC Sent Successfully", id: result.insertId });
    }
  );
};

// const eDistrictFormData = (req, res) => {
//   const {
//     application_type,
//     samagar,
//     gender,
//     name,
//     father_husband_name,
//     dob,
//     address,
//     mobile_no,
//     cast,
//     aadhar_no,
//     samagar_member_id,
//     state,
//     annual_income,
//     previous_application,
//     charge_amount,
//     user_id,
//     status,
//   } = req.body;

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const domain = "http://localhost:7777";

//   // Handling multiple file uploads
//   const documentUpload = req.files
//     ? req.files.map((file) => `${domain}/uploads/${file.filename}`).join(",")
//     : null;

//   const orderId = `EDST${Date.now()}`;

//   const sql = `INSERT INTO \`e-district-application\` (
//       order_id, application_type, samagar, gender, name, father_husband_name, dob, address,
//       mobile_no, cast, aadhar_no, samagar_member_id, state, annual_income,
//       previous_application, documentUpload, charge_amount, user_id, status, created_at
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   const values = [
//     orderId,
//     application_type,
//     samagar,
//     gender,
//     name,
//     father_husband_name,
//     dob,
//     address,
//     mobile_no,
//     cast,
//     aadhar_no,
//     samagar_member_id,
//     state,
//     annual_income,
//     previous_application,
//     documentUpload,
//     charge_amount,
//     user_id,
//     status,
//     createdAt,
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(201).json({
//       message: "Form data submitted successfully",
//       formId: result.insertId,
//     });
//   });
// };

const eDistrictFormData = (req, res) => {
  const {
    application_type,
    samagar,
    gender,
    name,
    father_husband_name,
    dob,
    address,
    mobile_no,
    cast,
    aadhar_no,
    samagar_member_id,
    state,
    annual_income,
    previous_application,
    // charge_amount,
    amount,
    // user_id,
    userId,
    status,
  } = req.body;

  // console.log(req.body);

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const domain = "http://localhost:7777";

  // Handling multiple file uploads
  const documentUpload = req.files
    ? req.files.map((file) => `${domain}/uploads/${file.filename}`).join(",")
    : null;

  const orderId = `EDST${Date.now()}`;

  const sql = `INSERT INTO \`e-district-application\` (
      order_id, application_type, samagar, gender, name, father_husband_name, dob, address,
      mobile_no, cast, aadhar_no, samagar_member_id, state, annual_income,
      previous_application, documentUpload, charge_amount, user_id, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    orderId,
    application_type,
    samagar,
    gender,
    name,
    father_husband_name,
    dob,
    address,
    mobile_no,
    cast,
    aadhar_no,
    samagar_member_id,
    state,
    annual_income,
    previous_application,
    documentUpload,
    amount,
    userId,
    status,
    createdAt,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }

    const queryBalance = `
    SELECT Closing_Balance 
    FROM user_wallet 
    WHERE userId = ? 
    ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC 
    LIMIT 1
  `;

    db.query(queryBalance, [userId], (err, balanceResult) => {
      if (err) {
        console.error("Error fetching wallet balance:", err);
        return res.status(500).json({
          status: "Failure",
          step: "Fetch Wallet Balance",
          error: "Failed to fetch wallet balance",
          details: err.message,
        });
      }

      if (balanceResult.length === 0) {
        return res.status(404).json({
          status: "Failure",
          step: "Fetch Wallet Balance",
          message: "No balance found for the user.",
        });
      }

      const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
      if (isNaN(currentBalance)) {
        return res.status(500).json({
          status: "Failure",
          step: "Fetch Wallet Balance",
          error: "Current balance is invalid.",
        });
      }

      if (currentBalance < amount) {
        return res.status(400).json({
          status: "Failure",
          step: "Wallet Deduction",
          message: "Insufficient balance.",
          currentBalance,
          requiredAmount: amount,
        });
      }

      const newBalance = parseFloat(currentBalance - amount).toFixed(2);
      if (isNaN(newBalance)) {
        return res.status(500).json({
          status: "Failure",
          step: "Wallet Deduction",
          error: "New balance calculation is invalid.",
        });
      }

      const transactionId = `TXNW${Date.now()}`;
      const transactionDetails = `Services Deduction ${mobile_no}`;

      const updateWalletQuery = `
    INSERT INTO user_wallet 
    (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, debit_amount, Transaction_details, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

      db.query(
        updateWalletQuery,
        [
          userId,
          createdAt,
          orderId,
          transactionId,
          currentBalance.toFixed(2),
          newBalance,
          "Debit",
          amount,
          transactionDetails,
          "Success",
        ],
        (err, walletResult) => {
          if (err) {
            console.error("Error updating wallet balance:", err);
            return res.status(500).json({
              status: "Failure",
              step: "Update Wallet Balance",
              error: "Failed to update wallet balance",
              details: err.message,
            });
          }

          return res.status(200).json({
            status: "Success",
            message: "E - District processed and wallet updated successfully.",
            details: {
              offlineServices: {
                orderId,
                application_type,
                samagar,
                name,
                mobile_no,
                amount,
                status,
              },
              wallet: {
                transactionId,
                newBalance,
                previousBalance: currentBalance.toFixed(2),
                deductedAmount: amount,
              },
            },
          });
        }
      );
    });
  });
};

const getSelectedServices = (req, res) => {
  const applicationId = req.params.user_id;

  const query = `SELECT select_bank_service, status FROM apply_offline_form WHERE user_id = ?`;
  db.query(query, [applicationId], (err, results) => {
    if (err) {
      console.error("Error fetching selected services:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      const selectedServices = results.map((row) => ({
        service: row.select_bank_service,
        status: row.status,
      }));
      res.status(200).json({ selectedServices });
    }
  });
};

const getAllBranchId = (req, res) => {
  const { id } = req.params;
  const selectQuery = `SELECT * FROM apply_offline_form WHERE applicant_select_service = ? AND id = ?`;

  db.query(selectQuery, ["New Bank ID", id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching data." });
    }

    return res.status(200).json(result);
  });
};

const getEdistrictData = (req, res) => {
  const applicationId = req.params.user_id;

  const selectQuery = `SELECT * FROM \`e-district-application\` WHERE user_id = ? ORDER BY id DESC`;

  db.query(selectQuery, [applicationId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Database Error" });
    } else {
      res.status(200).json(result);
    }
  });
};

const getAllRechargeApi = (req, res) => {
  const selectQuery = `SELECT * FROM apisurl WHERE API_Status = ? AND API_for = ?`;

  db.query(selectQuery, ["Active", "Recharge"], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        status: "Failure",
        error: "An error occurred while fetching data.",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: result,
    });
  });
};

const getAllDTHeApi = (req, res) => {
  const selectQuery = `SELECT * FROM apisurl WHERE API_Status = ? AND API_for = ?`;

  db.query(selectQuery, ["Active", "DTH Connection"], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        status: "Failure",
        error: "An error occurred while fetching data.",
      });
    }

    return res.status(200).json({
      status: "Success",
      data: result,
    });
  });
};

const getApiPostRechargeData = (req, res) => {
  const userId = req.params.userId;
  const rechargeType = "Postpaid";

  let query = `SELECT * FROM recharges WHERE recharge_Type = ? AND created_by_userid = ?`;

  db.query(query, [rechargeType, userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "Failure", message: "No data found" });
    }

    return res.status(200).json({ status: "Success", data: result });
  });
};

const getApiDTHRechargeData = (req, res) => {
  const userId = req.params.userId;
  const rechargeType = "DTH";

  let query = `SELECT * FROM recharges WHERE recharge_Type = ? AND created_by_userid = ?`;

  db.query(query, [rechargeType, userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "Failure", message: "No data found" });
    }

    return res.status(200).json({ status: "Success", data: result });
  });
};

const getApiEletricityRechargeData = (req, res) => {
  const userId = req.params.userId;
  const rechargeType = "Electricity";

  let query = `SELECT * FROM recharges WHERE recharge_Type = ? AND created_by_userid = ?`;

  db.query(query, [rechargeType, userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "Failure", message: "No data found" });
    }

    return res.status(200).json({ status: "Success", data: result });
  });
};

const getApiBroadbrandRechargeData = (req, res) => {
  const userId = req.params.userId;
  const rechargeType = "Broadband";

  let query = `SELECT * FROM recharges WHERE recharge_Type = ? AND created_by_userid = ?`;

  db.query(query, [rechargeType, userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "Failure", message: "No data found" });
    }

    return res.status(200).json({ status: "Success", data: result });
  });
};

const addSambalForm = (req, res) => {
  const {
    samagraId,
    familyId,
    applicantType,
    education,
    occupation,
    smsNotification,
    incomeTaxPayer,
    landOwnership,
    govtService,
    mobileNumber,
    amount,
    userId,
  } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `ORDS${Date.now()}`;

  const sql = `
  INSERT INTO SambalForm (
    order_id, samagra_id, family_id, applicant_type, education, occupation,
    sms_notification, income_tax_payer, land_ownership, govt_service, mobile_number, amount, user_id, status, created_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  const values = [
    orderId,
    samagraId,
    familyId,
    applicantType,
    education,
    occupation,
    smsNotification,
    incomeTaxPayer,
    landOwnership,
    govtService,
    mobileNumber,
    amount,
    userId,
    "Pending",
    createdAt,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res
        .status(500)
        .json({ status: "Failure", error: "Database error" });
    }
    const queryBalance = `
    SELECT Closing_Balance 
    FROM user_wallet 
    WHERE userId = ? 
    ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC 
    LIMIT 1
  `;

    db.query(queryBalance, [userId], (err, balanceResult) => {
      if (err) {
        console.error("Error fetching wallet balance:", err);
        return res.status(500).json({
          status: "Failure",
          step: "Fetch Wallet Balance",
          error: "Failed to fetch wallet balance",
          details: err.message,
        });
      }

      if (balanceResult.length === 0) {
        return res.status(404).json({
          status: "Failure",
          step: "Fetch Wallet Balance",
          message: "No balance found for the user.",
        });
      }

      const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
      if (isNaN(currentBalance)) {
        return res.status(500).json({
          status: "Failure",
          step: "Fetch Wallet Balance",
          error: "Current balance is invalid.",
        });
      }

      if (currentBalance < amount) {
        return res.status(400).json({
          status: "Failure",
          step: "Wallet Deduction",
          message: "Insufficient balance.",
          currentBalance,
          requiredAmount: amount,
        });
      }

      const newBalance = parseFloat(currentBalance - amount).toFixed(2);
      if (isNaN(newBalance)) {
        return res.status(500).json({
          status: "Failure",
          step: "Wallet Deduction",
          error: "New balance calculation is invalid.",
        });
      }

      const transactionId = `TXNW${Date.now()}`;
      const transactionDetails = `Sambal Deduction ${mobileNumber}`;

      const updateWalletQuery = `
      INSERT INTO user_wallet 
      (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, debit_amount, Transaction_details, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      db.query(
        updateWalletQuery,
        [
          userId,
          createdAt,
          orderId,
          transactionId,
          currentBalance.toFixed(2),
          newBalance,
          "Debit",
          amount,
          transactionDetails,
          "Success",
        ],
        (err, walletResult) => {
          if (err) {
            console.error("Error updating wallet balance:", err);
            return res.status(500).json({
              status: "Failure",
              step: "Update Wallet Balance",
              error: "Failed to update wallet balance",
              details: err.message,
            });
          }

          return res.status(200).json({
            status: "Success",
            message: "Sambal Form processed and wallet updated successfully.",
            details: {
              dthConnection: {
                orderId,
                samagraId,
                familyId,
                applicantType,
                education,
                occupation,
                smsNotification,
                incomeTaxPayer,
                landOwnership,
                govtService,
                mobileNumber,
                createdAt,
              },
              wallet: {
                transactionId,
                newBalance,
                previousBalance: currentBalance.toFixed(2),
                deductedAmount: amount,
              },
            },
          });
        }
      );
    });
  });
};

// const addVerifyDistrictForm = (req, res) => {
//   const { applicationType, name, mobileNo, rsNumber, user_id } = req.body;

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const orderId = `VED${Date.now()}`;

//   const sql = `
//   INSERT INTO verifyedistrict (
//      order_id, applicationType, name, mobileNo, rsNumber, user_id, status, created_at
//   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
// `;

//   const values = [
//     orderId,
//     applicationType,
//     name,
//     mobileNo,
//     rsNumber,
//     user_id,
//     "Pending",
//     createdAt,
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error inserting data:", err);
//       return res
//         .status(500)
//         .json({ status: "Failure", error: "Database error" });
//     }
//     res.status(201).json({
//       status: "Success",
//       message: "Verify E-Districtn Form submitted successfully",
//       id: result.insertId,
//     });
//   });
// };

const addVerifyDistrictForm = (req, res) => {
  const {
    applicationType,
    name,
    mobileNo,
    rsNumber,
    district,
    tehsil,
    amount,
    userId,
  } = req.body;

  // console.log("Request Body:", req.body);

  if (!applicationType || !name || !mobileNo || !amount || !userId) {
    return res.status(400).json({
      status: "Failure",
      error: "Missing required fields.",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `VED${Date.now()}`;

  const sql = `
    INSERT INTO verifyedistrict (
      order_id, applicationType, name, mobileNo, rsNumber, district, tehsil, amount, user_id, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    orderId,
    applicationType,
    name,
    mobileNo,
    rsNumber,
    district,
    tehsil,
    amount,
    userId,
    "Pending",
    createdAt,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res
        .status(500)
        .json({ status: "Failure", error: "Database error" });
    }

    const queryBalance = `
      SELECT Closing_Balance 
      FROM user_wallet 
      WHERE userId = ? 
      ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC 
      LIMIT 1
    `;

    db.query(queryBalance, [userId], (err, balanceResult) => {
      if (err) {
        console.error("Error fetching wallet balance:", err);
        return res
          .status(500)
          .json({ status: "Failure", error: "Failed to fetch wallet balance" });
      }

      if (!balanceResult.length || isNaN(balanceResult[0].Closing_Balance)) {
        return res
          .status(404)
          .json({ status: "Failure", message: "No valid balance found." });
      }

      const currentBalance = parseFloat(balanceResult[0].Closing_Balance);

      if (currentBalance < amount) {
        return res.status(403).json({
          status: "Failure",
          message: "Insufficient balance.",
          currentBalance,
          requiredAmount: amount,
        });
      }

      const newBalance = (currentBalance - amount).toFixed(2);
      const transactionId = `TXNW${Date.now()}`;
      const transactionDetails = `Verify E-District Deduction ${mobileNo}`;

      const updateWalletQuery = `
        INSERT INTO user_wallet 
        (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, debit_amount, Transaction_details, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        updateWalletQuery,
        [
          userId,
          createdAt,
          orderId,
          transactionId,
          currentBalance,
          newBalance,
          "Debit",
          amount,
          transactionDetails,
          "Success",
        ],
        (err, walletResult) => {
          if (err) {
            console.error("Error updating wallet balance:", err);
            return res.status(500).json({
              status: "Failure",
              error: "Failed to update wallet balance",
            });
          }

          return res.status(200).json({
            status: "Success",
            message:
              "Verify E-District processed and wallet updated successfully.",
            details: {
              verify: {
                orderId,
                applicationType,
                name,
                mobileNo,
                rsNumber,
                district,
                tehsil,
                amount,
                createdAt,
              },
              wallet: {
                transactionId,
                newBalance,
                previousBalance: currentBalance,
              },
            },
          });
        }
      );
    });
  });
};

const getVerifyEdistrict = (req, res) => {
  const userId = req.params.userId;

  let query = `SELECT * FROM verifyedistrict WHERE user_id = ? ORDER BY id DESC`;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "Failure", message: "No data found" });
    }

    return res.status(200).json({ status: "Success", data: result });
  });
};

const getSambalHistory = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT sf.* 
    FROM sambalform AS sf 
    INNER JOIN user_relations AS ur 
    ON sf.user_id = ur.UserId 
    WHERE ur.distributor = ? AND ur.userType = 'Retailer'
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      return res.status(500).json({
        success: false,
        error: "Error fetching data",
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No data found",
      });
    }

    // If needed, sanitize the result (e.g., remove sensitive fields)
    const sanitizedResult = result.map(({ password, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitizedResult,
      message: "Data fetched successfully",
    });
  });
};

const PanDocumentUpload = (req, res) => {
  try {
    const {
      userId,
      agency,
      applicationDetails,
      documentCount,
      courierDate,
      trackingNumber,
      courierCompany,
      deliveryDate,
      deliveryLocation,
      confirmAddress,
      remark,
    } = req.body;

    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const orderId = `PDOC${Date.now()}`;
    const userStatus = "Pending";
    const domain = "http://localhost:7777";

    const podfile =
      req.files && req.files.podfile
        ? `${domain}/uploads/${req.files.podfile[0].filename}`
        : null;

    const sql = `
    INSERT INTO pandocument (
      order_id, userId, agency, applicationDetails, documentCount, courierDate, trackingNumber,
      courierCompany, deliveryDate, deliveryLocation, confirmAddress, remark, podfile, status, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const values = [
      orderId,
      userId,
      agency,
      applicationDetails,
      documentCount,
      courierDate,
      trackingNumber,
      courierCompany,
      deliveryDate,
      deliveryLocation,
      confirmAddress,
      remark,
      podfile,
      userStatus,
      createdAt,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ status: "Failure", error: err.message });
      }
      res.status(201).json({
        status: "Success",
        message: "Form data submitted successfully",
        formId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPanDocument = (req, res) => {
  const userId = req.params.userId;

  let query = `SELECT * FROM pandocument WHERE userId = ?`;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "Failure", message: "No data found" });
    }

    return res.status(200).json({ status: "Success", data: result });
  });
};

const walletOffline = (req, res) => {
  try {
    const {
      user_id,
      amount,
      userName,
      userPhone,
      userEmail,
      userRole,
      Payment_Mode,
      Transaction_Reference,
    } = req.body;

    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const orderId = `WOR${Date.now()}`;
    const userStatus = "Pending";
    const domain = "http://localhost:7777";

    const Receiept_Attechment =
      req.files && req.files.Receiept_Attechment
        ? `${domain}/uploads/${req.files.Receiept_Attechment[0].filename}`
        : null;

    const sql = `INSERT INTO user_wallet_add_money_request (order_id, user_id, amount, userName, userPhone, userEmail, userRole, Payment_Mode, Transaction_Reference, Receiept_Attechment, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      orderId,
      user_id,
      amount,
      userName,
      userPhone,
      userEmail,
      userRole,
      Payment_Mode,
      Transaction_Reference,
      Receiept_Attechment,
      userStatus,
      createdAt,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        message: "Form data submitted successfully",
        formId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getWalletOffline = (req, res) => {
  const userId = req.params.userId;

  let query = `SELECT * FROM user_wallet_add_money_request WHERE user_id = ?`;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "Failure", message: "No data found" });
    }

    return res.status(200).json({ status: "Success", data: result });
  });
};

const getPackageData = (req, res) => {
  const packageId = req.params.packageId;

  const sqlQuery = `SELECT * FROM packagestable WHERE id = ?`;

  db.query(sqlQuery, [packageId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "Failure", message: "No data found" });
    }

    return res.status(200).json({ status: "Success", data: result });
  });
};

const getDthConnectionPlan = (req, res) => {
  const getquery = `SELECT * FROM dth_connection_plain`;

  db.query(getquery, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    } else {
      return res.status(200).json({ status: "Success", data: result });
    }
  });
};

const getWalletSummary = (req, res) => {
  const userId = req.params.userId;

  let query = `SELECT * FROM user_wallet WHERE userId = ? ORDER BY wid  DESC`;

  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(400).json({ status: "Failure", error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "Failure", message: "No data found" });
    }

    return res.status(200).json({ status: "Success", data: result });
  });
};

const getSpecificUserTransactions = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT ur.*, t.* 
    FROM user_relations AS ur 
    INNER JOIN offline_recharge AS t 
    ON ur.UserId = t.created_by_userid 
    WHERE ur.distributor = ? AND ur.userType = 'Retailer'
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user from MySQL:", err);
      return res.status(500).json({
        success: false,
        error: "Error fetching data",
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No Data found",
      });
    }

    // Remove the password field from each user object
    const sanitizedResult = result.map(({ password, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitizedResult,
      message: "Data fetched successfully",
    });
  });
};
const getEDistrictHistory = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT ur.*, t.* 
    FROM user_relations AS ur 
    INNER JOIN \`e-district-application\` AS t 
    ON ur.UserId = t.user_id 
    WHERE ur.distributor = ? AND ur.userType = 'Retailer'
    AND t.samagar = 'Ekyc'
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user from MySQL:", err);
      return res.status(500).json({
        success: false,
        error: "Error fetching data",
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No Data found",
      });
    }

    // Remove the password field from each user object
    const sanitizedResult = result.map(({ password, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitizedResult,
      message: "Data fetched successfully",
    });
  });
};

const getVerifyEDistrictHistory = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT ur.*, t.* 
    FROM user_relations AS ur 
    INNER JOIN verifyedistrict AS t 
    ON ur.UserId = t.user_id 
    WHERE ur.distributor = ? AND ur.userType = 'Retailer'
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user from MySQL:", err);
      return res.status(500).json({
        success: false,
        error: "Error fetching data",
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No Data found",
      });
    }

    // Remove the password field from each user object
    const sanitizedResult = result.map(({ password, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitizedResult,
      message: "Data fetched successfully",
    });
  });
};
const getOfflinePan = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT ur.*, t.* 
    FROM user_relations AS ur 
    INNER JOIN pan_offline AS t 
    ON ur.UserId = t.user_id 
    WHERE ur.distributor = ? AND ur.userType = 'Retailer'
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user from MySQL:", err);
      return res.status(500).json({
        success: false,
        error: "Error fetching data",
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No Data found",
      });
    }

    // Remove the password field from each user object
    const sanitizedResult = result.map(({ password, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitizedResult,
      message: "Data fetched successfully",
    });
  });
};

const getOnlinePan = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT ur.*, t.* 
    FROM user_relations AS ur 
    INNER JOIN nsdlpan AS t 
    ON ur.UserId = t.userId
    WHERE ur.distributor = ? AND ur.userType = 'Retailer'
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user from MySQL:", err);
      return res.status(500).json({
        success: false,
        error: "Error fetching data",
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No Data found",
      });
    }

    // Remove the password field from each user object
    const sanitizedResult = result.map(({ password, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitizedResult,
      message: "Data fetched successfully",
    });
  });
};

// const raiseComplaint = (req, res) => {
//   // Destructure incoming data from the request body
//   const {
//     complainType,
//     transactionNo,
//     mobileNo,
//     remark,
//     userID,
//     response,
//     status,
//   } = req.body;

//   // Check if file is attached and get the filename, else set null
//   const attachment = req.file ? req.file.filename : null;

//   // Get the current date and time for the 'createdAt' field
//   const createdAt = new Date();

//   // Get the user ID from the URL parameter
//   const complainById = req.params.userId;

//   // Debugging: Log received data
//   console.log("Received data:", {
//     complainType,
//     transactionNo,
//     mobileNo,
//     remark,
//     attachment,
//     complainById,
//     response,
//     status,
//   });

//   // SQL query to insert complaint into the database
//   const sql = `
//     INSERT INTO complaints (
//       complainType,
//       transactionNo,
//       mobileNo,
//       remark,
//       complainFile,
//       userID,
//       response,
//       status,
//       createdAt
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   // Values to insert into the database
//   const values = [
//     complainType || null,
//     transactionNo || null,
//     mobileNo || null,
//     remark || null,
//     attachment,
//     complainById,
//     response || "Pending", // Default response status if not provided
//     status || "No response yet", // Default status if not provided
//     createdAt,
//   ];

//   // Debugging: Log SQL query and values before executing
//   console.log("Executing SQL query with values:", values);

//   // Insert data into the database
//   db.query(sql, values, (err, result) => {
//     if (err) {
//       // Debugging: Log detailed error if query fails
//       console.error("Error inserting complaint into MySQL:", err);

//       // Return a detailed error message in response
//       return res.status(500).json({
//         success: false,
//         error: `Error inserting data: ${err.message}`,
//       });
//     }

//     // Success: Return the response with the inserted complaint ID
//     console.log("Complaint raised successfully, inserted ID:", result.insertId);
//     return res.status(201).json({
//       success: true,
//       message: "Complaint raised successfully",
//       data: { id: result.insertId },
//     });
//   });
// };

const raiseComplaint = (req, res) => {
  const {
    complainType,
    transactionNo,
    mobileNo,
    remark,
    userID,
    response,
    status,
  } = req.body;

  // Set default values for response and status if not provided
  const defaultResponse = response || "Pending";
  const defaultStatus = status || "No response yet";

  // Handle file attachment, if provided
  const domain = "http://localhost:7777";
  const attachment =
    req.files && req.files.complainFile
      ? `${domain}/complainUpload/${req.files.complainFile[0].filename}`
      : null;

  // Get current date and time in Asia/Kolkata timezone
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  // SQL query to insert the complaint data into the database
  const sql = `
    INSERT INTO complaints (
      complainType,
      transactionNo,
      mobileNo,
      remark,
      complainFile,
      userID,
      response,
      status,
      createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Values to be inserted into the database
  const values = [
    complainType,
    transactionNo,
    mobileNo,
    remark,
    attachment,
    userID,
    defaultResponse,
    defaultStatus,
    createdAt,
  ];

  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting complaint into MySQL:", err);
      return res.status(500).json({
        success: false,
        error: `Error inserting data: ${err.message}`,
      });
    }

    res.status(201).json({
      success: true,
      message: "Complaint raised successfully",
      data: { id: result.insertId },
    });
  });
};

const getOfflineDTHConnection = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT ur.*, t.* 
    FROM user_relations AS ur 
    INNER JOIN offline_dth_connection AS t 
    ON ur.UserId = t.user_id
    WHERE ur.distributor = ? AND ur.userType = 'Retailer'
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user from MySQL:", err);
      return res.status(500).json({
        success: false,
        error: "Error fetching data",
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No Data found",
      });
    }

    // Remove the password field from each user object
    const sanitizedResult = result.map(({ password, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitizedResult,
      message: "Data fetched successfully",
    });
  });
};

const getOnlineDTHConnection = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT ur.*, t.* 
    FROM user_relations AS ur 
    INNER JOIN dth_connection AS t 
    ON ur.UserId = t.user_id
    WHERE ur.distributor = ? AND ur.userType = 'Retailer'
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user from MySQL:", err);
      return res.status(500).json({
        success: false,
        error: "Error fetching data",
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No Data found",
      });
    }

    // Remove the password field from each user object
    const sanitizedResult = result.map(({ password, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitizedResult,
      message: "Data fetched successfully",
    });
  });
};

const getSdOnlineRecharges = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT ur.*, t.* 
    FROM user_relations AS ur 
    INNER JOIN recharges AS t 
    ON ur.UserId = t.created_by_userid
    WHERE ur.distributor = ? AND ur.userType = 'Retailer'
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user from MySQL:", err);
      return res.status(500).json({
        success: false,
        error: "Error fetching data",
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No Data found",
      });
    }

    // Remove the password field from each user object
    const sanitizedResult = result.map(({ password, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitizedResult,
      message: "Data fetched successfully",
    });
  });
};

const getActiveUsers = (req, res) => {
  const { userId } = req.params;

  try {
    const sql = `
      SELECT ur.*, t.* 
      FROM user_relations AS ur 
      INNER JOIN userprofile AS t 
      ON ur.UserId = t.UserId 
      WHERE ur.distributor = ? 
      AND (ur.userType = 'Retailer')
      AND t.Status = 'Active'
    `;

    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching user from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching data" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: false,
            data: [],
            message: "No Active users found",
          });
        } else {
          // Remove the password field from each user object
          const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: sanitizedResult,
            message: "Active users fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching data from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching data",
      error: error.message,
    });
  }
};

const getDeactiveUsers = (req, res) => {
  const { userId } = req.params;

  try {
    const sql = `
      SELECT ur.*, t.* 
      FROM user_relations AS ur 
      INNER JOIN userprofile AS t 
      ON ur.UserId = t.UserId 
      WHERE ur.distributor = ? 
      AND (ur.userType = 'Retailer')
      AND t.Status = 'Deactive'
    `;

    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching user from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching data" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: false,
            data: [],
            message: "No Deactive users found",
          });
        } else {
          // Remove the password field from each user object
          const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: sanitizedResult,
            message: "Deactive users fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching data from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching data",
      error: error.message,
    });
  }
};

const getDistributorUsersData = (req, res) => {
  const { userId } = req.params;

  try {
    const sql = `
      SELECT ur.*, t.* 
      FROM user_relations AS ur 
      INNER JOIN userprofile AS t 
      ON ur.UserId = t.UserId 
      WHERE ur.distributor = ? 
      AND (ur.userType = 'Retailer')
    `;

    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching user from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching data" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: false,
            data: [],
            message: "No Data found",
          });
        } else {
          // Remove the password field from each user object
          const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: sanitizedResult,
            message: "Data fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching data from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching data",
      error: error.message,
    });
  }
};

const getPendingKycUsers = (req, res) => {
  const { userId } = req.params;

  try {
    const sql = `
      SELECT ur.*, t.* 
      FROM user_relations AS ur 
      INNER JOIN userprofile AS t 
      ON ur.UserId = t.UserId 
      WHERE ur.distributor = ? 
      AND (ur.userType = 'Retailer')
      AND t.Status = 'Pending'
      AND t.payment_status = 'Complete'

    `;

    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching user from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching data" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: false,
            data: [],
            message: "No Data found",
          });
        } else {
          // Remove the password field from each user object
          const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: sanitizedResult,
            message: "Data fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching data from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching data",
      error: error.message,
    });
  }
};

const getAllComplaintsData = (req, res) => {
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

const addBankDetails = (req, res) => {
  console.log("Request body received:", req.body); // Debugging line

  const {
    userId,
    bankholder_name,
    bankaccount_number,
    IFSC_code,
    bank_name,
    status,
  } = req.body;

  const createdAt = new Date();

  const sql = `
    INSERT INTO bank_details (
      userId,
      bankholder_name,
      bankaccount_number,
      IFSC_code,
      bank_name,
      status,
      created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    userId,
    bankholder_name,
    bankaccount_number,
    IFSC_code,
    bank_name,
    status,
    createdAt,
  ];

  console.log("Executing SQL query with values:", values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting bank details into MySQL:", err);
      return res.status(500).json({
        success: false,
        error: `Error inserting data: ${err.message}`,
      });
    }

    console.log(
      "Bank details added successfully, inserted ID:",
      result.insertId
    );
    return res.status(201).json({
      success: true,
      message: "Bank details added successfully",
      data: { id: result.insertId },
    });
  });
};

const deleteBankDetails = (req, res) => {
  console.log("Request received for deleting bank details:", req.params); // Debugging line

  const { bid } = req.params; // Extract the bank ID from the URL parameters

  // SQL query to delete the bank details
  const sql = `
    DELETE FROM bank_details
    WHERE bid = ?
  `;

  console.log("Executing SQL query to delete bank details with ID:", bid);

  db.query(sql, [bid], (err, result) => {
    if (err) {
      console.error("Error deleting bank details from MySQL:", err);
      return res.status(500).json({
        success: false,
        error: `Error deleting data: ${err.message}`,
      });
    }

    if (result.affectedRows === 0) {
      console.log("No bank details found with the provided ID:", bid);
      return res.status(404).json({
        success: false,
        message: "No bank details found with the provided ID",
      });
    }

    console.log(
      "Bank details deleted successfully, affected rows:",
      result.affectedRows
    );
    return res.status(200).json({
      success: true,
      message: "Bank details deleted successfully",
    });
  });
};

const getBankDetails = (req, res) => {
  const { userId } = req.params;

  const sql = "SELECT * FROM bank_details WHERE userId = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching bank details:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    return res.status(200).json(results); // Return all bank details for this user
  });
};

const getActiveBankDetails = (req, res) => {
  const { userId } = req.params;

  const sql =
    "SELECT * FROM bank_details WHERE userId = ? AND status = 'Active'";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching active bank details:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    return res.status(200).json(results); // Return only active bank details for this user
  });
};

const getBankAccountDetails = (req, res) => {
  const { bid } = req.params; // Get the 'bid' from the URL params

  // SQL query to fetch bank details for the given 'bid'
  const sql =
    "SELECT bankholder_name, bankaccount_number, IFSC_code, bank_name FROM bank_details WHERE bid = ?";

  db.query(sql, [bid], (err, results) => {
    if (err) {
      console.error("Error fetching bank account details:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    if (results.length > 0) {
      return res.status(200).json({ success: true, data: results[0] }); // Return the details of the specific bank account
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Bank account not found" });
    }
  });
};

const changePassword = (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Old password and new password are required!",
    });
  }

  // Step 1: Fetch the current password from the database
  const sqlSelect = "SELECT password FROM userprofile WHERE userId = ?";
  db.query(sqlSelect, [userId], async (err, results) => {
    if (err) {
      console.error("Error fetching current password:", err);
      return res.status(500).json({
        success: false,
        message: `Database error: ${err.message}`,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const dbPassword = results[0].password;

    // Step 2: Compare the old password with the stored password
    const isMatch = await bcrypt.compare(oldPassword, dbPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect!",
      });
    }

    // Step 3: Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Step 4: Update the password in the database
    const sqlUpdate = "UPDATE employees SET password = ? WHERE employeeId = ?";
    db.query(sqlUpdate, [hashedNewPassword, userId], (err, result) => {
      if (err) {
        console.error("Error updating password:", err);
        return res.status(500).json({
          success: false,
          message: `Failed to update password: ${err.message}`,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Password changed successfully!",
      });
    });
  });
};

const getNsdlPanCorrectionHistory = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT ur.*, t.* 
    FROM user_relations AS ur 
    INNER JOIN nsdlpancorrection AS t 
    ON ur.UserId = t.userId
    WHERE ur.distributor = ? AND ur.userType = 'Retailer'
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(
        "Error fetching NSDL PAN correction history from MySQL:",
        err
      );
      return res.status(500).json({
        success: false,
        error: "Error fetching data",
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No Data found",
      });
    }

    // Remove the password field from each user object
    const sanitizedResult = result.map(({ password, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitizedResult,
      message: "Data fetched successfully",
    });
  });
};

// Helper function to send OTP email to the admin (start verify otp section)
// const sendOtpEmail = async (email, otp) => {
//   const mailOptions = {
//     from: `"Your OTP Service" <${process.env.EMAILSENDER}>`,
//     to: email,
//     subject: "Verify Bank OTP",
//     text: `Your Verify Bank OTP code is: ${otp}`,
//     html: `<b>Your Verify Bank OTP code is: ${otp}</b>`,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: %s", info.messageId);
//   } catch (error) {
//     console.error("Error sending OTP email:", error);
//     throw error;
//   }
// };

// Function to generate a random 6-digit OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString(); // Generate OTP between 100000 and 999999
};

// Send OTP to admin's email for verification
const sendOtpForVerification = async (userEmail) => {
  const otp = generateOtp(); // Generate OTP

  try {
    // Send OTP to admin's email
    await sendOtpEmail(userEmail, otp);

    // Store OTP temporarily for verification (can be stored in a DB for production)
    otpStore[userEmail] = otp;

    console.log(`OTP sent to ${userEmail}: ${otp}`);
  } catch (error) {
    console.error("Error in sending OTP:", error);
    throw error;
  }
};

const VerifyOtpEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"Your Verify bank account OTP" <${process.env.EMAILSENDER}>`,
      to: email,
      subject: "Verify bank account OTP",
      text: `Your Verify bank account code is: ${otp}`,
      html: `<b>Your Verify bank account code is: ${otp}</b>`,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const getPendingPaymentUsers = (req, res) => {
  const { userId } = req.params;

  try {
    const sql = `
      SELECT ur.*, t.* 
      FROM user_relations AS ur 
      INNER JOIN userprofile AS t 
      ON ur.UserId = t.UserId 
      WHERE ur.distributor = ? 
      AND (ur.userType = 'Retailer')
      AND t.payment_status = 'Pending'
    `;

    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching user from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error fetching data" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: false,
            data: [],
            message: "No Data found",
          });
        } else {
          // Remove the password field from each user object
          const sanitizedResult = result.map(({ password, ...rest }) => rest);

          return res.status(200).json({
            success: true,
            data: sanitizedResult,
            message: "Data fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching data from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching data",
      error: error.message,
    });
  }
};

//  (start verify otp section)

const bankotpStore = new Map();
const changeBankStatus = async (req, res) => {
  const { UserId, bid } = req.body;

  if (!UserId || !bid) {
    return res.status(400).json({
      status: "Failure",
      message: "UserId is required",
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

      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();
      const otpHash = await bcrypt.hash(otp, 10); // Hash the OTP

      // Store OTP hash and expiration time in the store
      bankotpStore.set(user.UserId, {
        otpHash,
        bid,
        expiresAt: Date.now() + 5 * 60 * 1000,
      });

      // Send OTP to the user's email
      await VerifyOtpEmail(user.Email, otp);

      return res.status(200).json({
        status: "Success",
        message: "OTP sent to your email. Please verify it.",
      });
    });
  } catch (error) {
    console.error("Error processing Verify bank account OTP request:", error);
    return res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

// Verify OTP entered by user
const verifyOtpAndChangeBankStatus = async (req, res) => {
  const { UserId, otp } = req.body;

  if (!UserId || !otp) {
    return res.status(400).json({
      status: "Failure",
      message: "UserId and OTP are required",
    });
  }

  try {
    const otpData = bankotpStore.get(UserId);

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
    console.log("Bank status Updated:", otpData.bid);

    const bid = otpData.bid;
    // Hash the new password and update it in the database
    // const hashedPassword = await bcrypt.hash(otpData.newPassword, 10);
    const updateBankStatus = `UPDATE bank_details SET status = "Active" WHERE bid = ?`;

    db.query(updateBankStatus, [bid], (updateErr) => {
      if (updateErr) {
        console.error("Error updating Bank status:", updateErr);
        return res
          .status(500)
          .json({ status: "Failure", message: "Failed to change Bank status" });
      }

      // Clear OTP data from the store after password reset
      bankotpStore.delete(UserId);

      return res.status(200).json({
        status: "Success",
        message: "Bank status changed successfully",
      });
    });
  } catch (error) {
    console.error("Error processing OTP verification:", error);
    return res
      .status(500)
      .json({ status: "Failure", message: "Internal server error" });
  }
};

//  (End verify otp section)

const getWalletBalance = (req, res) => {
  const { userId } = req.params;

  try {
    const sql =
      "SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1";

    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error fetching data from MySQL:", err);
        return res.status(500).json({
          success: false,
          error: "Error fetching data",
        });
      }

      // Check if the result is empty
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          data: null,
          message: "No data found",
        });
      }

      // Return the closing balance
      return res.status(200).json({
        success: true,
        data: result[0].Closing_Balance,
        message: "Data fetched successfully",
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      success: false,
      message: "Unexpected error occurred",
      error: error.message,
    });
  }
};

// const submitWithdrawalRequest = (req, res) => {
//   const { userId, bid, amount, reason } = req.body;

//   if (!userId || !bid || !amount || amount < 500) {
//     return res.status(400).json({
//       success: false,
//       message:
//         "Invalid request. Ensure userId, bid, and amount (>= 500) are provided.",
//     });
//   }

//   try {
//     const getWalletBalanceQuery =
//       "SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1";
//     db.query(getWalletBalanceQuery, [userId], (err, result) => {
//       if (err) {
//         console.error("Error fetching wallet balance:", err);
//         return res
//           .status(500)
//           .json({ success: false, message: "Failed to fetch wallet balance." });
//       }

//       if (result.length === 0 || result[0].Closing_Balance < amount) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Insufficient wallet balance." });
//       }

//       const newBalance = result[0].Closing_Balance - amount;
//       const insertWithdrawalQuery =
//         "INSERT INTO withdrawal_requests (userId, bid, amount, reason, status) VALUES (?, ?, ?, ?, ?)";
//       const updateWalletQuery =
//         "INSERT INTO user_wallet (userId, Closing_Balance) VALUES (?, ?)";

//       db.beginTransaction((err) => {
//         if (err) {
//           console.error("Transaction error:", err);
//           return res
//             .status(500)
//             .json({ success: false, message: "Failed to start transaction." });
//         }

//         // Insert withdrawal request
//         db.query(
//           insertWithdrawalQuery,
//           [userId, bid, amount, reason, "Pending"],
//           (err, result) => {
//             if (err) {
//               return db.rollback(() => {
//                 console.error("Error inserting withdrawal request:", err);
//                 res
//                   .status(500)
//                   .json({
//                     success: false,
//                     message: "Failed to submit withdrawal request.",
//                   });
//               });
//             }

//             // Update wallet balance
//             db.query(updateWalletQuery, [userId, newBalance], (err, result) => {
//               if (err) {
//                 return db.rollback(() => {
//                   console.error("Error updating wallet balance:", err);
//                   res
//                     .status(500)
//                     .json({
//                       success: false,
//                       message: "Failed to update wallet balance.",
//                     });
//                 });
//               }

//               db.commit((err) => {
//                 if (err) {
//                   return db.rollback(() => {
//                     console.error("Commit error:", err);
//                     res
//                       .status(500)
//                       .json({
//                         success: false,
//                         message: "Failed to complete transaction.",
//                       });
//                   });
//                 }

//                 res.status(200).json({
//                   success: true,
//                   message: "Withdrawal request submitted successfully.",
//                   newBalance,
//                 });
//               });
//             });
//           }
//         );
//       });
//     });
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Unexpected error occurred." });
//   }
// };

const SdWithdrawOrApproveWalletRequest = (req, res) => {
  try {
    const { userId, amount, transaction_details, status, order_id, remark } =
      req.body;

    if (!status || (!userId && !order_id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing required fields",
      });
    }

    const process_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    if (status === "approve") {
      // Approve wallet withdrawal request logic
      const Transaction_Id = `TXNW${Date.now()}`;

      const sql1 = `UPDATE user_wallet_withdraw_request 
                    SET remark = ?, Transaction_Id = ?, process_date = ?, status = ? 
                    WHERE order_id = ?`;
      const values1 = [remark, Transaction_Id, process_date, status, order_id];

      db.query(sql1, values1, (error, results) => {
        if (error) {
          console.error(
            "Error updating Approve Wallet Withdraw Request:",
            error
          );
          return res.status(500).json({
            success: false,
            error: "Failed to update Approve Wallet Withdraw Request",
          });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({
            success: false,
            message: "Wallet Withdraw Request not found",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Wallet Withdraw Request approved successfully",
        });
      });
    } else if (status === "withdraw") {
      // Withdraw wallet money directly logic

      if (
        amount == null ||
        isNaN(parseFloat(amount)) ||
        parseFloat(amount) < 0
      ) {
        return res.status(400).json({
          success: false,
          error: "Invalid or missing amount",
        });
      }

      const AmountNumber = parseFloat(amount);
      const Transaction_Type = "Debit";
      const transaction_date = moment()
        .tz("Asia/Kolkata")
        .format("YYYY-MM-DD HH:mm:ss");
      const Order_Id = `ORW${Date.now()}`;
      const Transaction_Id = `TXNW${Date.now()}`;

      const getClosingBalanceQuery = `SELECT Closing_Balance 
                                      FROM user_wallet 
                                      WHERE userId = ? 
                                      ORDER BY wid DESC 
                                      LIMIT 1`;

      db.query(getClosingBalanceQuery, [userId], (error, results) => {
        if (error) {
          console.error("Error fetching closing balance:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to fetch closing balance",
          });
        }

        if (results.length === 0) {
          return res.status(404).json({
            success: false,
            message: "User has no wallet money",
          });
        }

        const old_balance = results[0].Closing_Balance || 0;

        if (isNaN(old_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid closing balance in user wallet",
          });
        }

        const opening_balance = Number(old_balance);
        const credit_amount = 0;
        const debit_amount = AmountNumber;
        let new_balance = opening_balance - debit_amount;

        if (isNaN(opening_balance) || isNaN(new_balance)) {
          return res.status(400).json({
            success: false,
            error: "Invalid balance calculations",
          });
        }

        new_balance = parseFloat(new_balance.toFixed(2));

        if (opening_balance < debit_amount) {
          return res.status(404).json({
            success: false,
            message: "Insufficient wallet balance to process this transaction",
          });
        }

        const sql2 = `INSERT INTO user_wallet 
                      (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, 
                      credit_amount, debit_amount, Transaction_Type, transaction_details, status) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values2 = [
          userId,
          transaction_date,
          Order_Id,
          Transaction_Id,
          opening_balance,
          new_balance,
          credit_amount,
          debit_amount,
          Transaction_Type,
          transaction_details,
          status,
        ];

        db.query(sql2, values2, (error, results) => {
          if (error) {
            console.error("Error inserting into user_wallet:", error);
            return res.status(500).json({
              success: false,
              error: "Failed to insert into user_wallet",
            });
          }

          return res.status(200).json({
            success: true,
            message: "Withdraw wallet money processed successfully",
          });
        });
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Invalid status value",
      });
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred",
    });
  }
};

// const walletToWalletTransfer = (req, res) => {
//   try {
//     const { senderId, receiverId, amount, transactionDetails } = req.body;

//     // Validate sender and receiver IDs
//     if (!senderId || !receiverId || senderId === receiverId) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid or missing sender or receiver ID",
//       });
//     }

//     const walletTxnDetails = `wallet Transfer userId ${receiverId}`;
//     const walletTxnDetailsReciver = `wallet money recieved from userId ${senderId}`;

//     // Validate `amount`: Check for undefined, null, or invalid number
//     if (
//       amount == null ||
//       isNaN(parseFloat(amount)) ||
//       parseFloat(amount) <= 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         error: "Invalid or missing amount",
//       });
//     }

//     const transferAmount = parseFloat(amount);

//     const transactionDate = moment()
//       .tz("Asia/Kolkata")
//       .format("YYYY-MM-DD HH:mm:ss");
//     const orderId = `ORW${Date.now()}`;
//     const transactionId = `TXNW${Date.now()}`;
//     const transactionType = "Transfer";

//     // Query to get the sender's current closing balance
//     const getSenderBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;

//     db.query(getSenderBalanceQuery, [senderId], (error, senderResults) => {
//       if (error) {
//         console.error("Error fetching sender balance:", error);
//         return res.status(500).json({
//           success: false,
//           error: "Failed to fetch sender balance",
//         });
//       }

//       const senderBalance = senderResults.length
//         ? parseFloat(senderResults[0].Closing_Balance)
//         : 0;

//       // Check if sender has sufficient balance
//       if (senderBalance < transferAmount) {
//         return res.status(400).json({
//           success: false,
//           error: "Insufficient balance for transfer",
//         });
//       }

//       const newSenderBalance = parseFloat(
//         (senderBalance - transferAmount).toFixed(2)
//       );

//       // Query to get the receiver's current closing balance
//       db.query(
//         getSenderBalanceQuery,
//         [receiverId],
//         (error, receiverResults) => {
//           if (error) {
//             console.error("Error fetching receiver balance:", error);
//             return res.status(500).json({
//               success: false,
//               error: "Failed to fetch receiver balance",
//             });
//           }

//           const receiverBalance = receiverResults.length
//             ? parseFloat(receiverResults[0].Closing_Balance)
//             : 0;
//           const newReceiverBalance = parseFloat(
//             (receiverBalance + transferAmount).toFixed(2)
//           );

//           // SQL queries to update both sender's and receiver's wallets
//           const insertTransactionQuery = `
//           INSERT INTO user_wallet (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, credit_amount, debit_amount, Transaction_Type, Transaction_details, status)
//           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//           const senderValues = [
//             senderId,
//             transactionDate,
//             orderId,
//             transactionId,
//             senderBalance,
//             newSenderBalance,
//             0,
//             transferAmount,
//             transactionType,
//             walletTxnDetails,
//             "Success",
//           ];

//           const receiverValues = [
//             receiverId,
//             transactionDate,
//             orderId,
//             transactionId,
//             receiverBalance,
//             newReceiverBalance,
//             transferAmount,
//             0,
//             transactionType,
//             walletTxnDetailsReciver,
//             "Success",
//           ];

//           // Execute transaction queries for sender and receiver
//           db.query(insertTransactionQuery, senderValues, (error) => {
//             if (error) {
//               console.error("Error updating sender wallet:", error);
//               return res.status(500).json({
//                 success: false,
//                 error: "Failed to update sender wallet",
//               });
//             }

//             db.query(insertTransactionQuery, receiverValues, (error) => {
//               if (error) {
//                 console.error("Error updating receiver wallet:", error);
//                 return res.status(500).json({
//                   success: false,
//                   error: "Failed to update receiver wallet",
//                 });
//               }

//               return res.status(200).json({
//                 success: true,
//                 message: "Wallet-to-wallet transfer successful",
//                 transactionId,
//                 orderId,
//               });
//             });
//           });
//         }
//       );
//     });
//   } catch (error) {
//     console.error("Unexpected error:", error);
//     return res.status(500).json({
//       success: false,
//       error: "An unexpected error occurred",
//     });
//   }
// };

const walletToWalletTransfer = (req, res) => {
  try {
    const {
      receiver_name,
      sender_name,
      senderId,
      receiverId,
      amount,
      transactionDetails,
    } = req.body;

    // Validate sender and receiver IDs
    if (!senderId || !receiverId || senderId === receiverId) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing sender or receiver ID",
      });
    }

    const walletTxnDetails = `wallet Transfer userId ${receiverId}`;
    const walletTxnDetailsReciver = `wallet money received from userId ${senderId}`;

    // Validate `amount`
    if (
      amount == null ||
      isNaN(parseFloat(amount)) ||
      parseFloat(amount) <= 0
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing amount",
      });
    }

    const transferAmount = parseFloat(amount);

    const transactionDate = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");
    const orderId = `ORW${Date.now()}`;
    const transactionId = `TXNW${Date.now()}`;
    const transactionTypeReciver = "Credit";
    const transactionType = `Debit`;

    // Query to get the sender's current closing balance
    const getSenderBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;

    db.query(getSenderBalanceQuery, [senderId], (error, senderResults) => {
      if (error) {
        console.error("Error fetching sender balance:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to fetch sender balance",
        });
      }

      const senderBalance = senderResults.length
        ? parseFloat(senderResults[0].Closing_Balance)
        : 0;

      // Check if sender has sufficient balance
      if (senderBalance < transferAmount) {
        return res.status(400).json({
          success: false,
          error: "Insufficient balance for transfer",
        });
      }

      const newSenderBalance = parseFloat(
        (senderBalance - transferAmount).toFixed(2)
      );

      // Query to get the receiver's current closing balance
      db.query(
        getSenderBalanceQuery,
        [receiverId],
        (error, receiverResults) => {
          if (error) {
            console.error("Error fetching receiver balance:", error);
            return res.status(500).json({
              success: false,
              error: "Failed to fetch receiver balance",
            });
          }

          const receiverBalance = receiverResults.length
            ? parseFloat(receiverResults[0].Closing_Balance)
            : 0;
          const newReceiverBalance = parseFloat(
            (receiverBalance + transferAmount).toFixed(2)
          );

          // SQL queries to update both sender's and receiver's wallets
          const insertTransactionQuery = `
          INSERT INTO user_wallet (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, credit_amount, debit_amount, Transaction_Type, Transaction_details, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

          const senderValues = [
            senderId,

            transactionDate,
            orderId,
            transactionId,
            senderBalance,
            newSenderBalance,
            0,
            transferAmount,
            transactionType,
            walletTxnDetails,
            "Success",
          ];

          const receiverValues = [
            receiverId,

            transactionDate,
            orderId,
            transactionId,
            receiverBalance,
            newReceiverBalance,
            transferAmount,
            0,
            transactionTypeReciver,
            walletTxnDetailsReciver,
            "Success",
          ];

          // Execute transaction queries for sender and receiver
          db.query(insertTransactionQuery, senderValues, (error) => {
            if (error) {
              console.error("Error updating sender wallet:", error);
              return res.status(500).json({
                success: false,
                error: "Failed to update sender wallet",
              });
            }

            db.query(insertTransactionQuery, receiverValues, (error) => {
              if (error) {
                console.error("Error updating receiver wallet:", error);
                return res.status(500).json({
                  success: false,
                  error: "Failed to update receiver wallet",
                });
              }

              // Insert into `wallet_to_wallet_transfer` table
              const insertWalletTransferQuery = `
                INSERT INTO wallet_to_wallet_transfer 
                (receiver_id, receiver_name, sender_id, sender_name, amount, order_id, transaction_id, transaction_details, status, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `;

              const walletTransferValues = [
                receiverId,
                receiver_name, // Replace with actual receiver name
                senderId,
                sender_name, // Replace with actual sender name
                transferAmount,
                orderId,
                transactionId,
                transactionDetails,
                "Success",
                transactionDate,
              ];

              db.query(
                insertWalletTransferQuery,
                walletTransferValues,
                (error) => {
                  if (error) {
                    console.error(
                      "Error inserting into wallet_to_wallet_transfer table:",
                      error
                    );
                    return res.status(500).json({
                      success: false,
                      error:
                        "Wallet transfer completed, but failed to log the transfer details",
                    });
                  }

                  return res.status(200).json({
                    success: true,
                    message: "Wallet-to-wallet transfer successful",
                    transactionId,
                    orderId,
                  });
                }
              );
            });
          });
        }
      );
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred",
    });
  }
};

const getWalletToWalletTransfer = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch wallet-to-wallet transfer records for the user
  const sql = `
    SELECT * 
    FROM wallet_to_wallet_transfer 
    WHERE sender_id = ? 
    ORDER BY id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching wallet-to-wallet transfer records:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    }); // Return the transfer records for the given user
  });
};

const WalletWithdraw = (req, res) => {
  try {
    const {
      userId,
      username,
      userPhone,
      userEmail,
      userRole,
      reason,
      bankaccount_number,
      bankholder_name,
      IFSC_code,
      bank_name,
      amount,
      amountToCredited,
      Transactoion_Type,
      status,
    } = req.body;

    const order_id = `ORDW${Date.now()}`;

    // Validate order_id and required fields
    if (!order_id || !status || !userId) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing data",
      });
    }

    // Validate Amount
    if (
      amount == null ||
      isNaN(parseFloat(amount)) ||
      parseFloat(amount) <= 0
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing amount",
      });
    }
    // Validate Amount
    if (
      amountToCredited == null ||
      isNaN(parseFloat(amountToCredited)) ||
      parseFloat(amountToCredited) <= 0
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing amountToCredited",
      });
    }

    const AmountNumber = parseFloat(amount).toFixed(2);
    const AmountToCreditedNumber = parseFloat(amountToCredited).toFixed(2);

    const Transaction_Id = `TXNW${Date.now()}`;
    const Transaction_Type = "Debit";
    const Transaction_details = `Wallet Withdraw request Order Id ${order_id}`;
    const transaction_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");
    const process_date = moment()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss");

    // Query to get the user's current closing balance from the user_wallet table
    const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;

    db.query(getClosingBalanceQuery, [userId], (error, results) => {
      if (error) {
        console.error("Error fetching closing balance:", error);
        return res.status(500).json({
          success: false,
          error: "Failed to fetch closing balance",
        });
      }

      const old_balance = results.length !== 0 ? results[0].Closing_Balance : 0;

      // Ensure old_balance is a valid number
      if (isNaN(old_balance)) {
        return res.status(400).json({
          success: false,
          error: "Invalid closing balance in user wallet",
        });
      }

      const opening_balance = Number(old_balance);
      const credit_amount = 0;
      const debit_amount = AmountToCreditedNumber;
      let new_balance = opening_balance - debit_amount;

      // Ensure all calculated balances are valid numbers
      if (
        isNaN(opening_balance) ||
        isNaN(credit_amount) ||
        isNaN(new_balance)
      ) {
        return res.status(400).json({
          success: false,
          error: "Invalid balance calculations",
        });
      }

      new_balance = parseFloat(new_balance.toFixed(2)); // Convert back to a number

      if (opening_balance < debit_amount) {
        return res.status(404).json({
          success: false,
          message:
            "User has insufficient wallet money to process this transaction",
        });
      }

      // SQL query to insert into user_wallet_withdraw_request table
      const sql1 = `INSERT INTO user_wallet_withdraw_request (order_id, user_id, amount, userName, userPhone, userEmail, userRole, withdrawReason, bankholder_name, bankaccount_number, IFSC_code, bank_name, status, Transactoion_Type, created_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values1 = [
        order_id,
        userId,
        amount,
        username,
        userPhone,
        userEmail,
        userRole,
        reason,
        bankholder_name,
        bankaccount_number,
        IFSC_code,
        bank_name,
        status,
        Transactoion_Type,
        process_date,
      ];

      db.query(sql1, values1, (error, results) => {
        if (error) {
          console.error("Error Withdraw wallet Money Request:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to Withdraw wallet Money Request",
          });
        }

        // SQL query to update the user_wallet table with new balance
        const walletStatus = "Success";
        const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, credit_amount, debit_amount, Transaction_Type, Transaction_details, status) 
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values2 = [
          userId,
          transaction_date,
          order_id,
          Transaction_Id,
          opening_balance,
          new_balance,
          credit_amount,
          debit_amount,
          Transaction_Type,
          Transaction_details,
          walletStatus,
        ];

        db.query(sql2, values2, (error, results) => {
          if (error) {
            console.error("Error inserting into user_wallet:", error);
            return res.status(500).json({
              success: false,
              error: "Failed to insert into the user_wallet",
            });
          }

          return res.status(200).json({
            success: true,
            message:
              "Withdraw wallet Money request added and updated wallet balance successfully in both tables",
          });
        });
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
};

const getWalletWithdrawHistory = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch wallet withdrawal records for the user
  const sql = `
    SELECT * 
    FROM user_wallet_withdraw_request 
    WHERE user_id = ? 
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching wallet withdrawal history:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    }); // Return the withdrawal records for the given user
  });
};

const getAllCommission = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch commission records for the user
  const sql = `
    SELECT * 
    FROM commission_table 
    WHERE distributor_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching commission data:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    }); // Return the commission records for the given user
  });
};

// const buyId = (req, res) => {
//   const {
//     // bid,
//     userId,
//     number_of_userId,
//     userId_amount,
//     userId_type,
//     bought_date,
//     total_amount,
//     payment_method,
//   } = req.body;

//   // Validate the request data
//   if (
//     // !bid ||
//     !userId ||
//     !number_of_userId ||
//     !userId_amount ||
//     !userId_type ||
//     !bought_date ||
//     !total_amount ||
//     !payment_method
//   ) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   // Generate transactionId and orderId
//   const transactionId = `TXNW${Date.now()}`;
//   const orderId = `ORD${Date.now()}`;

//   // Query to insert data into userid_bought_summary table
//   const insertQuery = `
//     INSERT INTO userid_bought_summary ( userId, number_of_userId, userId_amount, userId_type, orderId, transactionId, bought_date, total_amount, payment_method)
//     VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   // Execute the insert query for the purchase
//   db.query(
//     insertQuery,
//     [
//       // bid,
//       userId,
//       number_of_userId,
//       userId_amount,
//       userId_type,
//       orderId,
//       transactionId,
//       bought_date,
//       total_amount,
//       payment_method,
//     ],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting purchase:", err);
//         return res
//           .status(500)
//           .json({ message: "Failed to save the purchase." });
//       }

//       // After successful purchase, update user profile
//       const updateQuery = `
//         UPDATE userprofile
//         SET
//           remaining_whitelable_id = CASE WHEN ? = 'whiteLabel' THEN remaining_whitelable_id + ? ELSE remaining_whitelable_id END,
//           remaining_superDistributor_id = CASE WHEN ? = 'superDistributor' THEN remaining_superDistributor_id + ? ELSE remaining_superDistributor_id END,
//           remaining_distributor_id = CASE WHEN ? = 'distributor' THEN remaining_distributor_id + ? ELSE remaining_distributor_id END,
//           remaining_retailer_id = CASE WHEN ? = 'retailer' THEN remaining_retailer_id + ? ELSE remaining_retailer_id END
//         WHERE userId = ?
//       `;

//       const updateParams = [
//         userId_type,
//         number_of_userId,
//         userId_type,
//         number_of_userId,
//         userId_type,
//         number_of_userId,
//         userId_type,
//         number_of_userId,
//         userId,
//       ];

//       // Log the query and parameters for debugging
//       console.log("Executing update query:", updateQuery);
//       console.log("With parameters:", updateParams);

//       db.query(updateQuery, updateParams, (updateErr, updateResult) => {
//         if (updateErr) {
//           console.error("Error updating user profile:", updateErr);
//           return res
//             .status(500)
//             .json({ message: "Failed to update user profile." });
//         }

//         // Successful response after purchase and update
//         return res.status(200).json({
//           success: true, // Add this field
//           message:
//             "User ID purchase saved and user profile updated successfully.",
//           purchaseId: result.insertId,
//           orderId,
//           transactionId,
//         });
//       });
//     }
//   );
// };

const buyId = (req, res) => {
  const {
    userId,
    number_of_userId,
    userId_amount,
    userId_type,

    total_amount,
    payment_method,
  } = req.body;

  // Validate the request data
  if (
    !userId ||
    !number_of_userId ||
    !userId_amount ||
    !userId_type ||
    !total_amount ||
    !payment_method
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Generate transactionId and orderId
  const transactionId = `TXNW${Date.now()}`;
  const orderId = `ORD${Date.now()}`;

  const bought_date = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  // Query to get the user's current closing balance from the user_wallet table
  const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;

  // Execute the query to fetch closing balance
  db.query(getClosingBalanceQuery, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching closing balance:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch closing balance",
      });
    }

    const old_balance = results.length !== 0 ? results[0].Closing_Balance : 0;

    // Ensure old_balance is a valid number
    if (isNaN(old_balance)) {
      return res.status(400).json({
        success: false,
        error: "Invalid closing balance in user wallet",
      });
    }

    const opening_balance = Number(old_balance);

    // Validate Amount: Check for undefined, null, or invalid number
    if (
      total_amount == null ||
      isNaN(parseFloat(total_amount)) ||
      parseFloat(total_amount) < 0
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing  amount",
      });
    }

    const AmountNumber = Number(parseFloat(total_amount).toFixed(2));

    // Ensure that the user has enough balance to make the purchase
    if (opening_balance < AmountNumber) {
      return res.status(404).json({
        success: false,
        message:
          "User has insufficient wallet money to process this transaction",
      });
    }

    // Proceed with the purchase logic

    // Query to insert data into userid_bought_summary table
    const insertQuery = `
      INSERT INTO userid_bought_summary (userId, number_of_userId, userId_amount, userId_type, orderId, transactionId, bought_date, total_amount, payment_method)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Execute the insert query for the purchase
    db.query(
      insertQuery,
      [
        userId,
        number_of_userId,
        userId_amount,
        userId_type,
        orderId,
        transactionId,
        bought_date,
        AmountNumber,
        payment_method,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting purchase:", err);
          return res
            .status(500)
            .json({ message: "Failed to save the purchase." });
        }

        // After successful purchase, update user profile
        const updateQuery = `
          UPDATE userprofile
          SET 
            remaining_whitelable_id = CASE WHEN ? = 'whiteLabel' THEN remaining_whitelable_id + ? ELSE remaining_whitelable_id END,
            remaining_superDistributor_id = CASE WHEN ? = 'superDistributor' THEN remaining_superDistributor_id + ? ELSE remaining_superDistributor_id END,
            remaining_distributor_id = CASE WHEN ? = 'distributor' THEN remaining_distributor_id + ? ELSE remaining_distributor_id END,
            remaining_retailer_id = CASE WHEN ? = 'retailer' THEN remaining_retailer_id + ? ELSE remaining_retailer_id END
          WHERE userId = ?
        `;

        const updateParams = [
          userId_type,
          number_of_userId,
          userId_type,
          number_of_userId,
          userId_type,
          number_of_userId,
          userId_type,
          number_of_userId,
          userId,
        ];

        // Log the query and parameters for debugging
        console.log("Executing update query:", updateQuery);
        console.log("With parameters:", updateParams);

        db.query(updateQuery, updateParams, (updateErr, updateResult) => {
          if (updateErr) {
            console.error("Error updating user profile:", updateErr);
            return res
              .status(500)
              .json({ message: "Failed to update user profile." });
          }

          // Update wallet balance (deduct amount)
          const new_balance = opening_balance - AmountNumber;
          const walletStatus = "Success";
          const walletUpdateQuery = `
            INSERT INTO user_wallet (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, credit_amount, debit_amount, Transaction_Type, Transaction_details, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const walletUpdateParams = [
            userId,
            bought_date,
            orderId,
            transactionId,
            opening_balance,
            new_balance,
            0, // No credit, since it's a debit
            AmountNumber,
            "Debit",
            `Purchase of ${number_of_userId} ${userId_type}`,
            walletStatus,
          ];

          db.query(
            walletUpdateQuery,
            walletUpdateParams,
            (walletErr, walletResult) => {
              if (walletErr) {
                console.error("Error updating wallet balance:", walletErr);
                return res.status(500).json({
                  success: false,
                  error: "Failed to update wallet balance.",
                });
              }

              return res.status(200).json({
                success: true,
                message:
                  "User ID purchase saved and wallet balance updated successfully.",
                purchaseId: result.insertId,
                orderId,
                transactionId,
              });
            }
          );
        });
      }
    );
  });
};

const getRemainingIds = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch the remaining IDs for the given user
  const sql = `
    SELECT remaining_whitelable_id, remaining_superDistributor_id, remaining_distributor_id, remaining_retailer_id
    FROM userprofile  
    WHERE userId = ?
     ORDER BY createAt DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching remaining IDs data:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: results[0], // Assuming only one user will match the userId
    });
  });
};

const getBoughtUserId = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch bought user ID records for the user
  const sql = `
    SELECT * 
    FROM userid_bought_summary
    WHERE userId = ?
    ORDER BY bid DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching bought user ID data:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    }); // Return the bought user ID records for the given user
  });
};

const updateUserProfile = (req, res) => {
  // Extracting data from request body
  const { userId, userId_type } = req.body;

  // Validate input
  if (!userId || !userId_type) {
    return res.status(400).json({ message: "Missing required parameters." });
  }

  const number_of_userId = 1;

  // Prepare the SQL query
  const updateQuery = `
    UPDATE userprofile
    SET 
      remaining_whitelable_id = CASE WHEN ? = 'whiteLabel' THEN remaining_whitelable_id - ? ELSE remaining_whitelable_id END,
      remaining_superDistributor_id = CASE WHEN ? = 'superDistributor' THEN remaining_superDistributor_id - ? ELSE remaining_superDistributor_id END,
      remaining_distributor_id = CASE WHEN ? = 'distributor' THEN remaining_distributor_id - ? ELSE remaining_distributor_id END,
      remaining_retailer_id = CASE WHEN ? = 'retailer' THEN remaining_retailer_id - ? ELSE remaining_retailer_id END
    WHERE userId = ?
  `;

  // Parameters for the query
  const updateParams = [
    userId_type, // Role for whiteLabel
    number_of_userId, // Number to decrement for whiteLabel
    userId_type, // Role for superDistributor
    number_of_userId, // Number to decrement for superDistributor
    userId_type, // Role for distributor
    number_of_userId, // Number to decrement for distributor
    userId_type, // Role for retailer
    number_of_userId, // Number to decrement for retailer
    userId, // UserId for where clause
  ];

  // Log the query and parameters for debugging
  console.log("Executing update query:", updateQuery);
  console.log("With parameters:", updateParams);

  // Execute the query
  db.query(updateQuery, updateParams, (updateErr, updateResult) => {
    if (updateErr) {
      console.error("Error updating user profile:", updateErr);
      return res.status(500).json({
        success: false,
        message: "Failed to update user profile.",
      });
    }

    // Success response
    if (updateResult.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully.",
    });
  });
};

const getAllPartner = (req, res) => {
  console.log("Request body:", req.body); // Log the full body to check its content

  const { userId } = req.params; // Get the userId from the request body

  console.log("Received userId:", userId); // Log the userId to ensure it's being received correctly

  // SQL query to fetch only the necessary partner fields based on the created_By_User_Id
  const sql = `
    SELECT *
    FROM userprofile 
    WHERE created_By_User_Id = ? 
    ORDER BY CreateAt DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching commission data:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    });
  });
};
const getProfileImage = (req, res) => {
  console.log("Request params:", req.params); // Log the params to check its content
  const { userId } = req.params; // Expect userId as a query parameter

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId is required in the query parameters",
    });
  }

  // SQL query to check if the user with the given userId exists
  const sql = `
    SELECT * 
    FROM userprofile 
    WHERE userId = ? 
    LIMIT 1
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching profile data:", err);
      return res.status(500).json({
        success: false,
        error: "An error occurred while processing your request",
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: false,
        message: "User ID not found",
      });
    }

    // If the record exists
    return res.status(200).json({
      success: true,
      message: "User ID exists",
      data: result[0],
    });
  });
};

const getAllMonthCommission = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch commission records for the user from the last month
  const sql = `
    SELECT * 
    FROM commission_table 
    WHERE distributor_id = ? 
      AND created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching commission data:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    }); // Return the commission records for the last month
  });
};

const getTodaysCommission = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch commission records for the user for the current day
  const sql = `
    SELECT * 
    FROM commission_table 
    WHERE distributor_id = ? 
      AND DATE(created_at) = CURDATE()  
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching commission data:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    }); // Return the commission records for the current day
  });
};

const getUserDetails = (req, res) => {
  const { userId } = req.params;

  // Ensure userId is provided
  if (!userId) {
    return res.status(400).json({
      success: false,
      error: "User ID is required",
    });
  }

  const sql = "SELECT * FROM userprofile WHERE userId = ?";

  // Execute the SQL query
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user details:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    // If no results are found
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      data: results[0], // Assuming you want to return a single user
    });
  });
};

const getCoupanHistory = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT ur.*, t.* 
    FROM user_relations AS ur 
    INNER JOIN pan_coupon_requests AS t 
    ON ur.UserId = t.user_id 
    WHERE ur.distributor = ? AND ur.userType = 'Retailer'
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching user from MySQL:", err);
      return res.status(500).json({
        success: false,
        error: "Error fetching data",
      });
    }

    if (result.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No Data found",
      });
    }

    // Remove the password field from each user object
    const sanitizedResult = result.map(({ password, ...rest }) => rest);

    return res.status(200).json({
      success: true,
      data: sanitizedResult,
      message: "Data fetched successfully",
    });
  });
};

const getUserNotification = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch notification records for the user
  const sql = `
    SELECT * 
    FROM user_notification `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching notification data:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: results,
    }); // Return the notification records for the given user
  });
};

module.exports = {
  applyOfflineForm,
  // getApplyOfflineFormByid,
  getApplyOfflineForm,
  updateApplyOfflineForm,
  bankidForm,
  offlineRecharge,
  getRechargeData,
  getApiRechargeData,
  offlineDthConnection,
  panFromData,
  nsdlTransactionNewRequest,
  nsdlTransactionCorrection,
  panFourZeroGetAPI,
  complainInsertApi,
  complainGetData,
  profileInfo,
  profileUserKyc,
  eDistrictFormData,
  getSelectedServices,
  getAllBranchId,
  getEdistrictData,
  getAllRechargeApi,
  getAllDTHeApi,
  getApiPostRechargeData,
  getApiDTHRechargeData,
  getApiEletricityRechargeData,
  getApiBroadbrandRechargeData,
  addSambalForm,
  addVerifyDistrictForm,
  getVerifyEdistrict,
  getSambalHistory,
  PanDocumentUpload,
  getPanDocument,
  walletOffline,
  getWalletOffline,
  getPackageData,
  getDthConnectionPlan,
  getWalletSummary,
  getSpecificUserTransactions,
  getEDistrictHistory,
  getVerifyEDistrictHistory,
  getOfflinePan,
  getOnlinePan,
  raiseComplaint,
  getOfflineDTHConnection,
  getOnlineDTHConnection,
  getSdOnlineRecharges,
  getActiveUsers,
  getDistributorUsersData,
  getDeactiveUsers,
  getPendingKycUsers,
  getAllComplaintsData,
  addBankDetails,
  getBankDetails,
  getBankAccountDetails,
  changePassword,
  getNsdlPanCorrectionHistory,
  deleteBankDetails,
  sendOtpForVerification,
  verifyOtpAndChangeBankStatus,
  changeBankStatus,
  getPendingPaymentUsers,
  getActiveBankDetails,
  getWalletBalance,
  // submitWithdrawalRequest,
  SdWithdrawOrApproveWalletRequest,
  walletToWalletTransfer,
  getWalletToWalletTransfer,
  WalletWithdraw,
  getWalletWithdrawHistory,
  getAllCommission,
  buyId,
  getRemainingIds,
  getBoughtUserId,
  updateUserProfile,
  getAllPartner,
  getProfileImage,
  getAllMonthCommission,
  getTodaysCommission,
  getApplyOfflineFormById,
  getUserDetails,
  getCoupanHistory,
  getUserNotification,
};
