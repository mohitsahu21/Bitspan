const { getDataFromClientApi } = require("../../APIS URL/instpayApis");
const { db } = require("../../connect");
const moment = require("moment-timezone");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

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
// const applyOfflineForm = (req, res) => {
//   const {
//     applicant_name,
//     applicant_father,
//     applicant_number,
//     email,
//     applicant_select_service,
//     other,
//     eStampAmount,
//     amount,
//     userId,
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

//   const orderId = `ORF${Date.now()}`;

//   const status = "Pending";

//   const query = `
//         INSERT INTO apply_offline_form (
//         order_id,
//             applicant_name,
//             applicant_father,
//             applicant_number,
//                 email,
//             applicant_select_service,
//             other,
//                 eStampAmount,
//     amount,
//             attached_form,
//             attached_photo,
//             attached_sign,
//             attached_kyc,
//             status,
//             	user_id,
//             created_at
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//   db.query(
//     query,
//     [
//       orderId,
//       applicant_name,
//       applicant_father,
//       applicant_number,
//       email,
//       applicant_select_service,
//       other,
//       eStampAmount,
//       amount,
//       attached_form,
//       attached_photo,
//       attached_sign,
//       attached_kyc,
//       status,
//       userId,
//       createdAt,
//     ],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting data into MySQL:", err);
//         res.status(500).json({ error: "Database error" });
//         return;
//       }

//       const queryBalance = `
//       SELECT Closing_Balance
//       FROM user_wallet
//       WHERE userId = ?
//       ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
//       LIMIT 1
//     `;

//       db.query(queryBalance, [userId], (err, balanceResult) => {
//         if (err) {
//           console.error("Error fetching wallet balance:", err);
//           return res.status(500).json({
//             status: "Failure",
//             step: "Fetch Wallet Balance",
//             error: "Failed to fetch wallet balance",
//             details: err.message,
//           });
//         }

//         if (balanceResult.length === 0) {
//           return res.status(404).json({
//             status: "Failure",
//             step: "Fetch Wallet Balance",
//             message: "No balance found for the user.",
//           });
//         }

//         const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
//         if (isNaN(currentBalance)) {
//           return res.status(500).json({
//             status: "Failure",
//             step: "Fetch Wallet Balance",
//             error: "Current balance is invalid.",
//           });
//         }

//         if (currentBalance < amount) {
//           return res.status(400).json({
//             status: "Failure",
//             step: "Wallet Deduction",
//             message: "Insufficient balance.",
//             currentBalance,
//             requiredAmount: amount,
//           });
//         }

//         const newBalance = parseFloat(currentBalance - amount).toFixed(2);
//         if (isNaN(newBalance)) {
//           return res.status(500).json({
//             status: "Failure",
//             step: "Wallet Deduction",
//             error: "New balance calculation is invalid.",
//           });
//         }

//         const transactionId = `TXNW${Date.now()}`;
//         const transactionDetails = `Services Deduction ${applicant_number}`;
//         const creditAmt = 0;

//         const updateWalletQuery = `
//         INSERT INTO user_wallet
//         (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `;

//         db.query(
//           updateWalletQuery,
//           [
//             userId,
//             createdAt,
//             orderId,
//             transactionId,
//             currentBalance.toFixed(2),
//             newBalance,
//             "Debit",
//             creditAmt,
//             amount,
//             transactionDetails,
//             "Success",
//           ],
//           (err, walletResult) => {
//             if (err) {
//               console.error("Error updating wallet balance:", err);
//               return res.status(500).json({
//                 status: "Failure",
//                 step: "Update Wallet Balance",
//                 error: "Failed to update wallet balance",
//                 details: err.message,
//               });
//             }

//             return res.status(200).json({
//               status: "Success",
//               message:
//                 "Other Services processed and wallet updated successfully.",
//               details: {
//                 offlineServices: {
//                   orderId,
//                   applicant_name,
//                   applicant_father,
//                   applicant_number,
//                   email,
//                   applicant_select_service,
//                   amount,
//                 },
//                 wallet: {
//                   transactionId,
//                   newBalance,
//                   previousBalance: currentBalance.toFixed(2),
//                   deductedAmount: amount,
//                 },
//               },
//             });
//           }
//         );
//       });
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
    userId,
  } = req.body;
  let { amount } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const domain = process.env.domain;
  const attached_form = req.files.attached_form
    ? `${domain}/uploads/${req.files.attached_form[0].filename}`
    : null;
  const attached_photo = req.files.attached_photo
    ? `${domain}/uploads/${req.files.attached_photo[0].filename}`
    : null;
  const attached_sign = req.files.attached_sign
    ? `${domain}/uploads/${req.files.attached_sign[0].filename}`
    : null;
  const attached_kyc = req.files.attached_kyc
    ? req.files.attached_kyc
        .map((file) => `${domain}/uploads/${file.filename}`)
        .join(",")
    : null;

  const orderId = `ORF${Date.now()}`;
  const status = "Pending";

  const queryBalance = `
    SELECT Closing_Balance 
    FROM user_wallet 
    WHERE userId = ? 
    ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC 
    LIMIT 1
  `;

  // Step 1: Check Wallet Balance
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

    // Validate `Amount`: Check for undefined, null, or invalid number
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(500).json({
        success: false,
        status: "Failure",
        error: "Invalid or missing amount",
      });
    }

    amount = parseFloat(parseFloat(amount).toFixed(2)); // Ensures it's a number with two decimal places

    if (currentBalance < amount) {
      return res.status(400).json({
        status: "Failure",
        step: "Wallet Deduction",
        message: "Insufficient balance.",
        currentBalance,
        requiredAmount: amount,
      });
    }

    // Step 2: Update Wallet
    const newBalance = parseFloat(currentBalance - amount).toFixed(2);

    const transactionId = `TXNW${Date.now()}`;
    const transactionDetails = `${applicant_select_service} Services Deduction Order Id ${orderId}`;
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

        // Step 3: Insert into apply_offline_form
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
              console.error(
                "Error inserting data into apply_offline_form:",
                err
              );
              return res.status(500).json({
                status: "Failure",
                step: "Insert Apply Offline Form",
                error: "Failed to insert data into apply_offline_form",
                details: err.message,
              });
            }

            // Success Response
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
      }
    );
  });
};

const update_applyOfflineForm = (req, res) => {
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
    order_id,
    previous_attached_photo,
    previous_attached_kyc,
    previous_attached_form,
    previous_attached_sign,
  } = req.body;

  const updated_at = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const domain = process.env.domain;
  const attached_form = req.files.attached_form
    ? `${domain}/uploads/${req.files.attached_form[0].filename}`
    : previous_attached_form;
  const attached_photo = req.files.attached_photo
    ? `${domain}/uploads/${req.files.attached_photo[0].filename}`
    : previous_attached_photo;
  const attached_sign = req.files.attached_sign
    ? `${domain}/uploads/${req.files.attached_sign[0].filename}`
    : previous_attached_sign;
  // const attached_kyc = req.files.attached_kyc
  //   ? `${domain}/uploads/${req.files.attached_kyc[0].filename}`
  //   : null;
  const attached_kyc = req.files.attached_kyc
    ? req.files.attached_kyc
        .map((file) => `${domain}/uploads/${file.filename}`)
        .join(",")
    : previous_attached_kyc;

  // const orderId = `ORF${Date.now()}`;

  const status = "Pending";

  const query = `
         UPDATE apply_offline_form SET
            applicant_name = ?,
            applicant_father = ?,
            applicant_number = ?,
                email = ?,
            applicant_select_service = ?,
            other = ?,
                eStampAmount = ?,
    amount = ?,
            attached_form = ?,
            attached_photo = ?,
            attached_sign = ?,
            attached_kyc = ?,
            status = ?,
            	user_id = ?,
            updated_at = ? WHERE order_id = ?`;

  db.query(
    query,
    [
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
      updated_at,
      order_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Form not found" });
        return;
      }

      return res.status(200).json({
        status: "Success",
        message: "Update Form Successfully",
      });
    }
  );
};

// const getApplyOfflineFormByid = (req, res) => {
//   const userId = req.params.id; // Extracting the id from the request parameters
//   const query = `SELECT * FROM apply_offline_form WHERE user_id = ?`;

