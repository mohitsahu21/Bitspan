// const {
//     getDataFromSizarPayClientApi
//    } = require("../../APIS URL/sizarPayApis");
//    const moment = require("moment-timezone");
//    const { db } = require("../../connect");

//    const sizarpayBalance = (req,res) =>{
//      const endpoint = "/Balance";
//     getDataFromSizarPayClientApi(endpoint,
//      {

//         "Format" : "1",
//         "OutletID" : "999"

//        }
//     ).then((data)=>{
//       res.json(data)
//     }).catch((error)=>{
//      res.status(500).send("Error fetching data from client API")
//     })

//    }

//    module.exports = {
//      sizarpayBalance
//    };

// const {
//   getDataFromSizarPayClientApi
//   } = require("../../APIS URL/sizarPayApis");
const moment = require("moment-timezone");
const { db } = require("../../connect");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const sizarPayBaseURL = process.env.sizarPayBaseURL;
const Token = process.env.sizarPayToken;
const UserID = process.env.sizarPayUserID;
const apiClient = axios.create({
  baseURL: sizarPayBaseURL,
});
const getDataFromSizarPayClientApi = (endpoint, params = {}) => {
  return apiClient
    .get(endpoint, {
      params: {
        UserID: UserID,
        Token: Token,
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

const sizarpayBalance = (req, res) => {
  const endpoint = "/Balance";
  // Generate random 6-digit number for OutletID
  const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();
  //   getDataFromSizarPayClientApi(endpoint,
  //     {

  //       "Format" : "1",
  //       "OutletID" : "999"

  //       }
  //   ).then((data)=>{
  //      res.json(data);
  //   }).catch((error)=>{
  //     res.status(500).send("Error fetching data from client API");
  //   });

  getDataFromSizarPayClientApi(endpoint, {
    Format: "1",
    OutletID: randomOutletID,
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

const operatorMapping = {
  Airtel: { code: "3", category: "Prepaid" },
  "BSNL STV": { code: "5", category: "Prepaid" },
  "BSNL TOPUP": { code: "4", category: "Prepaid" },
  "Airtel Postpaid": { code: "41", category: "Postpaid" },
  "BSNL Postpaid": { code: "104", category: "Postpaid" },
  Jio: { code: "116", category: "Prepaid" },
  "Jio Postpaid": { code: "103", category: "Postpaid" },
  Vi: { code: "37", category: "Prepaid" },
  "Vi Postpaid": { code: "114", category: "Postpaid" },

  "Dish TV": { code: "6802", category: "DTH" },
  "Tata Sky": { code: "6804", category: "DTH" },
  Videocon: { code: "6805", category: "DTH" },
  "Sun Direct": { code: "6803", category: "DTH" },
  "Airtel DTH": { code: "6801", category: "DTH" },

  "Airtel Broadband": { code: "268", category: "Broadband" },
  "Hathway Broadband": { code: "253", category: "Broadband" },
  "Tikona Broadband": { code: "251", category: "Broadband" },

  "Airtel Landline": { code: "201", category: "Landline" },
  "BSNL Corporate": { code: "202", category: "Landline" },
  "BSNL Individual": { code: "203", category: "Landline" },
  "Tata Teleservices": { code: "208", category: "Landline" },

  "M.P. Madhya Kshetra Vidyut Vitaran - RURAL": {
    code: "320",
    category: "Electricity",
  },
  "M.P. Madhya Kshetra Vidyut Vitaran - URBAN": {
    code: "374",
    category: "Electricity",
  },
  "M.P. Paschim Kshetra Vidyut Vitaran Company Ltd": {
    code: "342",
    category: "Electricity",
  },
  "M.P. Poorv Kshetra Vidyut Vitaran Company Ltd (RURAL)": {
    code: "341",
    category: "Electricity",
  },
  "M.P. Poorv Kshetra Vidyut Vitaran Company Ltd (URBAN)": {
    code: "378",
    category: "Electricity",
  },
  "M.P. Poorva Kshetra Vidyut Vitaran Co. Ltd Jabalpur - NGB Billing System": {
    code: "381",
    category: "Electricity",
  },

  "LIC- Life Insurance Corporation Of India": {
    code: "912",
    category: "Insurance",
  },
};

// const sizarpayRecharge = (req, res) => {
//   let responseSent = false;
//   const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();
//   const GEOCode = "21.1466,79.0888";
//   const Pincode = "482002";
//   const CustomerNumber = "9926054551";
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
//     !recharge_Type
//   ) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const providerName = "SizarPay";
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const updatedAt = createdAt;

//   const queryBalance = `
//     SELECT Closing_Balance
//     FROM user_wallet
//     WHERE userId = ?
//     ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
//     LIMIT 1
//   `;

//   db.query(queryBalance, [created_by_userid], (err, balanceResult) => {
//     if (err) {
//       return res.status(500).json({
//         error: "Error fetching wallet balance",
//         message: err.message,
//       });
//     }

//     if (
//       balanceResult.length === 0 ||
//       parseFloat(balanceResult[0].Closing_Balance) < amount
//     ) {
//       return res.status(400).json({ error: "Insufficient wallet balance" });
//     }

//     const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
//     const orderId = `SIZ${Date.now()}`;

//     const operatorDetails = operatorMapping[operatorName];

//     // Check provider balance and initiate recharge
//     getDataFromSizarPayClientApi("/Balance", {
//       Format: "1",
//       OutletID: randomOutletID,
//     })
//       .then((balanceData) => {
//         if (balanceData?.bal < amount) {
//           if (!responseSent) {
//             responseSent = true; // Ensure only one response is sent
//             return res.status(400).json({
//               message: "Recharge failed",
//               error: "Insufficient balance in Recharge Api",
//             });
//           }
//         }

//         if (!operatorMapping[operatorName]) {
//           return res.status(400).json({
//             error: "Invalid operator name",
//             message: `Operator ${operatorName} is not supported.`,
//           });
//         }

//         const insertQuery = `
//           INSERT INTO recharges (mobile_no, amount, walletDeductAmt, operator_name, providerName, recharge_Type, created_by_userid, created_at, orderid)
//           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;
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
//             if (err) {
//               reject({
//                 status: 500,
//                 error: "Database insertion error",
//                 message: err.message,
//               });
//             } else {
//               resolve({ orderId, operatorDetails, id: result.insertId });
//             }
//           });
//         });
//       })
//       .then(({ orderId, operatorDetails, id }) => {
//         return getDataFromSizarPayClientApi("/TransactionAPI", {
//           Account: number,
//           Amount: amount,
//           SPKey: operatorDetails.code,
//           ApiRequestID: orderId,
//           Format: "1",
//           GEOCode: GEOCode,
//           Pincode: Pincode,
//           CustomerNumber: CustomerNumber,
//         }).then((rechargeData) => {
//           return { rechargeData, orderId, id };
//         });
//       })
//       .then(({ rechargeData, orderId, id }) => {
//         const Status =
//           rechargeData?.status == 1
//             ? "Pending"
//             : rechargeData?.status == 2
//             ? "Success"
//             : "Failure";

//         const updateQuery = `
//           UPDATE recharges
//           SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?, message = ?, errorcode = ?, updated_at = ?
//           WHERE id = ?
//         `;

//         const updateValues = [
//           operatorDetails.code,
//           Status,
//           rechargeData.rpid,
//           rechargeData.opid,
//           orderId,
//           rechargeData.msg,
//           rechargeData.errorcode,
//           updatedAt,
//           id,
//         ];

//         return new Promise((resolve, reject) => {
//           db.query(updateQuery, updateValues, (err) => {
//             if (err) {
//               return reject({
//                 status: 500,
//                 error: "Database update error",
//                 message: err.message,
//               });
//             }
//             resolve({ rechargeData, Status });
//           });
//         });
//       })
//       .then(({ rechargeData, Status }) => {
//         if (Status === "Success" || Status === "Pending") {
//           let rechargeMessage = "Recharge in process";
//           if (Status === "Success") {
//             rechargeMessage = "Recharge successful";
//           } else if (Status === "Pending") {
//             rechargeMessage = "Recharge in process";
//           }
//           const newWalletBalance = (currentBalance - walletDeductAmt).toFixed(
//             2
//           );

//           const updateWalletQuery = `
//             INSERT INTO user_wallet
//             (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status)
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//           `;

//           const transactionDetails = `Recharge Deduction ${number}`;
//           const transactionId = `TXNW${Date.now()}`;

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
//                 if (err) {
//                   reject({
//                     status: 500,
//                     error: "Failed to update wallet balance",
//                     message: err.message,
//                   });
//                 } else {
//                   resolve({
//                     // message: "Recharge successful",
//                     message: rechargeMessage,
//                     rechargeData,
//                     wallet: {
//                       previousBalance: currentBalance.toFixed(2),
//                       newBalance: newWalletBalance,
//                     },
//                     orderId,
//                   });
//                 }
//               }
//             );
//           });
//         } else {
//           return {
//             message: "Recharge failed but no money was deducted",
//             rechargeData,
//           };
//         }
//       })
//       .then((finalResult) => {
//         if (!responseSent) {
//           responseSent = true;
//           res.json(finalResult);
//         }
//       })
//       .catch((error) => {
//         if (!responseSent) {
//           responseSent = true;
//           res.status(error.status || 500).json({
//             error: error.error || "Recharge failed",
//             message: error.message || "Unknown error",
//           });
//         }
//       });
//   });
// };

const sizarpayRecharge = (req, res) => {
  let responseSent = false;
  const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();
  const GEOCode = "21.1466,79.0888";
  const Pincode = "482002";
  const CustomerNumber = "9926054551";
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
    !recharge_Type
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const providerName = "SizarPay";
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = createdAt;

  const operatorQuery = `
  SELECT *
  FROM api_operator_map 
  WHERE api_name = 'SizarPay' AND operator_name = ? AND status = 'Active' 
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

      if (
        balanceResult.length === 0 ||
        parseFloat(balanceResult[0].Closing_Balance) < amount
      ) {
        return res.status(400).json({ error: "Insufficient wallet balance" });
      }

      const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
      const orderId = `SIZ${Date.now()}`;

      // const operatorDetails = operatorMapping[operatorName];

      // Check provider balance and initiate recharge
      getDataFromSizarPayClientApi("/Balance", {
        Format: "1",
        OutletID: randomOutletID,
      })
        .then((balanceData) => {
          if (balanceData?.bal < amount) {
            if (!responseSent) {
              responseSent = true; // Ensure only one response is sent
              return res.status(400).json({
                message: "Recharge failed",
                error: "Insufficient balance in Recharge Api",
              });
            }
          }

          // if (!operatorMapping[operatorName]) {
          //   return res.status(400).json({
          //     error: "Invalid operator name",
          //     message: `Operator ${operatorName} is not supported.`,
          //   });
          // }

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
                reject({
                  status: 500,
                  error: "Database insertion error",
                  message: err.message,
                });
              } else {
                resolve({ orderId, operatorDetails, id: result.insertId });
              }
            });
          });
        })
        .then(({ orderId, operatorDetails, id }) => {
          return getDataFromSizarPayClientApi("/TransactionAPI", {
            Account: number,
            Amount: amount,
            SPKey: operatorDetails.code,
            ApiRequestID: orderId,
            Format: "1",
            GEOCode: GEOCode,
            Pincode: Pincode,
            CustomerNumber: CustomerNumber,
          }).then((rechargeData) => {
            return { rechargeData, orderId, id };
          });
        })
        .then(({ rechargeData, orderId, id }) => {
          const Status =
            rechargeData?.status == 1
              ? "Pending"
              : rechargeData?.status == 2
              ? "Success"
              : "Failure";

          const updateQuery = `
          UPDATE recharges 
          SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?, message = ?, errorcode = ?, updated_at = ? 
          WHERE id = ?
        `;

          const updateValues = [
            operatorDetails.code,
            Status,
            rechargeData.rpid,
            rechargeData.opid,
            orderId,
            rechargeData.msg,
            rechargeData.errorcode,
            updatedAt,
            id,
          ];

          return new Promise((resolve, reject) => {
            db.query(updateQuery, updateValues, (err) => {
              if (err) {
                return reject({
                  status: 500,
                  error: "Database update error",
                  message: err.message,
                });
              }
              resolve({ rechargeData, Status });
            });
          });
        })
        .then(({ rechargeData, Status }) => {
          if (Status === "Success" || Status === "Pending") {
            let rechargeMessage = "Recharge in process";
            if (Status === "Success") {
              rechargeMessage = "Recharge successful";
            } else if (Status === "Pending") {
              rechargeMessage = "Recharge in process";
            }
            const newWalletBalance = (currentBalance - walletDeductAmt).toFixed(
              2
            );

            const updateWalletQuery = `
            INSERT INTO user_wallet
            (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

            const transactionDetails = `Recharge Deduction ${number}`;
            const transactionId = `TXNW${Date.now()}`;

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
                    reject({
                      status: 500,
                      error: "Failed to update wallet balance",
                      message: err.message,
                    });
                  } else {
                    resolve({
                      // message: "Recharge successful",
                      message: rechargeMessage,
                      rechargeData,
                      wallet: {
                        previousBalance: currentBalance.toFixed(2),
                        newBalance: newWalletBalance,
                      },
                      orderId,
                    });
                  }
                }
              );
            });
          } else {
            return {
              message: "Recharge failed but no money was deducted",
              rechargeData,
            };
          }
        })
        .then((finalResult) => {
          if (!responseSent) {
            responseSent = true;
            res.json(finalResult);
          }
        })
        .catch((error) => {
          if (!responseSent) {
            responseSent = true;
            res.status(error.status || 500).json({
              error: error.error || "Recharge failed",
              message: error.message || "Unknown error",
            });
          }
        });
    });
  });
};

