const moment = require("moment-timezone");
const { db } = require("../../connect");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const cgonePayBaseURL = process.env.cgonePayBaseURL;
const Token = process.env.cgonePayToken;
const apiClient = axios.create({
  baseURL: cgonePayBaseURL,
});

const getDataFromcgonePayClientApi = (endpoint, params = {}) => {
  return apiClient
    .get(endpoint, {
      params: {
        Apitoken: Token,
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

const cgonePayBalance = (req, res) => {
  const endpoint = "/Balance.aspx";

  getDataFromcgonePayClientApi(endpoint, {})
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
  Airtel: { code: "3", category: "Prepaid" },
  "BSNL STV": { code: "151", category: "Prepaid" },
  "BSNL TOPUP": { code: "5", category: "Prepaid" },
  "Airtel Postpaid": { code: "41", category: "Postpaid" },
  "BSNL Postpaid": { code: "104", category: "Postpaid" },
  Jio: { code: "26", category: "Prepaid" },
  "Jio Postpaid": { code: "103", category: "Postpaid" },
  Vi: { code: "2", category: "Prepaid" },
  "Vi Postpaid": { code: "114", category: "Postpaid" },
  "Dish TV": { code: "35", category: "DTH" },
  "Tata Sky": { code: "31", category: "DTH" },
  Videocon: { code: "33", category: "DTH" },
  "Sun Direct": { code: "36", category: "DTH" },
  "Airtel DTH": { code: "34", category: "DTH" },
};

const cgonepayRecharge = (req, res) => {
  let responseSent = false;

  const {
    number,
    amount,
    walletDeductAmt,
    operatorName,
    recharge_Type,
    created_by_userid,
  } = req.body;

  // Validate input
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

  const providerName = "CgonePay";
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = createdAt;

  const queryBalance = `
    SELECT Closing_Balance
    FROM user_wallet
    WHERE userId = ?
    ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
    LIMIT 1
  `;

  db.query(queryBalance, [created_by_userid], (err, balanceResult) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error fetching wallet balance", message: err.message });
    }

    const currentBalance = parseFloat(balanceResult?.[0]?.Closing_Balance || 0);
    if (!currentBalance || currentBalance < amount) {
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    const orderId = `CGP${Date.now()}`;
    const operatorDetails = operatorMapping[operatorName];

    // Validate operator details
    if (!operatorDetails) {
      return res.status(400).json({
        error: "Invalid operator name",
        message: `Operator ${operatorName} is not supported.`,
      });
    }

    // Check provider balance via cgonePay client API
    getDataFromcgonePayClientApi("/Balance.aspx", {})
      .then((balanceData) => {
        if (!balanceData || balanceData?.bal < amount) {
          throw new Error("Insufficient balance in Recharge API");
        }

        // Insert recharge details into the database
        const insertQuery = `
          INSERT INTO recharges (mobile_no, amount, walletDeductAmt, operator_name, providerName, recharge_Type, created_by_userid, created_at, orderid)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
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
            if (err) {
              reject(
                new Error(`Error inserting recharge details: ${err.message}`)
              );
            } else {
              resolve({ orderId, operatorDetails, id: result.insertId });
            }
          });
        });
      })
      .then(({ orderId, operatorDetails, id }) =>
        getDataFromcgonePayClientApi("/Recharge.aspx", {
          Amount: amount,
          OperatorCode: operatorDetails.code,
          Number: number,
          ClientId: orderId,
        }).then((rechargeData) => ({ rechargeData, orderId, id }))
      )
      .then(({ rechargeData, orderId, id }) => {
        if (!rechargeData)
          throw new Error("Recharge API response is empty or invalid");

        const updateQuery = `
          UPDATE recharges 
          SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?, message = ?, updated_at = ? 
          WHERE id = ?
        `;
        const updateValues = [
          operatorDetails.code,
          rechargeData.STATUS,
          rechargeData.TRANSACTIONID,
          rechargeData.OPERATORID,
          orderId,
          rechargeData.MESSAGE,
          updatedAt,
          id,
        ];

        return new Promise((resolve, reject) => {
          db.query(updateQuery, updateValues, (err) => {
            if (err) {
              reject(
                new Error(`Error updating recharge record: ${err.message}`)
              );
            } else {
              resolve({ rechargeData, orderId });
            }
          });
        });
      })
      .then(({ rechargeData, orderId }) => {
        if (
          rechargeData.STATUS === "SUCCESS" ||
          rechargeData.STATUS === "IN PROCESS"
        ) {
          // const rechargeMessage = rechargeData.STATUS === "SUCCESS" ? "Recharge successful" : rechargeData.STATUS === "IN PROCESS" ? ""
          let rechargeMessage = "Recharge in process";
          if (rechargeData.STATUS === "SUCCESS") {
            rechargeMessage = "Recharge successful";
          } else if (rechargeData.STATUS === "IN PROCESS") {
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
                if (err) {
                  reject(
                    new Error(`Error updating wallet balance: ${err.message}`)
                  );
                } else {
                  resolve({
                    message: rechargeMessage,
                    rechargeData,
                    wallet: {
                      previousBalance: currentBalance,
                      newBalance: newWalletBalance,
                    },
                    orderId,
                  });
                }
              }
            );
          });
        } else {
          return { message: "Recharge failed", rechargeData };
        }
      })
      .then((result) => {
        if (!responseSent) {
          responseSent = true;
          res.json(result);
        }
      })
      .catch((error) => {
        console.error("Error processing recharge:", error.message);
        if (!responseSent) {
          responseSent = true;
          res.status(500).json({ error: error.message || "Recharge failed" });
        }
      });
  });
};

const cgonepayRechargeA = (req, res) => {
  let responseSent = false;

  const {
    number,
    amount,
    walletDeductAmt,
    operatorName,
    recharge_Type,
    created_by_userid,
  } = req.body;

  // Validate input
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

  const providerName = "CgonePay";
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = createdAt;

  const operatorQuery = `
  SELECT *
  FROM api_operator_map 
  WHERE api_name = 'CgonePay' AND operator_name = ? AND status = 'Active' 
  LIMIT 1
`;

  db.query(operatorQuery, [operatorName], (err, operatorResult) => {
    if (err) {
      return res.status(500).json({
        error: "Error fetching operator code",
        message: err.message,
      });
    }

    if (operatorResult.length === 0) {
      return res.status(400).json({
        error: "Invalid or inactive operator name",
        message: `No active mapping found for '${operatorName}' in SizarPay`,
      });
    }

    const operatorDetails = operatorResult[0];

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

      const orderId = `CGP${Date.now()}`;
      // const operatorDetails = operatorMapping[operatorName];

      // Validate operator details
      if (!operatorDetails) {
        return res.status(400).json({
          error: "Invalid operator name",
          message: `Operator ${operatorName} is not supported.`,
        });
      }

      // Check provider balance via cgonePay client API
      getDataFromcgonePayClientApi("/Balance.aspx", {})
        .then((balanceData) => {
          if (!balanceData || balanceData?.bal < amount) {
            throw new Error("Insufficient balance in Recharge API");
          }

          // Insert recharge details into the database
          const insertQuery = `
          INSERT INTO recharges (mobile_no, amount, walletDeductAmt, operator_name, providerName, recharge_Type, created_by_userid, created_at, orderid)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
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
              if (err) {
                reject(
                  new Error(`Error inserting recharge details: ${err.message}`)
                );
              } else {
                resolve({ orderId, operatorDetails, id: result.insertId });
              }
            });
          });
        })
        .then(({ orderId, operatorDetails, id }) =>
          getDataFromcgonePayClientApi("/Recharge.aspx", {
            Amount: amount,
            OperatorCode: operatorDetails.code,
            Number: number,
            ClientId: orderId,
          }).then((rechargeData) => ({ rechargeData, orderId, id }))
        )
        .then(({ rechargeData, orderId, id }) => {
          if (!rechargeData)
            throw new Error("Recharge API response is empty or invalid");

          const updateQuery = `
          UPDATE recharges 
          SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?, message = ?, updated_at = ? 
          WHERE id = ?
        `;
          const updateValues = [
            operatorDetails.code,
            rechargeData.STATUS,
            rechargeData.TRANSACTIONID,
            rechargeData.OPERATORID,
            orderId,
            rechargeData.MESSAGE,
            updatedAt,
            id,
          ];

          return new Promise((resolve, reject) => {
            db.query(updateQuery, updateValues, (err) => {
              if (err) {
                reject(
                  new Error(`Error updating recharge record: ${err.message}`)
                );
              } else {
                resolve({ rechargeData, orderId });
              }
            });
          });
        })
        .then(({ rechargeData, orderId }) => {
          if (
            rechargeData.STATUS === "SUCCESS" ||
            rechargeData.STATUS === "IN PROCESS"
          ) {
            // const rechargeMessage = rechargeData.STATUS === "SUCCESS" ? "Recharge successful" : rechargeData.STATUS === "IN PROCESS" ? ""
            let rechargeMessage = "Recharge in process";
            if (rechargeData.STATUS === "SUCCESS") {
              rechargeMessage = "Recharge successful";
            } else if (rechargeData.STATUS === "IN PROCESS") {
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
                  if (err) {
                    reject(
                      new Error(`Error updating wallet balance: ${err.message}`)
                    );
                  } else {
                    resolve({
                      message: rechargeMessage,
                      rechargeData,
                      wallet: {
                        previousBalance: currentBalance,
                        newBalance: newWalletBalance,
                      },
                      orderId,
                    });
                  }
                }
              );
            });
          } else {
            return { message: "Recharge failed", rechargeData };
          }
        })
        .then((result) => {
          if (!responseSent) {
            responseSent = true;
            res.json(result);
          }
        })
        .catch((error) => {
          console.error("Error processing recharge:", error.message);
          if (!responseSent) {
            responseSent = true;
            res.status(500).json({ error: error.message || "Recharge failed" });
          }
        });
    });
  });
};