//   db.query(query, [userId], (err, result) => {
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

const getApplyOfflineFormByid = (req, res) => {
  const userId = req.params.id; // Extract user ID from request params

  // if (!userId || isNaN(userId)) {
  //   return res.status(400).json({ error: "Invalid user ID" });
  // }

  const query = `SELECT * FROM apply_offline_form WHERE user_id = ? ORDER BY id DESC`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error getting data from MySQL:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No forms found for this user" });
    }

    return res.status(200).json(results); // Return all forms for the user
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

// const bankidForm = (req, res) => {
//   const {
//     applicant_name,
//     applicant_father,
//     applicant_mother,
//     applicant_number,
//     email,
//     applicant_select_service,
//     select_bank_service,
//     aadhar_card,
//     pan_card,
//     business_name,
//     status,
//     amount,
//     userId,
//   } = req.body;

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//   const domain = "http://localhost:7777";
//   const attached_photo = req.files.attached_photo
//     ? `${domain}/uploads/${req.files.attached_photo[0].filename}`
//     : null;

//   const attached_kyc = req.files.attached_kyc
//     ? req.files.attached_kyc
//         .map((file) => `${domain}/uploads/${file.filename}`)
//         .join(",")
//     : null;
//   const bank_passbook = req.files.bank_passbook
//     ? `${domain}/uploads/${req.files.bank_passbook[0].filename}`
//     : null;
//   const shop_photo = req.files.shop_photo
//     ? `${domain}/uploads/${req.files.shop_photo[0].filename}`
//     : null;
//   const electric_bill = req.files.electric_bill
//     ? `${domain}/uploads/${req.files.electric_bill[0].filename}`
//     : null;

//   const orderId = `BNK${Date.now()}`;
//   // const orderId = `BNK${createdAt}`;

//   const query = `
//         INSERT INTO apply_offline_form (
//         order_id,
//             applicant_name,
//     applicant_father,
//     applicant_mother,
//     applicant_number,
//     email,
//     applicant_select_service,
//     select_bank_service,
//     aadhar_card,
//     pan_card,
//     business_name,
//     attached_photo,
//     attached_kyc,
//     bank_passbook,
//     shop_photo,
//     electric_bill,
//     status,
//     amount,
//     user_id,
//     created_at
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//   db.query(
//     query,
//     [
//       orderId,
//       applicant_name,
//       applicant_father,
//       applicant_mother,
//       applicant_number,
//       email,
//       applicant_select_service,
//       select_bank_service,
//       aadhar_card,
//       pan_card,
//       business_name,
//       attached_photo,
//       attached_kyc,
//       bank_passbook,
//       shop_photo,
//       electric_bill,
//       "Pending",
//       amount,
//       userId,
//       createdAt,
//     ],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting data into MySQL:", err);
//         res.status(500).json({ error: "Database error" });
//         return;
//       }

//       const queryBalance = `
//         SELECT Closing_Balance
//         FROM user_wallet
//         WHERE userId = ?
//         ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
//         LIMIT 1
//       `;

//       db.query(queryBalance, [userId], (err, balanceResult) => {
//         if (err) {
//           console.error("Error fetching wallet balance:", err);
//           return res.status(500).json({
//             status: "Failure",
//             step: "Fetch Wallet Balance",
//             error: "Failed to fetch wallet balance",
//             details: err.message,
//           });
//         }

//         if (balanceResult.length === 0) {
//           return res.status(404).json({
//             status: "Failure",
//             step: "Fetch Wallet Balance",
//             message: "No balance found for the user.",
//           });
//         }

//         const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
//         if (isNaN(currentBalance)) {
//           return res.status(500).json({
//             status: "Failure",
//             step: "Fetch Wallet Balance",
//             error: "Current balance is invalid.",
//           });
//         }

//         if (currentBalance < amount) {
//           return res.status(400).json({
//             status: "Failure",
//             step: "Wallet Deduction",
//             message: "Insufficient balance.",
//             currentBalance,
//             requiredAmount: amount,
//           });
//         }

//         const newBalance = parseFloat(currentBalance - amount).toFixed(2);
//         if (isNaN(newBalance)) {
//           return res.status(500).json({
//             status: "Failure",
//             step: "Wallet Deduction",
//             error: "New balance calculation is invalid.",
//           });
//         }

//         const transactionId = `TXNW${Date.now()}`;
//         const transactionDetails = `Recharge Deduction ${applicant_number}`;

//         const updateWalletQuery = `
//           INSERT INTO user_wallet
//           (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, debit_amount, Transaction_details, status)
//           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         db.query(
//           updateWalletQuery,
//           [
//             userId,
//             createdAt,
//             orderId,
//             transactionId,
//             currentBalance.toFixed(2),
//             newBalance,
//             "Debit",
//             amount,
//             transactionDetails,
//             "Success",
//           ],
//           (err, walletResult) => {
//             if (err) {
//               console.error("Error updating wallet balance:", err);
//               return res.status(500).json({
//                 status: "Failure",
//                 step: "Update Wallet Balance",
//                 error: "Failed to update wallet balance",
//                 details: err.message,
//               });
//             }

//             return res.status(200).json({
//               status: "Success",
//               message: "Bank ID processed and wallet updated successfully.",
//               details: {
//                 bankid: {
//                   orderId,
//                   applicant_name,
//                   applicant_number,
//                   email,
//                   applicant_select_service,
//                   select_bank_service,
//                   business_name,
//                   createdAt,
//                 },
//                 wallet: {
//                   transactionId,
//                   newBalance,
//                   previousBalance: currentBalance.toFixed(2),
//                   deductedAmount: amount,
//                 },
//               },
//             });
//           }
//         );
//       });
//     }
//   );
// };