// const sizarpayRechargeA = (req, res) => {
//   let responseSent = false;
//   const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();
//   const GEOCode = "21.1466,79.0888";
//   const Pincode = "482002";
//   const CustomerNumber = "9926054551";
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
//     !recharge_Type
//   ) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const providerName = "SizarPay";
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const updatedAt = createdAt;

//   // Fetch operator mapping dynamically from the database
//   const queryOperatorMapping = `
//     SELECT operator_name, code, category
//     FROM api_operator_map
//     WHERE api_name = 'SizarPay' AND status = 'Active'`;

//   db.query(queryOperatorMapping, (err, operatorMappingResult) => {
//     if (err) {
//       return res.status(500).json({
//         error: "Error fetching operator mapping",
//         message: err.message,
//       });
//     }

//     const operatorMapping = operatorMappingResult.reduce((acc, row) => {
//       acc[row.operator_name] = {
//         code: row.code,
//         category: row.category,
//       };
//       return acc;
//     }, {});

//     const operatorDetails = operatorMapping[operatorName];

//     if (!operatorDetails) {
//       return res.status(400).json({
//         error: "Invalid operator name",
//         message: `Operator ${operatorName} is not supported.`,
//       });
//     }

//     const queryBalance = `
//       SELECT Closing_Balance
//       FROM user_wallet
//       WHERE userId = ?
//       ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC
//       LIMIT 1
//     `;

