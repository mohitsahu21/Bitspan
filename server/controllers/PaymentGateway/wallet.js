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

module.exports = { getWalletBalance };