// const cgonepayRechargeA = (req, res) => {
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

//   const providerName = "CgonePay";
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const updatedAt = createdAt;

//   const queryBalance = `
//   SELECT Closing_Balance
//   FROM user_wallet
//   WHERE userId = ?
//   ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
//   LIMIT 1
// `;

//   // Step 1: Fetch Closing Balance
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

//     const orderId = `CGP${Date.now()}`;

//     const queryOperator = `
//   SELECT operator_code
//   FROM api_operator_map
//   WHERE operator_name = ? AND api_name = 'CgonePay' AND status = 'Active'
//   LIMIT 1
// `;

//     // Step 2: Fetch Operator Code from DB
//     db.query(queryOperator, [operatorName], (err, operatorResult) => {
//       if (err) {
//         return res
//           .status(500)
//           .json({
//             error: "Error fetching operator details",
//             message: err.message,
//           });
//       }
//       if (!operatorResult.length) {
//         return res
//           .status(400)
//           .json({ error: `Operator ${operatorName} not found.` });
//       }

//       const operatorCode = operatorResult[0].operator_code;

//       // Step 3: Check CgonePay API Balance
//       getDataFromcgonePayClientApi("/Balance.aspx", {})
//         .then((balanceData) => {
//           if (!balanceData || balanceData?.bal < amount) {
//             throw new Error("Insufficient balance in Recharge API");
//           }