//     db.query(queryBalance, [created_by_userid], (err, balanceResult) => {
//       if (err) {
//         return res.status(500).json({
//           error: "Error fetching wallet balance",
//           message: err.message,
//         });
//       }

//       if (
//         balanceResult.length === 0 ||
//         parseFloat(balanceResult[0].Closing_Balance) < amount
//       ) {
//         return res.status(400).json({ error: "Insufficient wallet balance" });
//       }

//       const currentBalance = parseFloat(balanceResult[0].Closing_Balance);
//       const orderId = `SIZ${Date.now()}`;

//       // Check provider balance and initiate recharge
//       getDataFromSizarPayClientApi("/Balance", {
//         Format: "1",
//         OutletID: randomOutletID,
//       })
//         .then((balanceData) => {
//           if (balanceData?.bal < amount) {
//             if (!responseSent) {
//               responseSent = true; // Ensure only one response is sent
//               return res.status(400).json({
//                 message: "Recharge failed",
//                 error: "Insufficient balance in Recharge Api",
//               });
//             }
//           }

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
//                 reject({
//                   status: 500,
//                   error: "Database insertion error",
//                   message: err.message,
//                 });
//               } else {
//                 resolve({ orderId, operatorDetails, id: result.insertId });
//               }
//             });
//           });
//         })
//         .then(({ orderId, operatorDetails, id }) => {
//           return getDataFromSizarPayClientApi("/TransactionAPI", {
//             Account: number,
//             Amount: amount,
//             SPKey: operatorDetails.code,
//             ApiRequestID: orderId,
//             Format: "1",
//             GEOCode: GEOCode,
//             Pincode: Pincode,
//             CustomerNumber: CustomerNumber,
//           }).then((rechargeData) => {
//             return { rechargeData, orderId, id };
//           });
//         })
//         .then(({ rechargeData, orderId, id }) => {
//           const Status =
//             rechargeData?.status == 1
//               ? "Pending"
//               : rechargeData?.status == 2
//               ? "Success"
//               : "Failure";