// first check the wallet then update wallet balance then insert transaction.
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
    userId,
  } = req.body;
  let { amount } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const domain = process.env.domain;
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

  // Step 1: Check Wallet Balance
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

    // Validate `Amount`: Check for undefined, null, or invalid number
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(500).json({
        success: false,
        status: "Failure",
        error: "Invalid or missing amount",
      });
    }

    amount = parseFloat(parseFloat(amount).toFixed(2)); // Ensures it's a number with two decimal places
    if (currentBalance < amount) {
      return res.status(400).json({
        status: "Failure",
        step: "Wallet Deduction",
        message: "Insufficient balance.",
        currentBalance,
        requiredAmount: amount,
      });
    }

    // Step 2: Update Wallet
    const newBalance = parseFloat(currentBalance - amount).toFixed(2);

    const transactionId = `TXNW${Date.now()}`;
    const transactionDetails = `Purchase ${select_bank_service} Bank ID Form Deduction Order id ${orderId}`;
    const creditAmt = 0;

    const updateWalletQuery = `
      INSERT INTO user_wallet 
      (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount,debit_amount, Transaction_details, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)
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

        // Step 3: Insert into apply_offline_form
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
              return res.status(500).json({
                status: "Failure",
                step: "Insert Form Data",
                error: "Database error",
                details: err.message,
              });
            }

            // Success Response
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
      }
    );
  });
};

const update_bankidForm = (req, res) => {
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
    previous_attached_photo,
    previous_attached_kyc,
    previous_bank_passbook,
    previous_shop_photo,
    previous_electric_bill,
    id,
  } = req.body;

  // console.log(req.files.attached_photo)
  // console.log(req.files.attached_kyc)
  // console.log(req.files.bank_passbook)
  // console.log(req.files.shop_photo)
  // console.log(req.files.electric_bill)
  const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const domain = process.env.domain;
  const attached_photo = req.files.attached_photo
    ? `${domain}/uploads/${req.files.attached_photo[0].filename}`
    : previous_attached_photo;

  const attached_kyc = req.files.attached_kyc
    ? req.files.attached_kyc
        .map((file) => `${domain}/uploads/${file.filename}`)
        .join(",")
    : previous_attached_kyc;
  const bank_passbook = req.files.bank_passbook
    ? `${domain}/uploads/${req.files.bank_passbook[0].filename}`
    : previous_bank_passbook;
  const shop_photo = req.files.shop_photo
    ? `${domain}/uploads/${req.files.shop_photo[0].filename}`
    : previous_shop_photo;
  const electric_bill = req.files.electric_bill
    ? `${domain}/uploads/${req.files.electric_bill[0].filename}`
    : previous_electric_bill;

  // const orderId = `BNK${Date.now()}`;
  // const orderId = `BNK${createdAt}`;

  const query = `
        UPDATE apply_offline_form SET
            applicant_name = ?,
    applicant_father = ?,
    applicant_mother = ?,
    applicant_number = ?,
    email = ?,
    applicant_select_service = ?,
    select_bank_service = ?,
    aadhar_card = ?,
    pan_card = ?,
    business_name = ?,
    attached_photo = ?,
    attached_kyc = ?,
    bank_passbook = ?,
    shop_photo = ?,
    electric_bill = ?,
    status = ?,
    amount = ?,
    user_id = ?,
    updated_at = ? WHERE id = ?`;

  db.query(
    query,
    [
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
      updatedAt,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Form not found" });
        return;
      }

      return res.status(200).json({
        status: "Success",
        message: "Update Form Successfully",
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

const getOfflineRecharge = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;

    const userId = req.params.userId;
    const rechargeType = req.params.rechargeType;
    const sql = `SELECT * FROM offline_recharge WHERE recharge_Type = ? AND created_by_userid = ? ORDER BY id DESC`;

    db.query(sql, [rechargeType, userId], (err, result) => {
      if (err) {
        console.error("Error getOfflineRecharge from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getOfflineRecharge" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getOfflineRecharge found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getOfflineRecharge fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getOfflineRecharge from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getOfflineRecharge",
      error: error.message,
    });
  }
};

const getOfflineDTHConnection = (req, res) => {
  try {
    // const sql = `SELECT * FROM apply_offline_form ORDER BY id DESC`;
    // const sql = `SELECT c.*, u.UserName , u.role , u.ContactNo , u.Email FROM apply_offline_form c LEFT JOIN userprofile u  ON c.user_id = u.UserId ORDER BY id DESC`;

    const userId = req.params.userId;
    const sql = `SELECT * FROM offline_dth_connection WHERE user_id = ? ORDER BY id DESC`;

    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error("Error getOfflineRecharge from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getOfflineRecharge" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getOfflineRecharge found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getOfflineRecharge fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getOfflineRecharge from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getOfflineRecharge",
      error: error.message,
    });
  }
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

// const panFromData = (req, res) => {
//   const {
//     application_type,
//     applicant_type,
//     select_title,
//     name,
//     father_name,
//     mother_name,
//     dob,
//     gender,
//     office_address,
//     aadhar_details,
//     Address_Communication_OfficeResident,
//     alternative_communication_Address,
//     mobile_no,
//     email_id,
//     pin_code,
//     state,
//     Change_Request,
//     pantype,
//     amount,
//     userId,
//     status,
//     note,
//   } = req.body;

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const domain = "http://localhost:7777";

//   // console.log("Request body:", req.body);
//   // console.log("Uploaded files:", req.files);

//   // Handle files carefully
//   const documentUpload =
//     req.files && req.files.documentUpload
//       ? req.files.documentUpload
//           .map((file) => `${domain}/uploads/${file.filename}`)
//           .join(",")
//       : null;

//   const attachment_form =
//     req.files && req.files.attachment_form
//       ? `${domain}/uploads/${req.files.attachment_form[0].filename}`
//       : null;

//   const attachment_photo =
//     req.files && req.files.attachment_photo
//       ? `${domain}/uploads/${req.files.attachment_photo[0].filename}`
//       : null;

//   const attachment_signature =
//     req.files && req.files.attachment_signature
//       ? `${domain}/uploads/${req.files.attachment_signature[0].filename}`
//       : null;

//   const orderId = `PANZ${Date.now()}`;

//   const sql = `INSERT INTO pan_offline (
//     order_id, application_type, select_title, name, father_name, mother_name, dob, gender, office_address, aadhar_details,
//     Address_Communication_OfficeResident, alternative_communication_Address, mobile_no, email_id, pin_code, state,
//     Change_Request, pantype, documentUpload, attachment_form, attachment_signature, attachment_photo, Charge_Amount, user_id,
//     status, note, created_at
//   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   const values = [
//     orderId,
//     application_type,
//     select_title,
//     name,
//     father_name,
//     mother_name,
//     dob,
//     gender,
//     office_address,
//     aadhar_details,
//     Address_Communication_OfficeResident,
//     alternative_communication_Address,
//     mobile_no,
//     email_id,
//     pin_code,
//     state,
//     Change_Request,
//     pantype,
//     documentUpload,
//     attachment_form,
//     attachment_signature,
//     attachment_photo,
//     amount,
//     userId,
//     status,
//     note,
//     createdAt,
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ error: err.message });
//     }
//     // res.status(201).json({
//     //   message: "Form data submitted successfully",
//     //   formId: result.insertId,
//     // });

//     const queryBalance = `
//     SELECT Closing_Balance
//     FROM user_wallet
//     WHERE userId = ?
//     ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
//     LIMIT 1
//   `;

//     db.query(queryBalance, [userId], (err, balanceResult) => {
//       if (err) {
//         console.error("Error fetching wallet balance:", err);
//         return res.status(500).json({
//           status: "Failure",
//           step: "Fetch Wallet Balance",
//           error: "Failed to fetch wallet balance",
//           details: err.message,
//         });
//       }

//       if (balanceResult.length === 0) {
//         return res.status(404).json({
//           status: "Failure",
//           step: "Fetch Wallet Balance",
//           message: "No balance found for the user.",
//         });
//       }

//       const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
//       if (isNaN(currentBalance)) {
//         return res.status(500).json({
//           status: "Failure",
//           step: "Fetch Wallet Balance",
//           error: "Current balance is invalid.",
//         });
//       }

//       if (currentBalance < amount) {
//         return res.status(400).json({
//           status: "Failure",
//           step: "Wallet Deduction",
//           message: "Insufficient balance.",
//           currentBalance,
//           requiredAmount: amount,
//         });
//       }

//       const newBalance = parseFloat(currentBalance - amount).toFixed(2);
//       if (isNaN(newBalance)) {
//         return res.status(500).json({
//           status: "Failure",
//           step: "Wallet Deduction",
//           error: "New balance calculation is invalid.",
//         });
//       }

//       const transactionId = `TXNW${Date.now()}`;
//       const transactionDetails = `Pan 4.0 Deduction ${mobile_no}`;
//       const creditAmt = 0;

//       const updateWalletQuery = `
//       INSERT INTO user_wallet
//       (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//       db.query(
//         updateWalletQuery,
//         [
//           userId,
//           createdAt,
//           orderId,
//           transactionId,
//           currentBalance.toFixed(2),
//           newBalance,
//           "Debit",
//           creditAmt,
//           amount,
//           transactionDetails,
//           "Success",
//         ],
//         (err, walletResult) => {
//           if (err) {
//             console.error("Error updating wallet balance:", err);
//             return res.status(500).json({
//               status: "Failure",
//               step: "Update Wallet Balance",
//               error: "Failed to update wallet balance",
//               details: err.message,
//             });
//           }

//           return res.status(200).json({
//             status: "Success",
//             message: "Pan 4.0 processed and wallet updated successfully.",
//             details: {
//               dthConnection: {
//                 orderId,
//                 application_type,
//                 select_title,
//                 name,
//                 dob,
//                 gender,
//                 mobile_no,
//                 email_id,
//                 createdAt,
//               },
//               wallet: {
//                 transactionId,
//                 newBalance,
//                 previousBalance: currentBalance.toFixed(2),
//                 deductedAmount: amount,
//               },
//             },
//           });
//         }
//       );
//     });
//   });
// };

