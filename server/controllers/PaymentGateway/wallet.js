const { db } = require("../../connect");
const moment = require("moment-timezone");

const getWalletBalance = (req, res) => {
  const userId = req.params.userId;

  // Modified query to fetch the latest closing balance
  const query = `
        SELECT Closing_Balance 
        FROM user_wallet 
        WHERE userId = ? 
        ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC 
        LIMIT 1
    `;

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

    // Return the latest closing balance
    return res
      .status(200)
      .json({ status: "Success", balance: result[0].Closing_Balance });
  });
};

const updateWalletBalance = (req, res) => {
  const { userId, amount, transactionDetails } = req.body;

  // Fetch the latest balance
  const queryBalance = `
    SELECT Closing_Balance 
    FROM user_wallet 
    WHERE userId = ? 
    ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC 
    LIMIT 1
  `;

  db.query(queryBalance, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failure",
        message: "Database error",
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ status: "Failure", message: "No balance found for the user." });
    }

    const currentBalance = parseFloat(result[0].Closing_Balance);
    if (currentBalance < amount) {
      return res
        .status(400)
        .json({ status: "Failure", message: "Insufficient balance." });
    }

    const newBalance = (currentBalance - amount).toFixed(2);
    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const transaction = `TXNW${Date.now()}`;

    // Insert a new record with the updated balance
    const updateQuery = `
      INSERT INTO user_wallet 
      (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, debit_amount, Transaction_details, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      updateQuery,
      [
        userId,
        createdAt,
        null, // Order_Id
        transaction,
        currentBalance.toFixed(2),
        newBalance,
        "Debit",
        amount,
        transactionDetails || "Recharge Deduction",
        "Completed",
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            status: "Failure",
            message: "Failed to update balance",
            error: err.message,
          });
        }

        return res.status(200).json({
          status: "Success",
          message: "Balance updated successfully.",
          balance: newBalance,
        });
      }
    );
  });
};

const offlineRechargeAndUpdateWallet = (req, res) => {
  const { mobile_no, operator_name, amount, recharge_Type, userId } = req.body;

  if (!mobile_no || !operator_name || !amount || !userId) {
    return res.status(400).json({
      status: "Failure",
      step: "Validation",
      error: "Please fill all the required fields",
    });
  }

  if (isNaN(amount) || parseFloat(amount) <= 0) {
    return res.status(400).json({
      status: "Failure",
      step: "Validation",
      error: "Invalid amount. Amount must be a positive number.",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `ORDR${Date.now()}`;

  const insertRechargeQuery = `INSERT INTO offline_recharge 
    (mobile_no, operator_name, amount, orderid, recharge_Type, created_by_userid, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertRechargeQuery,
    [
      mobile_no,
      operator_name,
      amount,
      orderId,
      recharge_Type,
      userId,
      createdAt,
    ],
    (err, rechargeResult) => {
      if (err) {
        console.error("Error inserting recharge record:", err);
        return res.status(500).json({
          status: "Failure",
          step: "Offline Recharge",
          error: "Failed to process recharge",
          details: err.message,
        });
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
        const transactionDetails = `Recharge Deduction ${mobile_no}`;

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
            "Completed",
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
              message: "Recharge processed and wallet updated successfully.",
              details: {
                recharge: {
                  orderId,
                  mobile_no,
                  operator_name,
                  amount,
                  recharge_Type,
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

const dthConnectionAndUpdateWallet = (req, res) => {
  const {
    operatorName,
    first_name,
    last_name,
    full_address,
    postal_code,
    number,
    validity,
    amount,
    message,
    userId,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !full_address ||
    !postal_code ||
    !number ||
    !validity ||
    !amount ||
    !message
  ) {
    return res.status(400).json({
      status: "Failure",
      step: "Validation",
      error: "Please fill all the required fields",
    });
  }

  if (isNaN(amount) || parseFloat(amount) <= 0) {
    return res.status(400).json({
      status: "Failure",
      step: "Validation",
      error: "Invalid amount. Amount must be a positive number.",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `OROD${Date.now()}`;

  const insertRechargeQuery = `INSERT INTO offline_dth_connection 
    (operatorName,
    first_name,
    last_name,
    full_address,
    postal_code,
    number,
    validity,
    amount,
    orderid,
    message,
    user_id, 
    created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    insertRechargeQuery,
    [
      operatorName,
      first_name,
      last_name,
      full_address,
      postal_code,
      number,
      validity,
      amount,
      orderId,
      message,
      userId,
      createdAt,
    ],
    (err, rechargeResult) => {
      if (err) {
        console.error("Error inserting recharge record:", err);
        return res.status(500).json({
          status: "Failure",
          step: "DTH Connection",
          error: "Failed to process recharge",
          details: err.message,
        });
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
        const transactionDetails = `Recharge Deduction ${number}`;

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
            "Completed",
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
                "DTH Connection processed and wallet updated successfully.",
              details: {
                dthConnection: {
                  orderId,
                  operatorName,
                  first_name,
                  last_name,
                  full_address,
                  postal_code,
                  number,
                  amount,
                  message,
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

module.exports = {
  getWalletBalance,
  updateWalletBalance,
  offlineRechargeAndUpdateWallet,
  dthConnectionAndUpdateWallet,
};

// const offlineRechargeAndUpdateWallet = (req, res) => {
//   const { mobile_no, operator_name, amount, recharge_Type, userId } = req.body;

//   if (!mobile_no || !operator_name || !amount || !userId) {
//     return res.status(400).json({
//       status: "Failure",
//       step: "Validation",
//       error: "Please fill all the required fields",
//     });
//   }

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const orderId = `${Date.now()}`;

//   // Step 1: Insert into the offline_recharge table
//   const insertRechargeQuery = `INSERT INTO offline_recharge
//     (mobile_no, operator_name, amount, orderid, recharge_Type, created_by_userid, created_at)
//     VALUES (?, ?, ?, ?, ?, ?, ?)`;

//   db.query(
//     insertRechargeQuery,
//     [
//       mobile_no,
//       operator_name,
//       amount,
//       orderId,
//       recharge_Type,
//       userId,
//       createdAt,
//     ],
//     (err, rechargeResult) => {
//       if (err) {
//         console.error("Error inserting recharge record:", err);
//         return res.status(500).json({
//           status: "Failure",
//           step: "Offline Recharge",
//           error: "Failed to process recharge",
//           details: err.message,
//         });
//       }

//       // Step 2: Fetch the user's current wallet balance
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
//         if (currentBalance < amount) {
//           return res.status(400).json({
//             status: "Failure",
//             step: "Wallet Deduction",
//             message: "Insufficient balance.",
//             currentBalance,
//             requiredAmount: amount,
//           });
//         }

//         const newBalance = (currentBalance - amount).toFixed(2);
//         const transactionId = `TXNW${Date.now()}`; // Generate a unique transaction ID

//         // Step 3: Insert into the user_wallet table
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
//             "Recharge Deduction",
//             "Completed",
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

//             // Final Success Response
//             return res.status(200).json({
//               status: "Success",
//               message: "Recharge processed and wallet updated successfully.",
//               details: {
//                 recharge: {
//                   orderId,
//                   mobile_no,
//                   operator_name,
//                   amount,
//                   recharge_Type,
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