//           const updateQuery = `
//             UPDATE recharges
//             SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?, message = ?, errorcode = ?, updated_at = ?
//             WHERE id = ?
//           `;

//           const updateValues = [
//             operatorDetails.code,
//             Status,
//             rechargeData.rpid,
//             rechargeData.opid,
//             orderId,
//             rechargeData.msg,
//             rechargeData.errorcode,
//             updatedAt,
//             id,
//           ];

//           return new Promise((resolve, reject) => {
//             db.query(updateQuery, updateValues, (err) => {
//               if (err) {
//                 return reject({
//                   status: 500,
//                   error: "Database update error",
//                   message: err.message,
//                 });
//               }
//               resolve({ rechargeData, Status });
//             });
//           });
//         })
//         .then(({ rechargeData, Status }) => {
//           if (Status === "Success" || Status === "Pending") {
//             let rechargeMessage = "Recharge in process";
//             if (Status === "Success") {
//               rechargeMessage = "Recharge successful";
//             } else if (Status === "Pending") {
//               rechargeMessage = "Recharge in process";
//             }
//             const newWalletBalance = (currentBalance - walletDeductAmt).toFixed(
//               2
//             );

//             const updateWalletQuery = `
//               INSERT INTO user_wallet
//               (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, Transaction_Type, credit_amount, debit_amount, Transaction_details, status)
//               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//             `;