const panFromData = (req, res) => {
  const {
    application_type,
    applicant_type,
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
    userId,
    status,
    note,
  } = req.body;

  let { amount } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const domain = process.env.domain;

  // Handle file uploads
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

  // Step 1: Check user's current balance
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

    if (balanceResult.length === 0) {
      return res
        .status(404)
        .json({ status: "Failure", message: "No balance found for the user." });
    }

    const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
    if (isNaN(currentBalance)) {
      return res
        .status(500)
        .json({ status: "Failure", error: "Current balance is invalid." });
    }

    // Validate `Amount`: Check for undefined, null, or invalid number
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(500).json({
        success: false,
        status: "Failure",
        error: "Invalid or missing amount",
      });
    }

    amount = parseFloat(parseFloat(amount).toFixed(2)); // Ensures it's a number with two decimal places

    if (currentBalance < amount) {
      return res.status(400).json({
        status: "Failure",
        message: "Insufficient balance.",
        currentBalance,
        requiredAmount: amount,
      });
    }

    // Step 2: Deduct the amount and update wallet
    const newBalance = parseFloat(currentBalance - amount).toFixed(2);
    const transactionId = `TXNW${Date.now()}`;
    const transactionDetails = `Pan 4.0 Deduction Order Id${orderId}`;
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
            error: "Failed to update wallet balance",
          });
        }

        // Step 3: Insert PAN form data after successful balance deduction
        const insertFormQuery = `
          INSERT INTO pan_offline (
            order_id, application_type,applicant_type, select_title, name, father_name, mother_name, dob, gender, office_address, 
            aadhar_details, Address_Communication_OfficeResident, alternative_communication_Address, mobile_no, email_id, 
            pin_code, state, Change_Request, pantype, documentUpload, attachment_form, attachment_signature, 
            attachment_photo, Charge_Amount, user_id, status, note, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const formValues = [
          orderId,
          application_type,
          applicant_type,
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

        db.query(insertFormQuery, formValues, (err, result) => {
          if (err) {
            console.error("Error inserting form data:", err);
            return res.status(500).json({
              status: "Failure",
              error: "Failed to insert form data",
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
        });
      }
    );
  });
};

const UpdatePanFromData = (req, res) => {
  const {
    application_type,
    applicant_type,
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
    status,
    note,
    previous_documentUpload,
    previous_attachment_form,
    previous_attachment_photo,
    previous_attachment_signature,
    order_id,
  } = req.body;

  const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const domain = process.env.domain;

  // Handle file uploads
  const documentUpload =
    req.files && req.files.documentUpload
      ? req.files.documentUpload
          .map((file) => `${domain}/uploads/${file.filename}`)
          .join(",")
      : previous_documentUpload;

  const attachment_form =
    req.files && req.files.attachment_form
      ? `${domain}/uploads/${req.files.attachment_form[0].filename}`
      : previous_attachment_form;

  const attachment_photo =
    req.files && req.files.attachment_photo
      ? `${domain}/uploads/${req.files.attachment_photo[0].filename}`
      : previous_attachment_photo;

  const attachment_signature =
    req.files && req.files.attachment_signature
      ? `${domain}/uploads/${req.files.attachment_signature[0].filename}`
      : previous_attachment_signature;

  // const orderId = `PANZ${Date.now()}`;

  const insertFormQuery = `
          UPDATE pan_offline SET 
            application_type = ?,applicant_type = ?, select_title = ?, name = ?, father_name = ?, mother_name = ?, dob = ?, gender = ?, office_address = ?, 
            aadhar_details = ?, Address_Communication_OfficeResident = ?, alternative_communication_Address = ?, mobile_no = ?, email_id = ?, 
            pin_code = ?, state = ?, Change_Request = ?, documentUpload = ?, attachment_form = ?, attachment_signature = ?, 
            attachment_photo = ?, status = ?, note = ?, updated_at = ?  WHERE order_id = ?`;

  const formValues = [
    application_type,
    applicant_type,
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
    documentUpload,
    attachment_form,
    attachment_signature,
    attachment_photo,
    status,
    note,
    updatedAt,
    order_id,
  ];

  db.query(insertFormQuery, formValues, (err, result) => {
    if (err) {
      console.error("Error inserting form data:", err);
      return res.status(500).json({
        status: "Failure",
        error: "Failed to insert form data",
      });
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Form not found" });
      return;
    }

    return res.status(200).json({
      status: "Success",
      message: "Update Form Successfully",
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
  const domain = process.env.domain;
  const status = "Pending";

  const complainFile =
    req.files && req.files.complainFile
      ? `${domain}/complainUpload/${req.files.complainFile[0].filename}`
      : null;

  const insertquery = `INSERT INTO complaindata (complainType, transactionNo, mobileNo, remark, complainFile, userID, createdAt, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

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
    const domain = process.env.domain;

    // Extract uploaded file paths
    const aadharFront = req.files?.aadharFront?.[0]?.filename
      ? `${domain}/profile-data/${req.files.aadharFront[0].filename}`
      : null;

    const aadharBack = req.files?.aadharBack?.[0]?.filename
      ? `${domain}/profile-data/${req.files.aadharBack[0].filename}`
      : null;

    const panCardFront = req.files?.panCardFront?.[0]?.filename
      ? `${domain}/profile-data/${req.files.panCardFront[0].filename}`
      : null;

    // Check if at least one file is uploaded
    if (!aadharFront && !aadharBack && !panCardFront) {
      return res.status(400).json({
        status: "Failure",
        error: "No files were uploaded",
      });
    }

    // Extract UserId from params
    const { UserId } = req.params;

    if (!UserId) {
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

    // Construct and execute the SQL query
    const updateQuery = `UPDATE userprofile SET ${updateFields.join(
      ", "
    )} WHERE UserId = ?`;
    updateValues.push(UserId);

    db.query(updateQuery, updateValues, (err, result) => {
      if (err) {
        console.error(`Error updating record: ${err.message}`);
        return res.status(500).json({
          status: "Failure",
          error: "Database error occurred",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: "Failure",
          error: "No user found with the given UserId",
        });
      }

      res.status(200).json({
        status: "Success",
        message: "Profile updated successfully",
        updatedFields: updateFields.map((field) => field.split(" ")[0]), // List updated fields
      });
    });
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
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
  console.log("Request Body:", req.body); // Log the body
  console.log("Request Files:", req.files);
  const { userId } = req.body;

  if (
    !userId ||
    !req.files ||
    !req.files.aadharFront ||
    !req.files.aadharBack ||
    !req.files.panCardFront
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const domain = process.env.domain;
  const aadharFront = req.files.aadharFront
    ? `${domain}/profile-data/${req.files.aadharFront[0].filename}`
    : null;
  const aadharBack = req.files.aadharBack
    ? `${domain}/profile-data/${req.files.aadharBack[0].filename}`
    : null;
  const panCardFront = req.files.panCardFront
    ? `${domain}/profile-data/${req.files.panCardFront[0].filename}`
    : null;

  const query = `
        INSERT INTO profilekyc (
            userId,
            aadharFront,
            aadharBack,
            panCardFront
        ) VALUES (?, ?, ?, ?)
    `;

  db.query(
    query,
    [userId, aadharFront, aadharBack, panCardFront],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }

      res
        .status(200)
        .json({ message: "KYC Send Successfully", id: result.insertId });
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
//     // charge_amount,
//     amount,
//     // user_id,
//     userId,
//     status,
//   } = req.body;

//   // console.log(req.body);

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
//     amount,
//     userId,
//     status,
//     createdAt,
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Database error:", err);
//       return res.status(500).json({ error: err.message });
//     }

//     const queryBalance = `
//     SELECT Closing_Balance
//     FROM user_wallet
//     WHERE userId = ?
//     ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
//     LIMIT 1
//   `;

//     db.query(queryBalance, [userId], (err, balanceResult) => {
//       if (err) {
//         console.error("Error fetching wallet balance:", err);
//         return res.status(500).json({
//           status: "Failure",
//           step: "Fetch Wallet Balance",
//           error: "Failed to fetch wallet balance",
//           details: err.message,
//         });
//       }

//       if (balanceResult.length === 0) {
//         return res.status(404).json({
//           status: "Failure",
//           step: "Fetch Wallet Balance",
//           message: "No balance found for the user.",
//         });
//       }

//       const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
//       if (isNaN(currentBalance)) {
//         return res.status(500).json({
//           status: "Failure",
//           step: "Fetch Wallet Balance",
//           error: "Current balance is invalid.",
//         });
//       }

//       if (currentBalance < amount) {
//         return res.status(400).json({
//           status: "Failure",
//           step: "Wallet Deduction",
//           message: "Insufficient balance.",
//           currentBalance,
//           requiredAmount: amount,
//         });
//       }

//       const newBalance = parseFloat(currentBalance - amount).toFixed(2);
//       if (isNaN(newBalance)) {
//         return res.status(500).json({
//           status: "Failure",
//           step: "Wallet Deduction",
//           error: "New balance calculation is invalid.",
//         });
//       }

//       const transactionId = `TXNW${Date.now()}`;
//       const transactionDetails = `Services Deduction ${mobile_no}`;

//       const updateWalletQuery = `
//     INSERT INTO user_wallet
//     (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, debit_amount, Transaction_details, status)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//       db.query(
//         updateWalletQuery,
//         [
//           userId,
//           createdAt,
//           orderId,
//           transactionId,
//           currentBalance.toFixed(2),
//           newBalance,
//           "Debit",
//           amount,
//           transactionDetails,
//           "Success",
//         ],
//         (err, walletResult) => {
//           if (err) {
//             console.error("Error updating wallet balance:", err);
//             return res.status(500).json({
//               status: "Failure",
//               step: "Update Wallet Balance",
//               error: "Failed to update wallet balance",
//               details: err.message,
//             });
//           }

//           return res.status(200).json({
//             status: "Success",
//             message: "E - District processed and wallet updated successfully.",
//             details: {
//               offlineServices: {
//                 orderId,
//                 application_type,
//                 samagar,
//                 name,
//                 mobile_no,
//                 amount,
//                 status,
//               },
//               wallet: {
//                 transactionId,
//                 newBalance,
//                 previousBalance: currentBalance.toFixed(2),
//                 deductedAmount: amount,
//               },
//             },
//           });
//         }
//       );
//     });
//   });
// };

// first check the current balance then insert the data

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
    userId,
    status,
  } = req.body;

  let { amount } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const domain = process.env.domain;

  // Handle multiple file uploads
  const documentUpload = req.files
    ? req.files.map((file) => `${domain}/uploads/${file.filename}`).join(",")
    : null;

  const orderId = `EDST${Date.now()}`;
  const transactionId = `TXNW${Date.now()}`;
  const transactionDetails = `E-District Services Deduction Order Id ${orderId}`;
  const creditAmt = 0;

  // Step 1: Fetch user wallet balance
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

    // Validate `Amount`: Check for undefined, null, or invalid number
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(500).json({
        success: false,
        status: "Failure",
        error: "Invalid or missing amount",
      });
    }

    amount = parseFloat(parseFloat(amount).toFixed(2)); // Ensures it's a number with two decimal places

    if (currentBalance < amount) {
      return res.status(400).json({
        status: "Failure",
        step: "Wallet Deduction",
        message: "Insufficient balance.",
        currentBalance,
        requiredAmount: amount,
      });
    }

    // Step 2: Deduct amount from user wallet
    const newBalance = parseFloat(currentBalance - amount).toFixed(2);

    const updateWalletQuery = `
      INSERT INTO user_wallet 
      (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type,credit_amount, debit_amount, Transaction_details, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)
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

        // Step 3: Insert data into e-district-application table
        const insertEDistrictQuery = `
          INSERT INTO \`e-district-application\` (
            order_id, application_type, samagar, gender, name, father_husband_name, dob, address,
            mobile_no, cast, aadhar_no, samagar_member_id, state, annual_income,
            previous_application, documentUpload, charge_amount, user_id, status, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

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

        db.query(insertEDistrictQuery, values, (err, result) => {
          if (err) {
            console.error("Error inserting e-district application:", err);
            return res.status(500).json({
              status: "Failure",
              step: "Insert e-District Application",
              error: "Failed to insert e-district application data",
              details: err.message,
            });
          }

          return res.status(200).json({
            status: "Success",
            message: "E-District processed and wallet updated successfully.",
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
        });
      }
    );
  });
};

const UpdateeDistrictFormData = (req, res) => {
  const {
    order_id,
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
    // user_id,
    userId,
    status,
    previous_documentUpload,
  } = req.body;

  // console.log(req.body);

  const updated_at = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const domain = process.env.domain;

  // Handling multiple file uploads
  // const documentUpload = req.files.documentUpload
  //   ? req.files.map((file) => `${domain}/uploads/${file.filename}`).join(",")
  //   : previous_documentUpload;
  const documentUpload =
    req.files && req.files.length > 0
      ? req.files.map((file) => `${domain}/uploads/${file.filename}`).join(",")
      : previous_documentUpload;

  // const orderId = `EDST${Date.now()}`;

  const sql = `UPDATE \`e-district-application\` SET gender  = ?, name  = ?, father_husband_name  = ?, dob  = ?, address  = ?,
      mobile_no  = ?, cast  = ?, aadhar_no  = ?, samagar_member_id  = ?, state  = ?, annual_income  = ?,
      previous_application  = ?, documentUpload  = ?, user_id  = ?, status  = ? , updated_at  = ? WHERE order_id = ?
    `;

  const values = [
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
    userId,
    status,
    updated_at,
    order_id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Form not found" });
      return;
    }

    return res.status(200).json({
      status: "Success",
      message: "Update Form Successfully",
    });
  });
};

