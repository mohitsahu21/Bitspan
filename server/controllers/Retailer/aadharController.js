const {
  findPanByAadhaar,
  findPanDetails,
  getRcPdfData,
  getDlPrint,
  verifyVoterCard,
  getAadhaarOtp,
  verifyAadhaarOtp,
  verifyVehicleRC,
  verifyDrivingLicense,
  verifyGST,
} = require("../../APIS URL/aadharApi");
const { db } = require("../../connect");
const moment = require("moment-timezone");
const dotenv = require("dotenv");
dotenv.config();

const getPanByAadhaar = async (req, res) => {
  const { api_key, aadhaar_no } = req.body;

  if (!api_key || !aadhaar_no) {
    return res.status(400).json({
      status: "400",
      message: "API Key and Aadhaar Number are required",
    });
  }

  try {
    const result = await findPanByAadhaar(api_key, aadhaar_no);
    res.status(result.status === "200" ? 200 : 404).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ status: "500", message: "Unexpected error occurred" });
  }
};

const getPanDetails = async (req, res) => {
  const { api_key, panno } = req.body;

  if (!api_key || !panno) {
    return res.status(400).json({
      status: "400",
      message: "API Key and Pan Number are required",
    });
  }

  try {
    const result = await findPanDetails(api_key, panno);
    res.status(result.status === "200" ? 200 : 404).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ status: "500", message: "Unexpected error occurred" });
  }
};

