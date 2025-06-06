const moment = require("moment-timezone");
const { db } = require("../../connect");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const deeperwebBaseURL = process.env.deeperwebBaseURL;
const deeperwebUserID = process.env.deeperwebUserID;
const Token = process.env.deeperwebToken;
const apiClient = axios.create({
  baseURL: deeperwebBaseURL,
});

const getDataFromdeeperwebClientApi = (endpoint, params = {}) => {
  return apiClient
    .get(endpoint, {
      params: {
        username: deeperwebUserID,
        api_token: Token,
        ...params,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data from client API:", error.message);
      throw error;
    });
};

const deeperwebBalance = (req, res) => {
  const endpoint = "/balance";

  getDataFromdeeperwebClientApi(endpoint, {})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("Error fetching data from client API");
    });
};

const operatorMapping = {
  Airtel: { code: "AT", category: "Prepaid" },
  "BSNL STV": { code: "BSP", category: "Prepaid" },
  "BSNL TOPUP": { code: "BT", category: "Prepaid" },
  "Airtel Postpaid": { code: "AT", category: "Postpaid" },
  "BSNL Postpaid": { code: "", category: "Postpaid" },
  Jio: { code: "JIO", category: "Prepaid" },
  "Jio Postpaid": { code: "JIO", category: "Postpaid" },
  Vi: { code: "VI", category: "Prepaid" },
  "Vi Postpaid": { code: "VI", category: "Postpaid" },
  "Dish TV": { code: "DISHTV", category: "DTH" },
  "Tata Sky": { code: "TATASKY", category: "DTH" },
  Videocon: { code: "VDDTH", category: "DTH" },
  "Sun Direct": { code: "SUNDTH", category: "DTH" },
  "Airtel DTH": { code: "ATDTH", category: "DTH" },
};

// const deeperwebRecharge = (req, res) => {
//   let responseSent = false;
//   const {
//     number,
//     amount,
//     walletDeductAmt,
//     operatorName,
//     recharge_Type,
//     created_by_userid,
//   } = req.body;

//   if (
//     !number ||
//     !amount ||
//     !walletDeductAmt ||
//     !operatorName ||
//     !recharge_Type ||
//     !created_by_userid
//   ) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const updatedAt = createdAt;
//   const providerName = "Deeperweb";

//   const operatorDetails = operatorMapping[operatorName];
//   if (!operatorDetails) {
//     return res.status(400).json({ error: "Invalid operator name" });
//   }

//   const queryBalance = `
//     SELECT Closing_Balance
//     FROM user_wallet
//     WHERE userId = ?
//     ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
//     LIMIT 1
//   `;

//   db.query(queryBalance, [created_by_userid], (err, balanceResult) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ error: "Error fetching wallet balance", message: err.message });
//     }

//     const currentBalance = parseFloat(balanceResult?.[0]?.Closing_Balance || 0);
//     if (!currentBalance || currentBalance < amount) {
//       return res.status(400).json({ error: "Insufficient wallet balance" });
//     }

//     const orderId = `DEP${Date.now()}`;

//     // Step 1: Fetch Deeperweb balance
//     getDataFromdeeperwebClientApi("/balance", {})
//       .then((balanceData) => {
//         if (!balanceData || balanceData.totalBalance < amount) {
//           throw new Error("Insufficient balance in Recharge API");
//         }
//       })
//       .then(() => {
//         // Step 2: Insert initial row to generate orderid
//         const insertQuery =
//           "INSERT INTO recharges (mobile_no, amount, walletDeductAmt, operator_name, providerName, recharge_Type, created_by_userid, created_at, orderid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
//         const values = [
//           number,
//           amount,
//           walletDeductAmt,
//           operatorName,
//           providerName,
//           recharge_Type,
//           created_by_userid,
//           createdAt,
//           orderId,
//         ];

//         return new Promise((resolve, reject) => {
//           db.query(insertQuery, values, (err, result) => {
//             if (err) return reject(err);
//             resolve({ orderId, operatorDetails, id: result.insertId });
//           });
//         });
//       })
//       .then(({ orderId, operatorDetails, id }) => {
//         // Step 3: Perform recharge
//         return getDataFromdeeperwebClientApi("/recharge", {
//           number,
//           amount,
//           operator: operatorDetails.code,
//           ref_id: orderId,
//         }).then((apiResponse) => {
//           if (!apiResponse || !apiResponse.status) {
//             throw new Error("Invalid response from Recharge API");
//           }
//           return { rechargeData: apiResponse, id, orderId };
//         });
//       })
//       .then(({ rechargeData, id, orderId }) => {
//         // Step 4: Update the recharge data
//         const updateQuery =
//           "UPDATE recharges SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?, message = ?, updated_at = ? WHERE id = ?";