//           // Step 4: Insert Recharge record
//           const insertQuery = `
//             INSERT INTO recharges (mobile_no, amount, walletDeductAmt, operator_name, providerName, recharge_Type, created_by_userid, created_at, orderid)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//           `;
//           const values = [
//             number,
//             amount,
//             walletDeductAmt,
//             operatorName,
//             providerName,
//             recharge_Type,
//             created_by_userid,
//             createdAt,
//             orderId,
//           ];

//           return new Promise((resolve, reject) => {
//             db.query(insertQuery, values, (err, result) => {
//               if (err) {
//                 reject(
//                   new Error(`Error inserting recharge details: ${err.message}`)
//                 );
//               } else {
//                 resolve({ orderId, operatorCode, id: result.insertId });
//               }
//             });
//           });
//         })
//         .then(({ orderId, operatorCode, id }) =>
//           getDataFromcgonePayClientApi("/Recharge.aspx", {
//             Amount: amount,
//             OperatorCode: operatorCode,
//             Number: number,
//             ClientId: orderId,
//           }).then((rechargeData) => ({ rechargeData, orderId, id }))
//         )
//         .then(({ rechargeData, orderId, id }) => {
//           if (!rechargeData)
//             throw new Error("Recharge API response is empty or invalid");

//           const updateQuery = `
//             UPDATE recharges
//             SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?, message = ?, updated_at = ?
//             WHERE id = ?
//           `;
//           const updateValues = [
//             operatorCode,
//             rechargeData.STATUS,
//             rechargeData.TRANSACTIONID,
//             rechargeData.OPERATORID,
//             orderId,
//             rechargeData.MESSAGE,
//             updatedAt,
//             id,
//           ];

//           return new Promise((resolve, reject) => {
//             db.query(updateQuery, updateValues, (err) => {
//               if (err) {
//                 reject(
//                   new Error(`Error updating recharge record: ${err.message}`)
//                 );
//               } else {
//                 resolve({ rechargeData, orderId });
//               }
//             });
//           });
//         })
//         .then(({ rechargeData, orderId }) => {
//           if (
//             rechargeData.STATUS === "SUCCESS" ||
//             rechargeData.STATUS === "IN PROCESS"
//           ) {
//             let rechargeMessage =
//               rechargeData.STATUS === "SUCCESS"
//                 ? "Recharge successful"
//                 : "Recharge in process";
//             const newWalletBalance = (currentBalance - walletDeductAmt).toFixed(
//               2
//             );
//             const transactionDetails = `Recharge Deduction ${number}`;
//             const transactionId = `TXNW${Date.now()}`;