const PanByAadhaar = async (req, res) => {
  const { aadhaar_no, userId } = req.body;
  let { amount } = req.body;
  const api_key = process.env.FIND_API_KEY;

  if (!api_key) {
    return res.status(500).json({
      status: "Failure",
      step: "Environment Variable",
      message: "API Key is not set in environment variables.",
    });
  }

  if (!aadhaar_no || !userId) {
    return res.status(400).json({
      status: "400",
      message: "API Key, Aadhaar Number, and User ID are required",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `ORDP${Date.now()}`;
  const transactionId = `TXNP${Date.now()}`;
  const transactionDetails = `PAN by Aadhaar Deduction Order Id ${orderId}`;
  const creditAmt = 0;

  // Step 1: Check the current balance
  // const queryBalance = `
  //   SELECT Closing_Balance
  //   FROM user_wallet
  //   WHERE userId = ?
  //   ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
  //   LIMIT 1
  // `;
  const queryBalance = `
SELECT Closing_Balance 
FROM user_wallet 
WHERE userId = ? 
ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC, wid DESC 
LIMIT 1
  `;

  db.query(queryBalance, [userId], async (err, balanceResult) => {
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

    // Step 2: Validate `amount`
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(500).json({
        success: false,
        status: "Failure",
        error: "Invalid or missing amount",
      });
    }

    amount = parseFloat(parseFloat(amount).toFixed(2));

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

    // Step 3: Deduct amount from wallet
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
      async (err, walletResult) => {
        if (err) {
          console.error("Error updating wallet balance:", err);
          return res.status(500).json({
            status: "Failure",
            step: "Update Wallet Balance",
            error: "Failed to update wallet balance",
            details: err.message,
          });
        }

        // Step 4: Call PAN by Aadhaar API
        try {
          const result = await findPanByAadhaar(api_key, aadhaar_no);
          return res.status(result.status === "200" ? 200 : 404).json({
            status: "Success",
            wallet: {
              transactionId,
              newBalance,
              previousBalance: currentBalance.toFixed(2),
              deductedAmount: amount,
            },
            panData: result,
          });
        } catch (err) {
          return res.status(500).json({
            status: "Failure",
            step: "Call PAN by Aadhaar API",
            message: "Unexpected error occurred while calling PAN API",
            details: err.message,
          });
        }
      }
    );
  });
};

const PanDetails = async (req, res) => {
  const { panno, userId } = req.body;
  let { amount } = req.body;
  const api_key = process.env.FIND_API_KEY;

  if (!api_key) {
    return res.status(500).json({
      status: "Failure",
      step: "Environment Variable",
      message: "API Key is not set in environment variables.",
    });
  }

  if (!panno || !userId) {
    return res.status(400).json({
      status: "400",
      message: "API Key, Pan Number, and User ID are required",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `ORDP${Date.now()}`;
  const transactionId = `TXNP${Date.now()}`;
  const transactionDetails = `PAN Deduction Order Id ${orderId}`;
  const creditAmt = 0;

  // Step 1: Check the current balance
  // const queryBalance = `
  //   SELECT Closing_Balance
  //   FROM user_wallet
  //   WHERE userId = ?
  //   ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
  //   LIMIT 1
  // `;
  const queryBalance = `
SELECT Closing_Balance 
FROM user_wallet 
WHERE userId = ? 
ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC, wid DESC 
LIMIT 1
  `;

  db.query(queryBalance, [userId], async (err, balanceResult) => {
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

    // Step 2: Validate `amount`
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(500).json({
        success: false,
        status: "Failure",
        error: "Invalid or missing amount",
      });
    }

    amount = parseFloat(parseFloat(amount).toFixed(2));

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

    // Step 3: Deduct amount from wallet
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
      async (err, walletResult) => {
        if (err) {
          console.error("Error updating wallet balance:", err);
          return res.status(500).json({
            status: "Failure",
            step: "Update Wallet Balance",
            error: "Failed to update wallet balance",
            details: err.message,
          });
        }

        // Step 4: Call PAN by Aadhaar API
        try {
          const result = await findPanDetails(api_key, panno);
          return res.status(result.status === "200" ? 200 : 404).json({
            status: "Success",
            wallet: {
              transactionId,
              newBalance,
              previousBalance: currentBalance.toFixed(2),
              deductedAmount: amount,
            },
            panData: result,
          });
        } catch (err) {
          return res.status(500).json({
            status: "Failure",
            step: "Call PAN API",
            message: "Unexpected error occurred while calling PAN API",
            details: err.message,
          });
        }
      }
    );
  });
};

const fetchRcPdf = async (req, res) => {
  const { api_key, rcno, cardtype, chiptype } = req.body;

  if (!api_key || !rcno) {
    return res.status(400).json({ error: "api_key and rcno are required" });
  }

  try {
    const result = await getRcPdfData(api_key, rcno, cardtype, chiptype);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch RC PDF", details: error.message });
  }
};

const fetchRcDetails = async (req, res) => {
  const { rcno, cardtype, chiptype, userId } = req.body;
  let { amount } = req.body;
  const api_key = process.env.FIND_API_KEY;

  if (!api_key) {
    return res.status(500).json({
      status: "Failure",
      step: "Environment Variable",
      message: "API Key is not set in environment variables.",
    });
  }

  if (!rcno) {
    return res.status(400).json({
      status: "400",
      message: "RC No. are required",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `ORDP${Date.now()}`;
  const transactionId = `TXNP${Date.now()}`;
  const transactionDetails = `RC Deduction Order Id ${orderId}`;
  const creditAmt = 0;

  // Step 1: Check the current balance
  // const queryBalance = `
  //   SELECT Closing_Balance
  //   FROM user_wallet
  //   WHERE userId = ?
  //   ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
  //   LIMIT 1
  // `;
  const queryBalance = `
SELECT Closing_Balance 
FROM user_wallet 
WHERE userId = ? 
ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC, wid DESC 
LIMIT 1
  `;

  db.query(queryBalance, [userId], async (err, balanceResult) => {
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

    // Step 2: Validate `amount`
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(500).json({
        success: false,
        status: "Failure",
        error: "Invalid or missing amount",
      });
    }

    amount = parseFloat(parseFloat(amount).toFixed(2));

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

    // Step 3: Deduct amount from wallet
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
      async (err, walletResult) => {
        if (err) {
          console.error("Error updating wallet balance:", err);
          return res.status(500).json({
            status: "Failure",
            step: "Update Wallet Balance",
            error: "Failed to update wallet balance",
            details: err.message,
          });
        }

        // Step 4: Call PAN by Aadhaar API
        try {
          const result = await getRcPdfData(api_key, rcno, cardtype, chiptype);
          return res.status(result.status === "200" ? 200 : 404).json({
            status: "Success",
            wallet: {
              transactionId,
              newBalance,
              previousBalance: currentBalance.toFixed(2),
              deductedAmount: amount,
            },
            panData: result,
          });
        } catch (err) {
          return res.status(500).json({
            status: "Failure",
            step: "Call RC API",
            message: "Unexpected error occurred while calling RC API",
            details: err.message,
          });
        }
      }
    );
  });
};

const dlPrintController = async (req, res) => {
  const { dlno, dob, cardtype } = req.body;

  // Replace this with your real API key or use dotenv
  const apiKey = process.env.FIND_API_KEY;

  if (!dlno || !dob) {
    return res.status(400).json({ message: "DL number and DOB are required" });
  }

  const result = await getDlPrint(apiKey, dlno, dob, cardtype || 1);

  if (result.status === "200") {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
};

const fetchDLdetails = async (req, res) => {
  const { dlno, dob, cardtype, userId } = req.body;
  let { amount } = req.body;
  const api_key = process.env.FIND_API_KEY;

  if (!api_key) {
    return res.status(500).json({
      status: "Failure",
      step: "Environment Variable",
      message: "API Key is not set in environment variables.",
    });
  }

  if (!dlno || !dob) {
    return res.status(400).json({ message: "DL number and DOB are required" });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `ORDP${Date.now()}`;
  const transactionId = `TXNP${Date.now()}`;
  const transactionDetails = `RC Deduction Order Id ${orderId}`;
  const creditAmt = 0;

  // Step 1: Check the current balance
  // const queryBalance = `
  //   SELECT Closing_Balance
  //   FROM user_wallet
  //   WHERE userId = ?
  //   ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
  //   LIMIT 1
  // `;
  const queryBalance = `
SELECT Closing_Balance 
FROM user_wallet 
WHERE userId = ? 
ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC, wid DESC 
LIMIT 1
  `;

  db.query(queryBalance, [userId], async (err, balanceResult) => {
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

    // Step 2: Validate `amount`
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(500).json({
        success: false,
        status: "Failure",
        error: "Invalid or missing amount",
      });
    }

    amount = parseFloat(parseFloat(amount).toFixed(2));

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

    // Step 3: Deduct amount from wallet
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
      async (err, walletResult) => {
        if (err) {
          console.error("Error updating wallet balance:", err);
          return res.status(500).json({
            status: "Failure",
            step: "Update Wallet Balance",
            error: "Failed to update wallet balance",
            details: err.message,
          });
        }

        // Step 4: Call PAN by Aadhaar API
        try {
          const result = await getDlPrint(api_key, dlno, dob, cardtype || 1);
          return res.status(result.status === "200" ? 200 : 404).json({
            status: "Success",
            wallet: {
              transactionId,
              newBalance,
              previousBalance: currentBalance.toFixed(2),
              deductedAmount: amount,
            },
            panData: result,
          });
        } catch (err) {
          return res.status(500).json({
            status: "Failure",
            step: "Call DL API",
            message: "Unexpected error occurred while calling DL API",
            details: err.message,
          });
        }
      }
    );
  });
};

const voterCardVerification = async (req, res) => {
  const { epic_number, orderid } = req.query;

  if (!epic_number || !orderid) {
    return res.status(400).json({
      status: "Failure",
      message: "epic_number and orderid are required",
    });
  }

  try {
    const result = await verifyVoterCard(epic_number, orderid);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "Failure", message: error.message });
  }
};

const fetchVoterVerification = async (req, res) => {
  const { epic_number, userId } = req.body;
  let { amount } = req.body;

  if (!epic_number || !userId) {
    return res.status(400).json({
      status: "Failure",
      message: "epic_number and userId are required",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `ORDV${Date.now()}`;
  const transactionId = `TXNV${Date.now()}`;
  const transactionDetails = `Voter Card Verification Order Id ${orderId}`;
  const creditAmt = 0;

  // Step 1: Fetch current wallet balance
  // const queryBalance = `
  //   SELECT Closing_Balance
  //   FROM user_wallet
  //   WHERE userId = ?
  //   ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
  //   LIMIT 1
  // `;
  const queryBalance = `
SELECT Closing_Balance 
FROM user_wallet 
WHERE userId = ? 
ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC, wid DESC 
LIMIT 1
  `;

  db.query(queryBalance, [userId], async (err, balanceResult) => {
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

    // Step 2: Validate amount
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(500).json({
        success: false,
        status: "Failure",
        error: "Invalid or missing amount",
      });
    }

    amount = parseFloat(parseFloat(amount).toFixed(2));

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

    // Step 3: Insert debit transaction
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
      async (err, walletResult) => {
        if (err) {
          console.error("Error updating wallet balance:", err);
          return res.status(500).json({
            status: "Failure",
            step: "Update Wallet Balance",
            error: "Failed to update wallet balance",
            details: err.message,
          });
        }

        // Step 4: Call Voter Card Verification API
        try {
          const result = await verifyVoterCard(epic_number, orderId);

          // return res.status(200).json({
          //   status: "Success",
          //   wallet: {
          //     transactionId,
          //     newBalance,
          //     previousBalance: currentBalance.toFixed(2),
          //     deductedAmount: amount,
          //   },
          //   voterData: result,
          // });

          if (result.status === "Failure") {
            const refundQuery = `
    INSERT INTO user_wallet 
    (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

            // const refundTransactionId = `TXNREFUND${Date.now()}`;
            const refundTransactionId = `TXNV${Date.now()}`;
            const refundedBalance = (parseFloat(newBalance) + amount).toFixed(
              2
            );

            db.query(
              refundQuery,
              [
                userId,
                createdAt,
                orderId,
                refundTransactionId,
                newBalance,
                refundedBalance,
                "Credit",
                amount,
                0,
                "Refund due to voter verification failure",
                "Success",
              ],
              (refundErr) => {
                if (refundErr) {
                  return res.status(500).json({
                    status: "Failure",
                    step: "Refund Wallet",
                    message: "Verification failed and refund also failed.",
                    details: refundErr.message,
                  });
                }

                return res.status(200).json({
                  status: "Failure",
                  message: "Voter verification failed. Amount refunded.",
                  wallet: {
                    transactionId,
                    refundedTransactionId: refundTransactionId,
                    previousBalance: currentBalance.toFixed(2),
                    newBalance: refundedBalance,
                    refundedAmount: amount,
                  },
                  voterData: result,
                });
              }
            );
          } else {
            // If verification successful
            return res.status(200).json({
              status: "Success",
              wallet: {
                transactionId,
                newBalance,
                previousBalance: currentBalance.toFixed(2),
                deductedAmount: amount,
              },
              voterData: result,
            });
          }
        } catch (err) {
          return res.status(500).json({
            status: "Failure",
            step: "Call Voter Card API",
            message: "Unexpected error occurred while calling voter card API",
            details: err.message,
          });
        }
      }
    );
  });
};

const passportVerification = async (req, res) => {
  const { file_number, dob, userId, amount } = req.body;

  if (!file_number || !dob || !userId || amount == null) {
    return res.status(400).json({
      status: "Failure",
      message: "file_number, dob, userId, and amount are required.",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `ORDP${Date.now()}`;
  const transactionId = `TXNP${Date.now()}`;
  const transactionDetails = `Passport Verification Order Id ${orderId}`;
  const creditAmt = 0;

  // Step 1: Fetch user wallet balance
  // const balanceQuery = `
  //   SELECT Closing_Balance FROM user_wallet
  //   WHERE userId = ?
  //   ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
  //   LIMIT 1
  // `;
  const balanceQuery = `
SELECT Closing_Balance 
FROM user_wallet 
WHERE userId = ? 
ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC, wid DESC 
LIMIT 1
  `;

  db.query(balanceQuery, [userId], async (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failure",
        step: "Fetch Wallet Balance",
        error: "Failed to fetch wallet balance",
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        status: "Failure",
        step: "Fetch Wallet Balance",
        message: "No balance found for the user.",
      });
    }

    const currentBalance = parseFloat(result[0].Closing_Balance);
    const parsedAmount = parseFloat(parseFloat(amount).toFixed(2));

    if (isNaN(currentBalance) || isNaN(parsedAmount)) {
      return res
        .status(400)
        .json({ status: "Failure", message: "Invalid amount or balance" });
    }

    if (currentBalance < parsedAmount) {
      return res.status(400).json({
        status: "Failure",
        step: "Wallet Deduction",
        message: "Insufficient balance.",
        currentBalance,
        requiredAmount: parsedAmount,
      });
    }

    const newBalance = parseFloat(currentBalance - parsedAmount).toFixed(2);

    // Step 2: Deduct wallet balance
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
        parsedAmount,
        transactionDetails,
        "Success",
      ],
      async (err2) => {
        if (err2) {
          return res.status(500).json({
            status: "Failure",
            step: "Wallet Update",
            message: err2.message,
          });
        }

        // Step 3: Call external API
        try {
          const result = await verifyPassport(file_number, dob, orderId);
          // return res.status(result.status === "Success" ? 200 : 400).json({
          //   status: "Success",
          //   wallet: {
          //     transactionId,
          //     newBalance,
          //     previousBalance: currentBalance.toFixed(2),
          //     deductedAmount: parsedAmount,
          //   },
          //   passportData: result,
          // });

          if (result.status === "Failure") {
            const refundQuery = `
    INSERT INTO user_wallet 
    (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

            const refundTransactionId = `TXNV${Date.now()}`;
            // const refundedBalance = (parseFloat(newBalance) + amount).toFixed(
            //   2
            // );
            const refundedBalance = (
              parseFloat(newBalance) + parseFloat(amount)
            ).toFixed(2);

            db.query(
              refundQuery,
              [
                userId,
                createdAt,
                orderId,
                refundTransactionId,
                newBalance,
                refundedBalance,
                "Credit",
                amount,
                0,
                "Refund due to Passport Verification failure",
                "Success",
              ],
              (refundErr) => {
                if (refundErr) {
                  return res.status(500).json({
                    status: "Failure",
                    step: "Refund Wallet",
                    message: "Verification failed and refund also failed.",
                    details: refundErr.message,
                  });
                }

                return res.status(200).json({
                  status: "Failure",
                  message: "Passport Verification failed. Amount refunded.",
                  wallet: {
                    transactionId,
                    refundedTransactionId: refundTransactionId,
                    previousBalance: currentBalance.toFixed(2),
                    newBalance: refundedBalance,
                    refundedAmount: amount,
                  },
                  voterData: result,
                });
              }
            );
          } else {
            // If verification successful
            return res.status(200).json({
              status: "Success",
              wallet: {
                transactionId,
                newBalance,
                previousBalance: currentBalance.toFixed(2),
                deductedAmount: amount,
              },
              passportData: result,
            });
          }
        } catch (error) {
          return res.status(500).json({
            status: "Failure",
            step: "API Call",
            message: error.message,
          });
        }
      }
    );
  });
};

const getOtp = async (req, res) => {
  const { aadhaar_number, orderid } = req.query;
  try {
    const response = await getAadhaarOtp(aadhaar_number, orderid);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: error.response?.data?.message || "Internal Server Error",
    });
  }
};

const verifyOtp = async (req, res) => {
  const { aadhaar_number, ref_id, otp, orderid } = req.query;
  try {
    const response = await verifyAadhaarOtp(
      aadhaar_number,
      ref_id,
      otp,
      orderid
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      status: "Failure",
      message: error.response?.data?.message || "Internal Server Error",
    });
  }
};

const aadhaarSendOtp = async (req, res) => {
  const { aadhaar_number, userId, amount } = req.body;

  if (!aadhaar_number || !userId || amount == null) {
    return res.status(400).json({
      status: "Failure",
      message: "aadhaar_number, userId and amount are required.",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `ORDA${Date.now()}`;
  const transactionId = `TXNA${Date.now()}`;
  const transactionDetails = `Aadhaar OTP Send Order ${orderId}`;
  const creditAmt = 0;

  // Step 1: Fetch wallet balance
  // const balanceQuery = `
  //   SELECT Closing_Balance FROM user_wallet
  //   WHERE userId = ?
  //   ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
  //   LIMIT 1
  // `;
  const balanceQuery = `
SELECT Closing_Balance 
FROM user_wallet 
WHERE userId = ? 
ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC, wid DESC 
LIMIT 1
  `;

  db.query(balanceQuery, [userId], async (err, result) => {
    if (err || result.length === 0) {
      return res.status(500).json({
        status: "Failure",
        step: "Fetch Wallet Balance",
        message: err?.message || "No balance found for user",
      });
    }

    const currentBalance = parseFloat(result[0].Closing_Balance);
    const parsedAmount = parseFloat(parseFloat(amount).toFixed(2));
    if (currentBalance < parsedAmount) {
      return res.status(400).json({
        status: "Failure",
        step: "Wallet Deduction",
        message: "Insufficient balance.",
      });
    }

    const newBalance = (currentBalance - parsedAmount).toFixed(2);

    // Step 2: Deduct wallet
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
        parsedAmount,
        transactionDetails,
        "Success",
      ],
      async (err2) => {
        if (err2) {
          return res.status(500).json({
            status: "Failure",
            step: "Wallet Update",
            message: err2.message,
          });
        }

        // Step 3: Call external Aadhaar OTP API
        try {
          const response = await getAadhaarOtp(aadhaar_number, orderId);
          const data = response.data;

          if (data.status === "Failure") {
            // Refund
            const refundTransactionId = `TXNR${Date.now()}`;
            const refundedBalance = (
              parseFloat(newBalance) + parsedAmount
            ).toFixed(2);

            db.query(
              updateWalletQuery,
              [
                userId,
                createdAt,
                orderId,
                refundTransactionId,
                newBalance,
                refundedBalance,
                "Credit",
                parsedAmount,
                0,
                "Refund due to OTP send failure",
                "Success",
              ],
              (refundErr) => {
                if (refundErr) {
                  return res.status(500).json({
                    status: "Failure",
                    step: "Refund Wallet",
                    message: "OTP Send failed and refund also failed.",
                    details: refundErr.message,
                  });
                }

                return res.status(200).json({
                  status: "Failure",
                  message: "OTP Send failed. Amount refunded.",
                  wallet: {
                    transactionId,
                    refundedTransactionId: refundTransactionId,
                    newBalance: refundedBalance,
                    refundedAmount: parsedAmount,
                  },
                  apiData: data,
                });
              }
            );
          } else {
            return res.status(200).json({
              status: "Success",
              message: "OTP sent successfully",
              wallet: {
                transactionId,
                newBalance,
                previousBalance: currentBalance.toFixed(2),
                deductedAmount: parsedAmount,
              },
              otpData: data,
              orderId,
            });
          }
        } catch (error) {
          return res.status(500).json({
            status: "Failure",
            step: "OTP API Call",
            message: error.message,
          });
        }
      }
    );
  });
};

const aadhaarVerifyOtp = async (req, res) => {
  const { aadhaar_number, ref_id, otp, orderid } = req.body;

  if (!aadhaar_number || !ref_id || !otp || !orderid) {
    return res.status(400).json({
      status: "Failure",
      message: "aadhaar_number, ref_id, otp, and orderid are required.",
    });
  }

  try {
    const response = await verifyAadhaarOtp(
      aadhaar_number,
      ref_id,
      otp,
      orderid
    );

    const result = response.data;

    if (result.status === "Success") {
      return res.status(200).json({
        status: "Success",
        aadhaarData: result,
      });
    } else {
      return res.status(400).json({
        status: "Failure",
        message: "OTP verification failed",
        aadhaarData: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Failure",
      message: error.response?.data?.message || "Internal Server Error",
    });
  }
};

const handleVehicleRCVerification = async (req, res) => {
  const { vehicle_number, orderid } = req.query;

  if (!vehicle_number || !orderid) {
    return res.status(400).json({
      status: "Failure",
      message: "Missing vehicle_number or orderid",
    });
  }

  const result = await verifyVehicleRC(vehicle_number, orderid);

  if (result.status === "Success") {
    return res.status(200).json(result);
  } else {
    return res.status(400).json(result);
  }
};

const VehicleRCVerification = async (req, res) => {
  const { vehicle_number, userId, amount } = req.body;

  if (!vehicle_number || !userId || amount == null) {
    return res.status(400).json({
      status: "Failure",
      message: "vehicle_number, userId, and amount are required.",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `ORDP${Date.now()}`;
  const transactionId = `TXNP${Date.now()}`;
  const transactionDetails = `Vehicle RC Verification Order Id ${orderId}`;
  const creditAmt = 0;

  // Step 1: Fetch user wallet balance
  // const balanceQuery = `
  //   SELECT Closing_Balance FROM user_wallet
  //   WHERE userId = ?
  //   ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
  //   LIMIT 1
  // `;
  const balanceQuery = `
SELECT Closing_Balance 
FROM user_wallet 
WHERE userId = ? 
ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC, wid DESC 
LIMIT 1
  `;

  db.query(balanceQuery, [userId], async (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failure",
        step: "Fetch Wallet Balance",
        error: "Failed to fetch wallet balance",
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        status: "Failure",
        step: "Fetch Wallet Balance",
        message: "No balance found for the user.",
      });
    }

    const currentBalance = parseFloat(result[0].Closing_Balance);
    const parsedAmount = parseFloat(parseFloat(amount).toFixed(2));

    if (isNaN(currentBalance) || isNaN(parsedAmount)) {
      return res.status(400).json({
        status: "Failure",
        message: "Invalid amount or balance",
      });
    }

    if (currentBalance < parsedAmount) {
      return res.status(400).json({
        status: "Failure",
        step: "Wallet Deduction",
        message: "Insufficient balance.",
        currentBalance,
        requiredAmount: parsedAmount,
      });
    }

    const newBalance = parseFloat(currentBalance - parsedAmount).toFixed(2);

    // Step 2: Deduct wallet balance
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
        parsedAmount,
        transactionDetails,
        "Success",
      ],
      async (err2) => {
        if (err2) {
          return res.status(500).json({
            status: "Failure",
            step: "Wallet Update",
            message: err2.message,
          });
        }

        // Step 3: Call external API
        try {
          const result = await verifyVehicleRC(vehicle_number, orderId);

          if (result.status === "Failure") {
            const refundQuery = `
              INSERT INTO user_wallet 
              (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const refundTransactionId = `TXNV${Date.now()}`;
            const refundedBalance = (parseFloat(newBalance) + amount).toFixed(
              2
            );

            db.query(
              refundQuery,
              [
                userId,
                createdAt,
                orderId,
                refundTransactionId,
                newBalance,
                refundedBalance,
                "Credit",
                amount,
                0,
                "Refund due to Vehicle RC Verification failure",
                "Success",
              ],
              (refundErr) => {
                if (refundErr) {
                  return res.status(500).json({
                    status: "Failure",
                    step: "Refund Wallet",
                    message: "Verification failed and refund also failed.",
                    details: refundErr.message,
                  });
                }

                return res.status(200).json({
                  status: "Failure",
                  message: "Vehicle RC Verification failed. Amount refunded.",
                  wallet: {
                    transactionId,
                    refundedTransactionId: refundTransactionId,
                    previousBalance: currentBalance.toFixed(2),
                    newBalance: refundedBalance,
                    refundedAmount: amount,
                  },
                  rcData: result,
                });
              }
            );
          } else {
            return res.status(200).json({
              status: "Success",
              wallet: {
                transactionId,
                newBalance,
                previousBalance: currentBalance.toFixed(2),
                deductedAmount: amount,
              },
              rcData: result,
            });
          }
        } catch (error) {
          return res.status(500).json({
            status: "Failure",
            step: "API Call",
            message: error.message,
          });
        }
      }
    );
  });
};

const verifyDLController = async (req, res) => {
  const { dl_number, dob, orderid } = req.query;

  if (!dl_number || !dob || !orderid) {
    return res
      .status(400)
      .json({ status: "Failure", message: "Missing required parameters" });
  }

  const result = await verifyDrivingLicense({
    dl_number,
    dob,
    orderid,
  });

  if (result.status === "Success") {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};

const gstVerificationController = async (req, res) => {
  const { gst, orderid } = req.query;

  if (!gst || !orderid) {
    return res
      .status(400)
      .json({ status: "Failure", message: "GST and orderid are required" });
  }

  const result = await verifyGST(gst, orderid);
  res.json(result);
};

const fetchGSTVerification = async (req, res) => {
  const { gst, userId } = req.body;
  let { amount } = req.body;

  if (!gst || !userId) {
    return res.status(400).json({
      status: "Failure",
      message: "gst and userId are required",
    });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const orderId = `ORDV${Date.now()}`;
  const transactionId = `TXNV${Date.now()}`;
  const transactionDetails = `GST Verification Order Id ${orderId}`;
  const creditAmt = 0;

  // Step 1: Fetch current wallet balance
  // const queryBalance = `
  //   SELECT Closing_Balance
  //   FROM user_wallet
  //   WHERE userId = ?
  //   ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
  //   LIMIT 1
  // `;
  const queryBalance = `
SELECT Closing_Balance 
FROM user_wallet 
WHERE userId = ? 
ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC, wid DESC 
LIMIT 1
  `;

  db.query(queryBalance, [userId], async (err, balanceResult) => {
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

    // Step 2: Validate amount
    if (amount == null || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(500).json({
        success: false,
        status: "Failure",
        error: "Invalid or missing amount",
      });
    }

    amount = parseFloat(parseFloat(amount).toFixed(2));

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

    // Step 3: Insert debit transaction
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
      async (err, walletResult) => {
        if (err) {
          console.error("Error updating wallet balance:", err);
          return res.status(500).json({
            status: "Failure",
            step: "Update Wallet Balance",
            error: "Failed to update wallet balance",
            details: err.message,
          });
        }

        // Step 4: Call GST Verification API
        try {
          const result = await verifyGST(gst, orderId);

          if (result.status === "Failure") {
            const refundQuery = `
    INSERT INTO user_wallet 
    (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

            const refundTransactionId = `TXNV${Date.now()}`;
            const refundedBalance = (parseFloat(newBalance) + amount).toFixed(
              2
            );

            db.query(
              refundQuery,
              [
                userId,
                createdAt,
                orderId,
                refundTransactionId,
                newBalance,
                refundedBalance,
                "Credit",
                amount,
                0,
                "Refund due to GST verification failure",
                "Success",
              ],
              (refundErr) => {
                if (refundErr) {
                  return res.status(500).json({
                    status: "Failure",
                    step: "Refund Wallet",
                    message: "Verification failed and refund also failed.",
                    details: refundErr.message,
                  });
                }

                return res.status(200).json({
                  status: "Failure",
                  message: "GST verification failed. Amount refunded.",
                  wallet: {
                    transactionId,
                    refundedTransactionId: refundTransactionId,
                    previousBalance: currentBalance.toFixed(2),
                    newBalance: refundedBalance,
                    refundedAmount: amount,
                  },
                  gstData: result,
                });
              }
            );
          } else {
            // If verification successful
            return res.status(200).json({
              status: "Success",
              wallet: {
                transactionId,
                newBalance,
                previousBalance: currentBalance.toFixed(2),
                deductedAmount: amount,
              },
              gstData: result,
            });
          }
        } catch (err) {
          return res.status(500).json({
            status: "Failure",
            step: "Call GST API",
            message: "Unexpected error occurred while calling GST API",
            details: err.message,
          });
        }
      }
    );
  });
};

module.exports = {
  getPanByAadhaar,
  getPanDetails,
  PanByAadhaar,
  PanDetails,
  fetchRcPdf,
  fetchRcDetails,
  dlPrintController,
  fetchDLdetails,
  voterCardVerification,
  fetchVoterVerification,
  passportVerification,
  getOtp,
  verifyOtp,
  aadhaarSendOtp,
  aadhaarVerifyOtp,
  handleVehicleRCVerification,
  VehicleRCVerification,
  verifyDLController,
  gstVerificationController,
  fetchGSTVerification,
};