//         const updateValues = [
//           operatorDetails.code,
//           rechargeData.status,
//           rechargeData.txn_id,
//           rechargeData.opt_id,
//           orderId,
//           rechargeData.message,
//           updatedAt,
//           id,
//         ];

//         return new Promise((resolve, reject) => {
//           db.query(updateQuery, updateValues, (err) => {
//             if (err) return reject(err);
//             resolve({ rechargeData, orderId });
//           });
//         });
//       })
//       .then(({ rechargeData, orderId }) => {
//         // if (rechargeData.status === "Success") {
//         if (
//           rechargeData.status === "Success" ||
//           rechargeData.status === "Pending"
//         ) {
//           let rechargeMessage = "Recharge in process";
//           if (rechargeData.STATUS === "Success") {
//             rechargeMessage = "Recharge successful";
//           } else if (rechargeData.STATUS === "Pending") {
//             rechargeMessage = "Recharge in process";
//           }
//           const newWalletBalance = (currentBalance - walletDeductAmt).toFixed(
//             2
//           );
//           const transactionDetails = `Recharge Deduction ${number}`;
//           const transactionId = `TXNW${Date.now()}`;

//           const updateWalletQuery = `
//             INSERT INTO user_wallet
//             (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//           `;

//           return new Promise((resolve, reject) => {
//             db.query(
//               updateWalletQuery,
//               [
//                 created_by_userid,
//                 updatedAt,
//                 orderId,
//                 transactionId,
//                 currentBalance.toFixed(2),
//                 newWalletBalance,
//                 "Debit",
//                 0,
//                 walletDeductAmt,
//                 transactionDetails,
//                 "Success",
//               ],
//               (err) => {
//                 if (err) return reject(err);
//                 resolve({
//                   // message: "Recharge successful",
//                   message: rechargeMessage,
//                   rechargeData,
//                   wallet: {
//                     previousBalance: currentBalance,
//                     newBalance: newWalletBalance,
//                   },
//                   orderId,
//                 });
//               }
//             );
//           });
//         } else {
//           throw new Error(rechargeData.message || "Recharge failed");
//         }
//       })
//       .then((result) => {
//         if (!responseSent) {
//           responseSent = true;
//           res.json(result);
//         }
//       })
//       .catch((error) => {
//         console.error("Error during recharge process:", error.message);
//         if (!responseSent) {
//           responseSent = true;
//           res.status(500).json({
//             error: "Error during recharge process",
//             message: error.message,
//           });
//         }
//       });
//   });
// };