// const getSelectedServices = (req, res) => {
//   const applicationId = req.params.user_id;

//   const query = `SELECT select_bank_service, status FROM apply_offline_form WHERE user_id = ?`;
//   db.query(query, [applicationId], (err, results) => {
//     if (err) {
//       console.error("Error fetching selected services:", err);
//       res.status(500).json({ error: "Database error" });
//     } else {
//       const selectedServices = results.map((row) => ({
//         service: row.select_bank_service,
//         status: row.status,
//       }));
//       res.status(200).json({ selectedServices });
//     }
//   });
// };

const getSelectedServices = (req, res) => {
  const applicationId = req.params.user_id;

  const query = `SELECT select_bank_service, status FROM apply_offline_form WHERE user_id = ? AND applicant_select_service = "New Bank ID" AND status != "Reject"`;
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
  const selectQuery = `SELECT * FROM apply_offline_form WHERE applicant_select_service = ? AND user_id = ? ORDER BY id DESC`;

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

const getApiDTHRechargeData = (req, res) => {
  const userId = req.params.userId;
  const rechargeType = "DTH";

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

const getDTHConnectionData = (req, res) => {
  const userId = req.params.userId;

  let query = `SELECT * FROM dth_connection WHERE user_id = ? ORDER BY id DESC`;

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

const getApiEletricityRechargeData = (req, res) => {
  const userId = req.params.userId;
  const rechargeType = "Electricity";

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

const getApiBroadbrandRechargeData = (req, res) => {
  const userId = req.params.userId;
  const rechargeType = "Broadband";

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

// const addSambalForm = (req, res) => {
//   const {
//     samagraId,
//     familyId,
//     applicantType,
//     education,
//     occupation,
//     smsNotification,
//     incomeTaxPayer,
//     landOwnership,
//     govtService,
//     mobileNumber,
//     amount,
//     userId,
//   } = req.body;

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const orderId = `ORDS${Date.now()}`;

//   const sql = `
//   INSERT INTO SambalForm (
//     order_id, samagra_id, family_id, applicant_type, education, occupation,
//     sms_notification, income_tax_payer, land_ownership, govt_service, mobile_number, amount, user_id, status, created_at
//   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
// `;

//   const values = [
//     orderId,
//     samagraId,
//     familyId,
//     applicantType,
//     education,
//     occupation,
//     smsNotification,
//     incomeTaxPayer,
//     landOwnership,
//     govtService,
//     mobileNumber,
//     amount,
//     userId,
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
//     const queryBalance = `
//     SELECT Closing_Balance
//     FROM user_wallet
//     WHERE userId = ?
//     ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
//     LIMIT 1
//   `;

//     db.query(queryBalance, [userId], (err, balanceResult) => {
//       if (err) {
//         console.error("Error fetching wallet balance:", err);
//         return res.status(500).json({
//           status: "Failure",
//           step: "Fetch Wallet Balance",
//           error: "Failed to fetch wallet balance",
//           details: err.message,
//         });
//       }

//       if (balanceResult.length === 0) {
//         return res.status(404).json({
//           status: "Failure",
//           step: "Fetch Wallet Balance",
//           message: "No balance found for the user.",
//         });
//       }

//       const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
//       if (isNaN(currentBalance)) {
//         return res.status(500).json({
//           status: "Failure",
//           step: "Fetch Wallet Balance",
//           error: "Current balance is invalid.",
//         });
//       }

//       if (currentBalance < amount) {
//         return res.status(400).json({
//           status: "Failure",
//           step: "Wallet Deduction",
//           message: "Insufficient balance.",
//           currentBalance,
//           requiredAmount: amount,
//         });
//       }

//       const newBalance = parseFloat(currentBalance - amount).toFixed(2);
//       if (isNaN(newBalance)) {
//         return res.status(500).json({
//           status: "Failure",
//           step: "Wallet Deduction",
//           error: "New balance calculation is invalid.",
//         });
//       }

//       const transactionId = `TXNW${Date.now()}`;
//       const transactionDetails = `Sambal Deduction ${mobileNumber}`;

//       const updateWalletQuery = `
//       INSERT INTO user_wallet
//       (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, debit_amount, Transaction_details, status)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//       db.query(
//         updateWalletQuery,
//         [
//           userId,
//           createdAt,
//           orderId,
//           transactionId,
//           currentBalance.toFixed(2),
//           newBalance,
//           "Debit",
//           amount,
//           transactionDetails,
//           "Success",
//         ],
//         (err, walletResult) => {
//           if (err) {
//             console.error("Error updating wallet balance:", err);
//             return res.status(500).json({
//               status: "Failure",
//               step: "Update Wallet Balance",
//               error: "Failed to update wallet balance",
//               details: err.message,
//             });
//           }

//           return res.status(200).json({
//             status: "Success",
//             message: "Sambal Form processed and wallet updated successfully.",
//             details: {
//               dthConnection: {
//                 orderId,
//                 samagraId,
//                 familyId,
//                 applicantType,
//                 education,
//                 occupation,
//                 smsNotification,
//                 incomeTaxPayer,
//                 landOwnership,
//                 govtService,
//                 mobileNumber,
//                 createdAt,
//               },
//               wallet: {
//                 transactionId,
//                 newBalance,
//                 previousBalance: currentBalance.toFixed(2),
//                 deductedAmount: amount,
//               },
//             },
//           });
//         }
//       );
//     });
//   });
// };

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
    userId,
  } = req.body;

  let { amount } = req.body;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `ORDS${Date.now()}`;
  const transactionId = `TXNW${Date.now()}`;
  const transactionDetails = `Sambal Form Deduction Order Id ${orderId}`;
  const creditAmt = 0;

  // Step 1: Check the current balance
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

    // Validate `Amount`: Check for undefined, null, or invalid number
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(500).json({
        success: false,
        status: "Failure",
        error: "Invalid or missing amount",
      });
    }

    amount = parseFloat(parseFloat(amount).toFixed(2)); // Ensures it's a number with two decimal places

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

    // Step 2: Update the wallet table
    const updateWalletQuery = `
      INSERT INTO user_wallet 
      (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount,debit_amount, Transaction_details, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)
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

        // Step 3: Insert into SambalForm table
        const sambalFormQuery = `
          INSERT INTO SambalForm (
            order_id, samagra_id, family_id, applicant_type, education, occupation,
            sms_notification, income_tax_payer, land_ownership, govt_service, mobile_number, amount, user_id, status, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const sambalFormValues = [
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

        db.query(sambalFormQuery, sambalFormValues, (err, result) => {
          if (err) {
            console.error("Error inserting data into SambalForm:", err);
            return res.status(500).json({
              status: "Failure",
              step: "Insert SambalForm",
              error: "Failed to insert into SambalForm",
              details: err.message,
            });
          }

          // Step 4: Return success response
          return res.status(200).json({
            status: "Success",
            message: "Wallet updated and Sambal Form processed successfully.",
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
        });
      }
    );
  });
};

const EditSambalForm = (req, res) => {
  const {
    order_id,
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
    userId,
  } = req.body;

  const updated_at = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  // const orderId = `ORDS${Date.now()}`;

  const sql = `
  UPDATE sambalform SET
     samagra_id = ?, family_id = ?, applicant_type = ?, education = ?, occupation = ?,
    sms_notification = ?, income_tax_payer = ?, land_ownership = ?, govt_service = ?, mobile_number = ?, user_id = ?, status = ? , updated_at = ? WHERE order_id = ?`;

  const values = [
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
    userId,
    "Pending",
    updated_at,
    order_id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res
        .status(500)
        .json({ status: "Failure", error: "Database error" });
    }
    if (result.affectedRows === 0) {
      res.status(404).json({
        status: "Failure",
        error: "Form not found",
        message: "Form not found",
      });
      return;
    }

    return res.status(200).json({
      status: "Success",
      message: "Update Form Successfully",
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

// const addVerifyDistrictForm = (req, res) => {
//   const {
//     applicationType,
//     name,
//     mobileNo,
//     rsNumber,
//     district,
//     tehsil,
//     amount,
//     userId,
//   } = req.body;

//   // console.log("Request Body:", req.body);

//   if (!applicationType || !name || !mobileNo || !amount || !userId) {
//     return res.status(400).json({
//       status: "Failure",
//       error: "Missing required fields.",
//     });
//   }

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const orderId = `VED${Date.now()}`;

//   const sql = `
//     INSERT INTO verifyedistrict (
//       order_id, applicationType, name, mobileNo, rsNumber, district, tehsil, amount, user_id, status, created_at
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     orderId,
//     applicationType,
//     name,
//     mobileNo,
//     rsNumber,
//     district,
//     tehsil,
//     amount,
//     userId,
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

//     const queryBalance = `
//       SELECT Closing_Balance
//       FROM user_wallet
//       WHERE userId = ?
//       ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
//       LIMIT 1
//     `;

//     db.query(queryBalance, [userId], (err, balanceResult) => {
//       if (err) {
//         console.error("Error fetching wallet balance:", err);
//         return res
//           .status(500)
//           .json({ status: "Failure", error: "Failed to fetch wallet balance" });
//       }

//       if (!balanceResult.length || isNaN(balanceResult[0].Closing_Balance)) {
//         return res
//           .status(404)
//           .json({ status: "Failure", message: "No valid balance found." });
//       }

//       const currentBalance = parseFloat(balanceResult[0].Closing_Balance);

//       if (currentBalance < amount) {
//         return res.status(403).json({
//           status: "Failure",
//           message: "Insufficient balance.",
//           currentBalance,
//           requiredAmount: amount,
//         });
//       }

//       const newBalance = (currentBalance - amount).toFixed(2);
//       const transactionId = `TXNW${Date.now()}`;
//       const transactionDetails = `Verify E-District Deduction ${mobileNo}`;

//       const updateWalletQuery = `
//         INSERT INTO user_wallet
//         (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, debit_amount, Transaction_details, status)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `;

//       db.query(
//         updateWalletQuery,
//         [
//           userId,
//           createdAt,
//           orderId,
//           transactionId,
//           currentBalance,
//           newBalance,
//           "Debit",
//           amount,
//           transactionDetails,
//           "Success",
//         ],
//         (err, walletResult) => {
//           if (err) {
//             console.error("Error updating wallet balance:", err);
//             return res.status(500).json({
//               status: "Failure",
//               error: "Failed to update wallet balance",
//             });
//           }

//           return res.status(200).json({
//             status: "Success",
//             message:
//               "Verify E-District processed and wallet updated successfully.",
//             details: {
//               verify: {
//                 orderId,
//                 applicationType,
//                 name,
//                 mobileNo,
//                 rsNumber,
//                 district,
//                 tehsil,
//                 amount,
//                 createdAt,
//               },
//               wallet: {
//                 transactionId,
//                 newBalance,
//                 previousBalance: currentBalance,
//               },
//             },
//           });
//         }
//       );
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
    userId,
  } = req.body;

  let { amount } = req.body;

  if (!applicationType || !name || !mobileNo || !amount || !userId) {
    return res.status(400).json({
      status: "Failure",
      error: "Missing required fields.",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `VED${Date.now()}`;
  const creditAmt = 0;
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

    // Validate `Amount`: Check for undefined, null, or invalid number
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(500).json({
        success: false,
        status: "Failure",
        error: "Invalid or missing amount",
      });
    }

    amount = parseFloat(parseFloat(amount).toFixed(2)); // Ensures it's a number with two decimal places

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
    const transactionDetails = `Verify E-District Deduction Order Id ${orderId}`;

    const updateWalletQuery = `
      INSERT INTO user_wallet 
      (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount,debit_amount, Transaction_details, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
            error: "Failed to update wallet balance",
          });
        }

        const insertVerifyQuery = `
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

        db.query(insertVerifyQuery, values, (err, result) => {
          if (err) {
            console.error("Error inserting verification data:", err);
            return res
              .status(500)
              .json({ status: "Failure", error: "Database error" });
          }

          return res.status(200).json({
            status: "Success",
            message:
              "Verify E-District processed and wallet updated successfully.",
            details: {
              wallet: {
                transactionId,
                newBalance,
                previousBalance: currentBalance,
              },
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
            },
          });
        });
      }
    );
  });
};

const UpdateVerifyDistrictForm = (req, res) => {
  const { order_id, name, mobileNo, rsNumber, district, tehsil, userId } =
    req.body;

  // console.log("Request Body:", req.body);

  if (!name || !mobileNo || !userId || !order_id) {
    return res.status(400).json({
      status: "Failure",
      error: "Missing required fields.",
    });
  }

  const updated_at = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  // const orderId = `VED${Date.now()}`;

  const sql = `
    UPDATE verifyedistrict SET
      name = ? , mobileNo = ?, rsNumber = ?, district = ?, tehsil = ?, user_id = ?, status = ?, updated_at = ? WHERE order_id = ?`;

  const values = [
    name,
    mobileNo,
    rsNumber,
    district,
    tehsil,
    userId,
    "Pending",
    updated_at,
    order_id,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res
        .status(500)
        .json({ status: "Failure", error: "Database error" });
    }
    if (result.affectedRows === 0) {
      res.status(404).json({
        status: "Failure",
        error: "Form not found",
        message: "Form not found",
      });
      return;
    }

    return res.status(200).json({
      status: "Success",
      message: "Update Form Successfully",
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
  const userId = req.params.userId;

  let query = `SELECT * FROM sambalform WHERE user_id = ?`;

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
    const userStatus = "Success";
    const domain = process.env.domain;

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

  let query = `SELECT * FROM pandocument WHERE userId = ? ORDER BY id DESC`;

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
    const domain = process.env.domain;

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

  let query = `SELECT * FROM user_wallet_add_money_request WHERE user_id = ? AND Payment_Mode != "Online" ORDER BY id DESC`;

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
const getAddMoneyToWalletOnline = (req, res) => {
  const userId = req.params.userId;

  let query = `SELECT * FROM user_wallet_add_money_request WHERE user_id = ? AND Payment_Mode = "Online" ORDER BY id DESC`;

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

// const buyCoupon = (req, res) => {
//   const { coupon_Quantity, coupon_Price, total_Amount, coupon_Type,pan_id, userId } =
//     req.body;

//   if (
//     !coupon_Quantity ||
//     !coupon_Price ||
//     !total_Amount ||
//     !coupon_Type ||
//     !pan_id ||
//     !userId
//   ) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   if (isNaN(total_Amount) || parseFloat(total_Amount) <= 0) {
//     return res.status(400).json({
//       status: "Failure",
//       step: "Validation",
//       error: "Invalid amount. Amount must be a positive number.",
//     });
//   }

//   const orderId = `COU${Date.now()}`;
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const status = "Pending";

//   const sql = `
//   INSERT INTO pan_coupon_requests
//   (order_id, coupon_Quantity, coupon_Price, total_Amount, coupon_Type,pan_id, user_id, status, created_at)
//   VALUES (?, ?, ?, ?, ?, ?, ?, ?)
// `;

//   const values = [
//     orderId,
//     coupon_Quantity,
//     coupon_Price,
//     total_Amount,
//     coupon_Type,
//     pan_id,
//     userId,
//     status,
//     createdAt,
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error inserting recharge record:", err);
//       return res.status(500).json({
//         status: "Failure",
//         step: "Buy Coupan",
//         error: "Failed to process Buy Coupan",
//         details: err.message,
//       });
//     }

//     const queryBalance = `
//     SELECT Closing_Balance
//     FROM user_wallet
//     WHERE userId = ?
//     ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
//     LIMIT 1
//   `;

//     db.query(queryBalance, [userId], (err, balanceResult) => {
//       if (err) {
//         console.error("Error fetching wallet balance:", err);
//         return res.status(500).json({
//           status: "Failure",
//           step: "Fetch Wallet Balance",
//           error: "Failed to fetch wallet balance",
//           details: err.message,
//         });
//       }

//       if (balanceResult.length === 0) {
//         return res.status(404).json({
//           status: "Failure",
//           step: "Fetch Wallet Balance",
//           message: "No balance found for the user.",
//         });
//       }

//       const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
//       if (isNaN(currentBalance)) {
//         return res.status(500).json({
//           status: "Failure",
//           step: "Fetch Wallet Balance",
//           error: "Current balance is invalid.",
//         });
//       }

//       if (currentBalance < total_Amount) {
//         return res.status(400).json({
//           status: "Failure",
//           step: "Wallet Deduction",
//           message: "Insufficient balance.",
//           currentBalance,
//           requiredAmount: total_Amount,
//         });
//       }

//       const newBalance = parseFloat(currentBalance - total_Amount).toFixed(2);
//       if (isNaN(newBalance)) {
//         return res.status(500).json({
//           status: "Failure",
//           step: "Wallet Deduction",
//           error: "New balance calculation is invalid.",
//         });
//       }

//       const transactionId = `TXNW${Date.now()}`;
//       const transactionDetails = `Buy Coupan ${coupon_Type}`;
//       const creditAmt = 0;

//       const updateWalletQuery = `
//       INSERT INTO user_wallet
//       (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//       db.query(
//         updateWalletQuery,
//         [
//           userId,
//           createdAt,
//           orderId,
//           transactionId,
//           currentBalance.toFixed(2),
//           newBalance,
//           "Debit",
//           creditAmt,
//           total_Amount,
//           transactionDetails,
//           "Success",
//         ],
//         (err, walletResult) => {
//           if (err) {
//             console.error("Error updating wallet balance:", err);
//             return res.status(500).json({
//               status: "Failure",
//               step: "Update Wallet Balance",
//               error: "Failed to update wallet balance",
//               details: err.message,
//             });
//           }

//           return res.status(200).json({
//             status: "Success",
//             message:
//               "Coupon purchase processed and wallet updated successfully.",
//             details: {
//               recharge: {
//                 orderId,
//                 coupon_Quantity,
//                 coupon_Price,
//                 total_Amount,
//                 coupon_Type,
//               },
//               wallet: {
//                 transactionId,
//                 newBalance,
//                 previousBalance: currentBalance.toFixed(2),
//                 deductedAmount: total_Amount,
//               },
//             },
//           });
//         }
//       );
//     });
//   });
// };

const buyCoupon = (req, res) => {
  const {
    coupon_Quantity,
    coupon_Price,
    total_Amount,
    coupon_Type,
    pan_id,
    userId,
  } = req.body;

  if (
    !coupon_Quantity ||
    !coupon_Price ||
    !total_Amount ||
    !coupon_Type ||
    !pan_id ||
    !userId
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (isNaN(total_Amount) || parseFloat(total_Amount) <= 0) {
    return res.status(400).json({
      status: "Failure",
      step: "Validation",
      error: "Invalid amount. Amount must be a positive number.",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  // Step 1: Fetch the latest closing balance
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

    if (currentBalance < total_Amount) {
      return res.status(400).json({
        status: "Failure",
        step: "Wallet Deduction",
        message: "Insufficient balance.",
        currentBalance,
        requiredAmount: total_Amount,
      });
    }

    // Step 2: Update wallet first
    const newBalance = parseFloat(currentBalance - total_Amount).toFixed(2);
    if (isNaN(newBalance)) {
      return res.status(500).json({
        status: "Failure",
        step: "Wallet Deduction",
        error: "New balance calculation is invalid.",
      });
    }

    const orderId = `COU${Date.now()}`;
    const transactionId = `TXNW${Date.now()}`;
    const transactionDetails = `Buy PAN Coupon ${coupon_Type} quantity ${coupon_Quantity}`;

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
        0, // Credit amount is zero
        total_Amount,
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

        // Step 3: Insert Coupon Request after wallet update
        const status = "Pending";
        const insertCouponQuery = `
          INSERT INTO pan_coupon_requests
          (order_id, coupon_Quantity, coupon_Price, total_Amount, coupon_Type, pan_id, user_id, status, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
          insertCouponQuery,
          [
            orderId,
            coupon_Quantity,
            coupon_Price,
            total_Amount,
            coupon_Type,
            pan_id,
            userId,
            status,
            createdAt,
          ],
          (err, couponResult) => {
            if (err) {
              console.error("Error inserting coupon request:", err);
              return res.status(500).json({
                status: "Failure",
                step: "Buy Coupon",
                error: "Failed to process Buy Coupon",
                details: err.message,
              });
            }

            return res.status(200).json({
              status: "Success",
              message:
                "Coupon purchase processed and wallet updated successfully.",
              details: {
                wallet: {
                  transactionId,
                  newBalance,
                  previousBalance: currentBalance.toFixed(2),
                  deductedAmount: total_Amount,
                },
                recharge: {
                  orderId,
                  coupon_Quantity,
                  coupon_Price,
                  total_Amount,
                  coupon_Type,
                },
              },
            });
          }
        );
      }
    );
  });
};

const getCoupon = (req, res) => {
  const userId = req.params.userId;

  let query = `SELECT * FROM pan_coupon_requests WHERE user_id = ? ORDER BY id  DESC`;

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

const getAllServicesList = (req, res) => {
  try {
    const sql = `SELECT * FROM serviceslist`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error getAllServicesList from MySQL:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error getAllServicesList" });
      } else {
        // Check if the result is empty
        if (result.length === 0) {
          return res.status(200).json({
            success: true,
            data: [],
            message: "No getAllServicesList found",
          });
        } else {
          return res.status(200).json({
            success: true,
            data: result,
            message: "getAllServicesList fetched successfully",
          });
        }
      }
    });
  } catch (error) {
    console.error("Error fetching getAllServicesList from MySQL:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching getAllServicesList",
      error: error.message,
    });
  }
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

const getAllMonthCommission = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch commission records for the user from the last month
  const sql = `
    SELECT * 
    FROM commission_table 
    WHERE retailer_id = ? 
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
    WHERE retailer_id = ? 
      AND DATE(created_at) = CURDATE()  -- Fetch data for today's date only
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

const getAllMonthRecharge = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch commission records for the user from the last month
  const sql = `
    SELECT * 
    FROM recharges 
    WHERE created_by_userid	 = ? AND (status = "SUCCESS" OR status = "Success")
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
      total: results.length,
    }); // Return the commission records for the last month
  });
};
const getAllMonthRechargeOffline = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch commission records for the user from the last month
  const sql = `
    SELECT * 
    FROM offline_recharge 
    WHERE created_by_userid	 = ? AND status = "Approve"
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
      total: results.length,
    }); // Return the commission records for the last month
  });
};

const getTodaysRecharge = (req, res) => {
  const { userId } = req.params;
  // SQL query to fetch commission records for the user for the current day
  const sql = `
    SELECT * 
    FROM recharges 
    WHERE created_by_userid = ? AND (status = "SUCCESS" OR status = "Success")
      AND DATE(created_at) = CURDATE()  -- Fetch data for today's date only
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
      total: results.length,
    }); // Return the commission records for the current day
  });
};

const getTodaysRechargeOffline = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch commission records for the user for the current day
  const sql = `
    SELECT * 
    FROM offline_recharge 
    WHERE created_by_userid = ? AND status = "Approve"
      AND DATE(created_at) = CURDATE()  -- Fetch data for today's date only
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
      total: results.length,
    }); // Return the commission records for the current day
  });
};

const getAllCommission = (req, res) => {
  const { userId } = req.params;

  // SQL query to fetch commission records for the user
  const sql = `
    SELECT * 
    FROM commission_table 
    WHERE retailer_id = ?
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

const getCertificateDetails = async (req, res) => {
  const { userId } = req.params;
  // const query = `
  //     SELECT
  //         ur.UserId,
  //         ur.userType,
  //         ur.superAdmin,
  //         ur.white_lable,
  //         CASE
  //             WHEN ur.white_lable IS NOT NULL THEN wl.Company_Name
  //             WHEN ur.white_lable IS NULL AND ur.superAdmin IS NOT NULL THEN sa.Company_Name
  //             ELSE NULL
  //         END AS Company_Name,
  //         CASE
  //             WHEN ur.white_lable IS NOT NULL THEN wl.Logo
  //             WHEN ur.white_lable IS NULL AND ur.superAdmin IS NOT NULL THEN sa.Logo
  //             ELSE NULL
  //         END AS Logo
  //     FROM user_relations AS ur
  //     LEFT JOIN white_label_website_setting AS wl ON ur.white_lable = wl.id
  //     LEFT JOIN super_admin_website_setting AS sa ON ur.superAdmin = sa.id
  //     WHERE ur.UserId = ?
  // `;
  const query = `
      SELECT 
    ur.UserId, 
    ur.userType, 
    ur.superAdmin, 
    ur.white_lable, 
    CASE 
        WHEN ur.white_lable IS NOT NULL AND ur.white_lable != '' THEN wl.Company_Name
        WHEN (ur.white_lable IS NULL OR ur.white_lable = '') AND ur.superAdmin IS NOT NULL THEN sa.Company_Name
        ELSE NULL 
    END AS Company_Name,
    CASE 
        WHEN ur.white_lable IS NOT NULL AND ur.white_lable != '' THEN wl.Logo
        WHEN (ur.white_lable IS NULL OR ur.white_lable = '') AND ur.superAdmin IS NOT NULL THEN sa.Logo
        ELSE NULL 
    END AS Logo
FROM user_relations AS ur
LEFT JOIN white_label_website_setting AS wl ON ur.white_lable = wl.id
LEFT JOIN super_admin_website_setting AS sa ON ur.superAdmin = sa.id
WHERE ur.UserId = ?;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching certificate details:", err);
      return res.status(500).json({
        success: false,
        error: `Error fetching data: ${err.message}`,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found for this user.",
      });
    }
    return res.status(200).json({
      success: true,
      data: results[0],
    });
  });
};

const getSuperAdminData = (req, res) => {
  // const packageId = req.params.packageId;

  const sqlQuery = `SELECT * FROM super_admin_website_setting `;

  db.query(sqlQuery, (err, result) => {
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

const getWhiteLableData = (req, res) => {
  const whiteLabelId = req.params.whiteLabelId;

  const sqlQuery = `SELECT * FROM  white_label_website_setting WHERE whiteLabel_id = ?`;

  db.query(sqlQuery, [whiteLabelId], (err, result) => {
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

module.exports = {
  applyOfflineForm,
  getApplyOfflineFormByid,
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
  buyCoupon,
  getCoupon,
  getAddMoneyToWalletOnline,
  update_bankidForm,
  update_applyOfflineForm,
  EditSambalForm,
  UpdateeDistrictFormData,
  UpdateVerifyDistrictForm,
  UpdatePanFromData,
  getDTHConnectionData,
  getOfflineRecharge,
  getOfflineDTHConnection,
  getAllServicesList,
  getUserNotification,
  getAllMonthCommission,
  getTodaysCommission,
  getAllMonthRecharge,
  getAllMonthRechargeOffline,
  getTodaysRechargeOffline,
  getTodaysRecharge,
  getAllCommission,
  getCertificateDetails,
  getSuperAdminData,
  getWhiteLableData,
};
