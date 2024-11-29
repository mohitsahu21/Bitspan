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

module.exports = { getWalletBalance, updateWalletBalance };