const deeperwebRecharge = (req, res) => {
  let responseSent = false;
  const {
    number,
    amount,
    walletDeductAmt,
    operatorName,
    recharge_Type,
    created_by_userid,
  } = req.body;

  if (
    !number ||
    !amount ||
    !walletDeductAmt ||
    !operatorName ||
    !recharge_Type ||
    !created_by_userid
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = createdAt;
  const providerName = "Deeperweb";

  const operatorQuery = `
    SELECT * FROM api_operator_map
    WHERE operator_name = ? AND api_name = 'Deeperweb' AND status = 'Active'
    LIMIT 1
  `;

  db.query(operatorQuery, [operatorName], (err, operatorResult) => {
    if (err) {
      return res.status(500).json({
        error: "Database Error (operator fetch)",
        message: err.message,
      });
    }
    if (operatorResult.length === 0) {
      return res
        .status(404)
        .json({ error: "Operator not found for Deeperweb" });
    }

    const operatorCode = operatorResult[0].code;

    // Step 1: Check User Wallet Balance
    const queryBalance = `
    SELECT Closing_Balance
    FROM user_wallet
    WHERE userId = ?
    ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
    LIMIT 1
  `;
    db.query(queryBalance, [created_by_userid], (err, balanceResult) => {
      if (err) {
        return res.status(500).json({
          error: "Error fetching wallet balance",
          message: err.message,
        });
      }

      const currentBalance = parseFloat(
        balanceResult?.[0]?.Closing_Balance || 0
      );
      if (!currentBalance || currentBalance < amount) {
        return res.status(400).json({ error: "Insufficient wallet balance" });
      }

      const orderId = `DEP${Date.now()}`;

      // Step 1: Fetch Deeperweb balance
      getDataFromdeeperwebClientApi("/balance", {})
        .then((balanceData) => {
          if (!balanceData || balanceData.totalBalance < amount) {
            throw new Error("Insufficient balance in Recharge API");
          }
        })
        .then(() => {
          // Step 2: Insert initial row to generate orderid
          const insertQuery =
            "INSERT INTO recharges (mobile_no, amount, walletDeductAmt, operator_name, providerName, recharge_Type, created_by_userid, created_at, orderid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
          const values = [
            number,
            amount,
            walletDeductAmt,
            operatorName,
            providerName,
            recharge_Type,
            created_by_userid,
            createdAt,
            orderId,
          ];

          return new Promise((resolve, reject) => {
            db.query(insertQuery, values, (err, result) => {
              if (err) return reject(err);
              resolve({ orderId, operatorCode, id: result.insertId });
            });
          });
        })
        .then(({ orderId, operatorCode, id }) => {
          // Step 3: Perform recharge
          return getDataFromdeeperwebClientApi("/recharge", {
            number,
            amount,
            operator: operatorCode,
            ref_id: orderId,
          }).then((apiResponse) => {
            if (!apiResponse || !apiResponse.status) {
              throw new Error("Invalid response from Recharge API");
            }
            return { rechargeData: apiResponse, id, orderId };
          });
        })
        .then(({ rechargeData, id, orderId }) => {
          // Step 4: Update the recharge data
          const updateQuery =
            "UPDATE recharges SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?, message = ?, updated_at = ? WHERE id = ?";

          const updateValues = [
            operatorCode,
            rechargeData.status,
            rechargeData.txn_id,
            rechargeData.opt_id,
            orderId,
            rechargeData.message,
            updatedAt,
            id,
          ];

          return new Promise((resolve, reject) => {
            db.query(updateQuery, updateValues, (err) => {
              if (err) return reject(err);
              resolve({ rechargeData, orderId });
            });
          });
        })
        .then(({ rechargeData, orderId }) => {
          // if (rechargeData.status === "Success") {
          if (
            rechargeData.status === "Success" ||
            rechargeData.status === "Pending"
          ) {
            let rechargeMessage = "Recharge in process";
            if (rechargeData.STATUS === "Success") {
              rechargeMessage = "Recharge successful";
            } else if (rechargeData.STATUS === "Pending") {
              rechargeMessage = "Recharge in process";
            }
            const newWalletBalance = (currentBalance - walletDeductAmt).toFixed(
              2
            );
            const transactionDetails = `Recharge Deduction ${number}`;
            const transactionId = `TXNW${Date.now()}`;

            const updateWalletQuery = `
            INSERT INTO user_wallet
            (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

            return new Promise((resolve, reject) => {
              db.query(
                updateWalletQuery,
                [
                  created_by_userid,
                  updatedAt,
                  orderId,
                  transactionId,
                  currentBalance.toFixed(2),
                  newWalletBalance,
                  "Debit",
                  0,
                  walletDeductAmt,
                  transactionDetails,
                  "Success",
                ],
                (err) => {
                  if (err) return reject(err);
                  resolve({
                    // message: "Recharge successful",
                    message: rechargeMessage,
                    rechargeData,
                    wallet: {
                      previousBalance: currentBalance,
                      newBalance: newWalletBalance,
                    },
                    orderId,
                  });
                }
              );
            });
          } else {
            throw new Error(rechargeData.message || "Recharge failed");
          }
        })
        .then((result) => {
          if (!responseSent) {
            responseSent = true;
            res.json(result);
          }
        })
        .catch((error) => {
          console.error("Error during recharge process:", error.message);
          if (!responseSent) {
            responseSent = true;
            res.status(500).json({
              error: "Error during recharge process",
              message: error.message,
            });
          }
        });
    });
  });
};

const deeperwebRechargeStatusCheck = (req, res) => {
  const { transaction_id, recharge_date } = req.body;
  const endpoint = "/statusByRefId";
  // Generate random 6-digit number for OutletID
  // const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();

  getDataFromdeeperwebClientApi(endpoint, {
    ref_id: transaction_id,
    recharge_date: recharge_date,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("Error fetching data from client API");
    });
};

module.exports = {
  deeperwebBalance,
  deeperwebRecharge,
  deeperwebRechargeStatusCheck,
};

// const deeperwebRecharge = (req, res) => {
//   const { number, amount, operatorName, recharge_Type, created_by_userid } =
//     req.body;
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const providerName = "Deeperweb";

//   let responseSent = false; // Flag to track if response has been sent

//   if (!number || !amount || !operatorName) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const operatorDetails = operatorMapping[operatorName];
//   const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();

//   // Step 1: Fetch balance
//   getDataFromdeeperwebClientApi("/balance", {})
//     .then((balanceData) => {
//       if (balanceData?.totalBalance < amount) {
//         if (!responseSent) {
//           // Check if response was already sent
//           responseSent = true;
//           return res.status(400).json({
//             message: "Recharge failed",
//             error: "Insufficient balance in Recharge Api",
//           });
//         }
//       }

//       // Step 2: Map operator name to code
//       if (!operatorDetails) {
//         if (!responseSent) {
//           responseSent = true;
//           return res.status(400).json({ error: "Invalid operator name" });
//         }
//       }

//       // Step 3: Insert initial row to generate orderid
//       const insertQuery =
//         "INSERT INTO recharges (mobile_no, amount, operator_name, providerName, recharge_Type, created_by_userid, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
//       const values = [
//         number,
//         amount,
//         operatorName,
//         providerName,
//         recharge_Type,
//         created_by_userid,
//         createdAt,
//       ];

//       return new Promise((resolve, reject) => {
//         db.query(insertQuery, values, (err, result) => {
//           if (err) {
//             console.error("Error generating orderid:", err.message);
//             return reject(err);
//           }

//           const autoGeneratedOrderId = result.insertId;
//           const formattedOrderId = `RED${String(autoGeneratedOrderId).padStart(
//             6,
//             "0"
//           )}`;
//           resolve({ orderid: formattedOrderId, id: autoGeneratedOrderId });
//         });
//       });
//     })
//     .then(({ orderid, id }) => {
//       // Step 4: Perform recharge with the generated orderid
//       return getDataFromdeeperwebClientApi("/recharge", {
//         number: number,
//         amount: amount,
//         operator: operatorDetails.code,
//         ref_id: orderid,
//       }).then((rechargeData) => {
//         return { rechargeData, id, orderid };
//       });
//     })
//     .then(({ rechargeData, id, orderid }) => {
//       // Step 5: Update the recharge row with API response data
//       const updateQuery =
//         "UPDATE recharges SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?, message = ?, updated_at = ? WHERE id = ?";
//       // const getStatus = () => {
//       //   if (rechargeData?.status == 1) {
//       //     return "Pending";
//       //   } else if (rechargeData?.status == 2) {
//       //     return "Success";
//       //   } else {
//       //     return "Failure";
//       //   }
//       // };
//       // const Status = getStatus();

//       const updateValues = [
//         operatorDetails?.code,
//         rechargeData?.status,
//         rechargeData?.txn_id,
//         rechargeData?.opt_id,
//         orderid,
//         rechargeData?.message,
//         updatedAt,
//         id,
//       ];

//       db.query(updateQuery, updateValues, (err, result) => {
//         if (err) {
//           console.error("Error updating recharge data:", err.message);
//           if (!responseSent) {
//             responseSent = true;
//             return res
//               .status(500)
//               .json({ error: "Database update error", message: err.message });
//           }
//         }

//         // Step 6: Respond with the recharge data and orderid
//         if (
//           rechargeData?.status == "Accepted" ||
//           rechargeData?.status == "Success"
//         ) {
//           if (!responseSent) {
//             responseSent = true;
//             return res.json({
//               message: "Recharge successful",
//               rechargeData,
//               orderid: rechargeData?.ref_id,
//             });
//           }
//         } else if (rechargeData?.status == "Pending") {
//           if (!responseSent) {
//             responseSent = true;
//             return res.json({
//               message: "Recharge IN PROCESS",
//               rechargeData,
//               orderid: rechargeData?.ref_id,
//             });
//           }
//         } else {
//           if (!responseSent) {
//             responseSent = true;
//             return res.json({
//               message: "Recharge failed",
//               rechargeData,
//               orderid: rechargeData?.ref_id,
//             });
//           }
//         }
//       });
//     })
//     .catch((error) => {
//       console.error("Error during recharge process:", error.message);
//       if (!responseSent) {
//         responseSent = true;
//         return res.status(500).json({
//           error: "Error during recharge process",
//           message: error.message,
//         });
//       }
//     });
// };