//             const transactionDetails = `Recharge Deduction ${number}`;
//             const transactionId = `TXNW${Date.now()}`;

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
//                     reject({
//                       status: 500,
//                       error: "Failed to update wallet balance",
//                       message: err.message,
//                     });
//                   } else {
//                     resolve({
//                       message: rechargeMessage,
//                       rechargeData,
//                       wallet: {
//                         previousBalance: currentBalance.toFixed(2),
//                         newBalance: newWalletBalance,
//                       },
//                       orderId,
//                     });
//                   }
//                 }
//               );
//             });
//           } else {
//             return {
//               message: "Recharge failed but no money was deducted",
//               rechargeData,
//             };
//           }
//         })
//         .then((finalResult) => {
//           if (!responseSent) {
//             responseSent = true;
//             res.json(finalResult);
//           }
//         })
//         .catch((error) => {
//           if (!responseSent) {
//             responseSent = true;
//             res.status(error.status || 500).json({
//               error: error.error || "Recharge failed",
//               message: error.message || "Unknown error",
//             });
//           }
//         });
//     });
//   });
// };

const sizarPayRechargeStatusCheck = (req, res) => {
  const { transaction_id } = req.body;
  const endpoint = "/StatusCheck";
  // Generate random 6-digit number for OutletID
  const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();

  getDataFromSizarPayClientApi(endpoint, {
    RPID: transaction_id,
    AGENTID: randomOutletID,
    Format: "1",
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
  sizarpayBalance,
  sizarpayRecharge,
  sizarPayRechargeStatusCheck,
  // sizarpayDthRecharge,
  // sizarpayBroadbandRecharge
};

// *************
// const sizarpayRecharge = (req, res) => {
//   const { number, amount, operatorName,	recharge_Type } = req.body;
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const providerName = "Sizar Pay"
//   if (!number || !amount || !operatorName) {
//     return res.status(400).json({ error: "All fields are required" });
//   }
//   const operatorDetails = operatorMapping[operatorName];

//   const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();
//   // Step 1: Fetch balance
//   getDataFromSizarPayClientApi("/Balance", {
//     Format: "1",
//     OutletID: randomOutletID,
//   }).then((balanceData) => {
//       if (balanceData?.bal < amount) {
//         return res.status(400).json({ message: "Recharge failed", error: "Insufficient balance in Recharge Api" });
//       }

//       // Step 2: Map operator name to code
//       const operatorDetails = operatorMapping[operatorName];
//       if (!operatorDetails) {
//         return res.status(400).json({ error: "Invalid operator name" });
//       }

//       // Step 3: Insert initial row to generate orderid
//       const insertQuery =
//         "INSERT INTO recharges (mobile_no, amount, operator_name, providerName,	recharge_Type , created_at) VALUES (?, ?, ?, ? , ? , ?)";
//       const values = [number, amount, operatorName,providerName,	recharge_Type, createdAt];

//       return new Promise((resolve, reject) => {
//         db.query(insertQuery, values, (err, result) => {
//           if (err) {
//             console.error("Error generating orderid:", err.message);
//             return reject(err);
//           }

//           // Step 4: Retrieve the auto-generated orderid (id from the insert)
//           const autoGeneratedOrderId = result.insertId; // Get the inserted id (orderid)
//           const formattedOrderId = String(autoGeneratedOrderId).padStart(
//             6,
//             "0"
//           );

//           resolve({ orderid: formattedOrderId, id: autoGeneratedOrderId }); // Resolve with both orderid and id
//         });
//       });
//     })
//     .then(({ orderid, id }) => {

//       // Step 5: Perform recharge with the generated orderid

//   return  getDataFromSizarPayClientApi("/TransactionAPI", {
//   Account: number,
//   Amount: amount,
//   SPKey : operatorDetails.code,
//   ApiRequestID : orderid,
//   Format: "1",
// }).then((rechargeData) => {
//   return { rechargeData, id , orderid }; // Return rechargeData and the initial inserted id
// });
// }).then(({ rechargeData, id , orderid }) => {
//       // Step 6: Update the recharge row with API response data using the initially generated id
//       const updateQuery =
//         "UPDATE recharges SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?,	message = ? , errorcode = ? , updated_at = ?  WHERE id = ?";
//       console.log(orderid)
//       const getStatus = () => {
//         if (rechargeData?.status == 1) {
//              return "Pending"
//         }
//        else if (rechargeData?.status == 2) {
//           return "Success";
//         } else {
//           return "Failure";
//         }
//       };
//       const Status = getStatus();

//       const updateValues = [
//         operatorDetails?.code,
//         Status,
//         rechargeData?.rpid,
//         rechargeData?.opid,
//         // rechargeData.dr_amount,
//         orderid,
//         rechargeData?.msg,
//         rechargeData?.errorcode,
//         updatedAt,
//         id, // Use the initial autoGeneratedOrderId for the update query
//       ];

//       db.query(updateQuery, updateValues, (err, result) => {
//         if (err) {
//           console.error("Error updating recharge data:", err.message);
//           return res
//             .status(500)
//             .json({ error: "Database update error", message: err.message });
//         }

//         // Step 7: Respond with the recharge data and orderid
//         if(Status == "Success"){
//         return  res.json({
//             message: "Recharge successful",
//           rechargeData,
//           orderid: rechargeData?.agentid,
//           })
//         }
//       return  res.json({
//           message: "Recharge failed",
//           rechargeData,
//           orderid: rechargeData?.agentid,
//         });
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         error: "Error during recharge process",
//         message: error.message,
//       });
//     });
// };

// *************

// const operatorMappingDTH = {
//   "Dish TV": { code: "53", category: "DTH" },
//   "Tata Sky": { code: "55", category: "DTH" },
//   Videocon: { code: "56", category: "DTH" },
//   "Sun Direct": { code: "54", category: "DTH" },
//   "Airtel DTH": { code: "51", category: "DTH" },
// };

// const operatorMappingDTH = {
//   "Dish TV": { code: "6802", category: "DTH" },
//   "Tata Sky": { code: "6804", category: "DTH" },
//   "Videocon": { code: "6805", category: "DTH" },
//   "Sun Direct": { code: "6803", category: "DTH" },
//   "Airtel DTH": { code: "6801", category: "DTH" },
// };

// const sizarpayDthRecharge = (req, res) => {
//   const { number, amount, operatorName, recharge_Type } = req.body;
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const providerName = "Sizar Pay";

//   let responseSent = false; // Flag to track if response has been sent

//   if (!number || !amount || !operatorName) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const operatorDetails = operatorMappingDTH[operatorName];
//   const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();

//   // Step 1: Fetch balance
//   getDataFromSizarPayClientApi("/Balance", {
//     Format: "1",
//     OutletID: randomOutletID,
//   })
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
//         "INSERT INTO recharges (mobile_no, amount, operator_name, providerName, recharge_Type, created_at) VALUES (?, ?, ?, ?, ?, ?)";
//       const values = [number, amount, operatorName, providerName, recharge_Type, createdAt];

//       return new Promise((resolve, reject) => {
//         db.query(insertQuery, values, (err, result) => {
//           if (err) {
//             console.error("Error generating orderid:", err.message);
//             return reject(err);
//           }

//           const autoGeneratedOrderId = result.insertId;
//           const formattedOrderId = String(autoGeneratedOrderId).padStart(6, "0");
//           resolve({ orderid: formattedOrderId, id: autoGeneratedOrderId });
//         });
//       });
//     })
//     .then(({ orderid, id }) => {
//       // Step 4: Perform recharge with the generated orderid
//       return getDataFromSizarPayClientApi("/TransactionAPI", {
//         Account: number,
//         Amount: amount,
//         SPKey: operatorDetails.code,
//         ApiRequestID: orderid,
//         Format: "1",
//       }).then((rechargeData) => {
//         return { rechargeData, id, orderid };
//       });
//     })
//     .then(({ rechargeData, id, orderid }) => {
//       // Step 5: Update the recharge row with API response data
//       const updateQuery =
//         "UPDATE recharges SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?, message = ?, errorcode = ?, updated_at = ? WHERE id = ?";
//       const getStatus = () => {
//         if (rechargeData?.status == 1) {
//           return "Pending";
//         } else if (rechargeData?.status == 2) {
//           return "Success";
//         } else {
//           return "Failure";
//         }
//       };
//       const Status = getStatus();

//       const updateValues = [
//         operatorDetails?.code,
//         Status,
//         rechargeData?.rpid,
//         rechargeData?.opid,
//         orderid,
//         rechargeData?.msg,
//         rechargeData?.errorcode,
//         updatedAt,
//         id,
//       ];

//       db.query(updateQuery, updateValues, (err, result) => {
//         if (err) {
//           console.error("Error updating recharge data:", err.message);
//           if (!responseSent) {
//             responseSent = true;
//             return res.status(500).json({ error: "Database update error", message: err.message });
//           }
//         }

//         // Step 6: Respond with the recharge data and orderid
//         if (Status == "Success") {
//           if (!responseSent) {
//             responseSent = true;
//             return res.json({
//               message: "Recharge successful",
//               rechargeData,
//               orderid: rechargeData?.agentid,
//             });
//           }
//         } else {
//           if (!responseSent) {
//             responseSent = true;
//             return res.json({
//               message: "Recharge failed",
//               rechargeData,
//               orderid: rechargeData?.agentid,
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

// const operatorMappingBroadband = {
//   "Airtel Broadband": { code: "268", category: "Broadband" },
//   "Hathway Broadband": { code: "253", category: "Broadband" },
//   "Tikona Broadband" : { code: "251", category: "Broadband" }
// };

// const sizarpayBroadbandRecharge = (req, res) => {
//   const { number, amount, operatorName, recharge_Type } = req.body;
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const providerName = "Sizar Pay";

//   let responseSent = false; // Flag to track if response has been sent

//   if (!number || !amount || !operatorName) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const operatorDetails = operatorMappingBroadband[operatorName];
//   const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();

//   // Step 1: Fetch balance
//   getDataFromSizarPayClientApi("/Balance", {
//     Format: "1",
//     OutletID: randomOutletID,
//   })
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
//         "INSERT INTO recharges (mobile_no, amount, operator_name, providerName, recharge_Type, created_at) VALUES (?, ?, ?, ?, ?, ?)";
//       const values = [number, amount, operatorName, providerName, recharge_Type, createdAt];

//       return new Promise((resolve, reject) => {
//         db.query(insertQuery, values, (err, result) => {
//           if (err) {
//             console.error("Error generating orderid:", err.message);
//             return reject(err);
//           }

//           const autoGeneratedOrderId = result.insertId;
//           const formattedOrderId = String(autoGeneratedOrderId).padStart(6, "0");
//           resolve({ orderid: formattedOrderId, id: autoGeneratedOrderId });
//         });
//       });
//     })
//     .then(({ orderid, id }) => {
//       // Step 4: Perform recharge with the generated orderid
//       return getDataFromSizarPayClientApi("/TransactionAPI", {
//         Account: number,
//         Amount: amount,
//         SPKey: operatorDetails.code,
//         ApiRequestID: orderid,
//         Format: "1",
//       }).then((rechargeData) => {
//         return { rechargeData, id, orderid };
//       });
//     })
//     .then(({ rechargeData, id, orderid }) => {
//       // Step 5: Update the recharge row with API response data
//       const updateQuery =
//         "UPDATE recharges SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?, message = ?, errorcode = ?, updated_at = ? WHERE id = ?";
//       const getStatus = () => {
//         if (rechargeData?.status == 1) {
//           return "Pending";
//         } else if (rechargeData?.status == 2) {
//           return "Success";
//         } else {
//           return "Failure";
//         }
//       };
//       const Status = getStatus();

//       const updateValues = [
//         operatorDetails?.code,
//         Status,
//         rechargeData?.rpid,
//         rechargeData?.opid,
//         orderid,
//         rechargeData?.msg,
//         rechargeData?.errorcode,
//         updatedAt,
//         id,
//       ];

//       db.query(updateQuery, updateValues, (err, result) => {
//         if (err) {
//           console.error("Error updating recharge data:", err.message);
//           if (!responseSent) {
//             responseSent = true;
//             return res.status(500).json({ error: "Database update error", message: err.message });
//           }
//         }

//         // Step 6: Respond with the recharge data and orderid
//         if (Status == "Success") {
//           if (!responseSent) {
//             responseSent = true;
//             return res.json({
//               message: "Recharge successful",
//               rechargeData,
//               orderid: rechargeData?.agentid,
//             });
//           }
//         } else {
//           if (!responseSent) {
//             responseSent = true;
//             return res.json({
//               message: "Recharge failed",
//               rechargeData,
//               orderid: rechargeData?.agentid,
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