//             const updateWalletQuery = `
//               INSERT INTO user_wallet
//               (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status)
//               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//             `;

//             return new Promise((resolve, reject) => {
//               db.query(
//                 updateWalletQuery,
//                 [
//                   created_by_userid,
//                   updatedAt,
//                   orderId,
//                   transactionId,
//                   currentBalance.toFixed(2),
//                   newWalletBalance,
//                   "Debit",
//                   0,
//                   walletDeductAmt,
//                   transactionDetails,
//                   "Success",
//                 ],
//                 (err) => {
//                   if (err) {
//                     reject(
//                       new Error(`Error updating wallet balance: ${err.message}`)
//                     );
//                   } else {
//                     resolve({
//                       message: rechargeMessage,
//                       rechargeData,
//                       wallet: {
//                         previousBalance: currentBalance,
//                         newBalance: newWalletBalance,
//                       },
//                       orderId,
//                     });
//                   }
//                 }
//               );
//             });
//           } else {
//             return { message: "Recharge failed", rechargeData };
//           }
//         })
//         .then((result) => {
//           if (!responseSent) {
//             responseSent = true;
//             res.json(result);
//           }
//         })
//         .catch((error) => {
//           console.error("Error processing recharge:", error.message);
//           if (!responseSent) {
//             responseSent = true;
//             res.status(500).json({ error: error.message || "Recharge failed" });
//           }
//         });
//     });
//   });
// };

const cgonePayRechargeStatusCheck = (req, res) => {
  const { transaction_id } = req.body;
  const endpoint = "/rechargestatus.aspx";
  // Generate random 6-digit number for OutletID
  // const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();

  getDataFromcgonePayClientApi(endpoint, {
    ClientId: transaction_id,
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
  cgonePayBalance,
  cgonepayRecharge,
  cgonePayRechargeStatusCheck,
};

// const cgonepayRecharge = (req, res) => {
//   const { number, amount, operatorName, recharge_Type, created_by_userid } =
//     req.body;
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const providerName = "cgonePay";

//   let responseSent = false; // Flag to track if response has been sent

//   if (!number || !amount || !operatorName) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const operatorDetails = operatorMapping[operatorName];
//   const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();

//   // Step 1: Fetch balance
//   getDataFromcgonePayClientApi("/Balance.aspx", {})
//     .then((balanceData) => {
//       // if (balanceData?.bal < amount) {
//       //   if (!responseSent) { // Check if response was already sent
//       //     responseSent = true;
//       //     return res.status(400).json({ message: "Recharge failed", error: "Insufficient balance in Recharge Api" });
//       //   }
//       // }

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
//           const formattedOrderId = `REC${String(autoGeneratedOrderId).padStart(
//             6,
//             "0"
//           )}`;
//           resolve({ orderid: formattedOrderId, id: autoGeneratedOrderId });
//         });
//       });
//     })
//     .then(({ orderid, id }) => {
//       // Step 4: Perform recharge with the generated orderid
//       return getDataFromcgonePayClientApi("/Recharge.aspx", {
//         Amount: amount,
//         OperatorCode: operatorDetails.code,
//         Number: number,
//         ClientId: orderid,
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
//         rechargeData?.STATUS,
//         rechargeData?.TRANSACTIONID,
//         rechargeData?.OPERATORID,
//         orderid,
//         rechargeData?.MESSAGE,
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
//         if (rechargeData?.STATUS == "SUCCESS") {
//           if (!responseSent) {
//             responseSent = true;
//             return res.json({
//               message: "Recharge successful",
//               rechargeData,
//               orderid: rechargeData?.CLIENTID,
//             });
//           }
//         } else if (rechargeData?.STATUS == "IN PROCESS") {
//           if (!responseSent) {
//             responseSent = true;
//             return res.json({
//               message: "Recharge IN PROCESS",
//               rechargeData,
//               orderid: rechargeData?.CLIENTID,
//             });
//           }
//         } else {
//           if (!responseSent) {
//             responseSent = true;
//             return res.json({
//               message: "Recharge failed",
//               rechargeData,
//               orderid: rechargeData?.CLIENTID,
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
