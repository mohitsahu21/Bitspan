const { getDataFromEzytmClientApi, makeRechargeRequest ,  makeBillPaymentRequest} = require("../../APIs-URL/ezytmApis");
const moment = require("moment-timezone");
const { db } = require("../../connect");

const getBalanceEzytm = (req, res) => {
  const endpoint = "/Balance";

  getDataFromEzytmClientApi(endpoint)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

const getRechargeStatus = (req,res)=>{
  const {RefTxnId} = req.body
      const endpoint = "/statuscheck"

      makeRechargeRequest(endpoint,{
        
        RefTxnId,

      }).then((data)=>{
           res.json({ message : "Recharge status checked successfully",
            data
            
           })
      }).catch((error) => {
        res.status(500).send("Error fetching data from client API");
      });
}

const operatorMapping = {
  Airtel: { code: "1", category: "Prepaid" },
  "BSNL STV": { code: "4", category: "Prepaid" },
  "BSNL TOPUP": { code: "3", category: "Prepaid" },
  "Airtel Postpaid": { code: "14", category: "Postpaid" },
  "BSNL Postpaid": { code: "13", category: "Postpaid" },
  Jio: { code: "5", category: "Prepaid" },
  "Jio Postpaid": { code: "17", category: "Postpaid" },
  Vi: { code: "6", category: "Prepaid" },
  "Vi Postpaid": { code: "16", category: "Postpaid" },
};



// const rechargeMobile = (req, res) => {
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

//   const providerName = "ezytm";
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//   // Fetch wallet balance
//   const queryBalance = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC LIMIT 1`;
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
//     const orderId = `REZ${Date.now()}`;

//     // Fetch provider balance and make the recharge request
//     getDataFromEzytmClientApi("/Balance")
//       .then((balanceData) => {
//         if (parseFloat(balanceData.balance) < amount) {
//           return Promise.reject({
//             status: 400,
//             error: "Insufficient provider balance",
//           });
//         }

//         const operatorDetails = operatorMapping[operatorName];
//         if (!operatorDetails) {
//           return Promise.reject({
//             status: 400,
//             error: "Invalid operator name",
//             message: `Operator ${operatorName} not found.`,
//           });
//         }

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
//             if (err) {
//               console.log("Insert Error: ", err);
//               reject({
//                 status: 500,
//                 error: "Database insertion error",
//                 message: err.message,
//               });
//             } else {
//               console.log("Insert Success: ", result);
//               resolve({ orderId, operatorDetails });
//             }
//           });
//         });
//       })
//       // .then(({ orderId, operatorDetails }) => {
//       //   return makeRechargeRequest("/Recharge2", {
//       //     opcode: operatorDetails.code,
//       //     number,
//       //     amount,
//       //     orderid: orderId,
//       //     format: "json",
//       //   }).then((rechargeData) => {
//       //     return { rechargeData, orderId, operatorDetails };
//       //   });
//       // })
//       .then(({ orderId, operatorDetails }) => {
//         return makeRechargeRequest("/Recharge2", {
//           MobileNo: number,
//           Amount: amount,
//           OpId: operatorDetails.code,
//           RefTxnId: orderId,
//         }).then((rechargeData) => {
//           return { rechargeData, orderId, operatorDetails }; // Return rechargeData and the initial inserted orderId
//         });
//       })
//       .then(({ rechargeData, orderId }) => {
//         const updateQuery = `
//     UPDATE recharges 
//     SET 
//       opcode = ?, 
//       status = ?, 
//       transaction_id = ?, 
//       opid = ?, 
//       dr_amount = ?, 
//       errorcode = ?, 
//       message = ?, 
//       orderid = ?, 
//       updated_at = ? 
//     WHERE orderid = ?
//   `;

//         // const status =
//         //   rechargeData.STATUS == 1
//         //     ? "Success"
//         //     : rechargeData.STATUS == 0
//         //     ? "Failure"
//         //     : "Pending";
        
//         //  const status =
//         //   rechargeData.STATUS == 1
//         //     ? "Success"
//         //     : "Failure";
        
//         const getStatus = () => {
//           switch (rechargeData?.STATUS) {
//             case 1:
//               return "Success";
//             case 2:
//               return "Processing";
//             case 3:
//               return "Failed";
//             default:
//               return "Unknown Status";
//           }
//         };
        
//         const status = getStatus();

//         const updateValues = [
//           rechargeData.opcode || "",
//           // rechargeData.STATUS || "",
//           status || "",
//           rechargeData.TXNNO || "",
//           rechargeData.OPTXNID || "",
//           rechargeData.dr_amount || "",
//           rechargeData.ERRORCODE || "",
//           rechargeData.MESSAGE || "",
//           orderId,
//           updatedAt,
//           orderId,
//         ];

//         return new Promise((resolve, reject) => {
//           db.query(updateQuery, updateValues, (err) => {
//             if (err) {
//               console.log("Update Error: ", err);
//               reject({
//                 status: 500,
//                 error: "Failed to update recharge data",
//                 message: err.message,
//               });
//             } else {
//               console.log("Update Success: ", orderId);
//               resolve({
//                 rechargeData,
//                 orderId,
//                 newBalance: currentBalance.toFixed(2),
//               });
//             }
//           });
//         });
//       })
//       .then(({ rechargeData, orderId, newBalance }) => {
//         console.log("Recharge Data: ", rechargeData);
//         // if (rechargeData.STATUS === 1) {
//         if (rechargeData.STATUS == 1 || rechargeData.STATUS == 2) {
//           let rechargeMessage = "Recharge in process";
//           if(rechargeData.STATUS == 1){
//             rechargeMessage = "Recharge successful"
//           } else if(rechargeData.STATUS == 2){
//             rechargeMessage = "Recharge in process";
//           }
//           const transactionId = `TXNW${Date.now()}`;
//           const transactionDetails = `Recharge Deduction ${number}`;
//           const newWalletBalance = (newBalance - walletDeductAmt).toFixed(2);

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
//               (err, walletResult) => {
//                 if (err) {
//                   console.log("Wallet Update Error: ", err);
//                   reject({
//                     status: 500,
//                     error: "Failed to update wallet balance",
//                     message: err.message,
//                   });
//                 } else {
//                   console.log("Wallet Update Success: ", walletResult);
//                   resolve({
//                     message: rechargeMessage,
//                     rechargeData,
//                     wallet: {
//                       previousBalance: currentBalance.toFixed(2),
//                       newBalance: newWalletBalance,
//                     },
//                     orderId: orderId,
//                   });
//                 }
//               }
//             );
//           });
//         } else {
//           return Promise.resolve({
//             message: "Recharge failed but no money was deducted",
//             rechargeData,
//             wallet: {
//               previousBalance: currentBalance.toFixed(2),
//               newBalance: currentBalance.toFixed(2),
//             },
//             orderId: orderId,
//           });
//         }
//       })
//       .then((finalResult) => {
//         res.json(finalResult);
//       })
//       .catch((error) => {
//         console.error("Caught an error in the promise chain:", error);
//         res.status(error.status || 500).json({
//           error: error.error || "Recharge failed",
//           message: error.message || "Unknown error",
//           details: error.details || "No additional information available.",
//         });
//       });
//   });
// };

const rechargeMobile = (req, res) => {
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

  const providerName = "ezytm";
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const queryBalance = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC LIMIT 1`;
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
    const orderId = `REZ${Date.now()}`;

    getDataFromEzytmClientApi("/Balance")
      .then((balanceData) => {
        if (parseFloat(balanceData.balance) < amount) {
          return Promise.reject({
            status: 400,
            error: "Insufficient provider balance",
          });
        }

        // ✅ Fetch operator details dynamically from database
        const operatorQuery = `SELECT * FROM api_operator_map WHERE operator_name = ? AND api_name = 'Ezytm' AND status = 'Active'`;
        return new Promise((resolve, reject) => {
          db.query(operatorQuery, [operatorName], (err, operatorResult) => {
            if (err) {
              reject({
                status: 500,
                error: "Error fetching operator details",
                message: err.message,
              });
            } else if (operatorResult.length === 0) {
              reject({
                status: 400,
                error: "Operator not found or inactive",
                message: `Operator ${operatorName} is either not present or inactive in Database.`,
              });
            } else {
              resolve(operatorResult[0]);
            }
          });
        });
      })
      .then((operatorDetails) => {
        // ✅ Insert recharge request into table
        const insertQuery = `
          INSERT INTO recharges (mobile_no, amount, walletDeductAmt, operator_name, providerName, recharge_Type, created_by_userid, created_at, orderid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
              console.log("Insert Error: ", err);
              reject({
                status: 500,
                error: "Database insertion error",
                message: err.message,
              });
            } else {
              console.log("Insert Success: ", result);
              resolve({ orderId, operatorDetails });
            }
          });
        });
      })
      .then(({ orderId, operatorDetails }) => {
        // ✅ Recharge API call
        return makeRechargeRequest("/Recharge2", {
          MobileNo: number,
          Amount: amount,
          OpId: operatorDetails.code,
          RefTxnId: orderId,
        }).then((rechargeData) => {
          return { rechargeData, orderId, operatorDetails };
        });
      })
      .then(({ rechargeData, orderId }) => {
        // ✅ Update recharge status
        const updateQuery = `
    UPDATE recharges 
    SET 
      opcode = ?, 
      status = ?, 
      transaction_id = ?, 
      opid = ?, 
      dr_amount = ?, 
      errorcode = ?, 
      message = ?, 
      orderid = ?, 
      updated_at = ? 
    WHERE orderid = ?
  `;
        const getStatus = () => {
          switch (rechargeData?.STATUS) {
            case 1:
              return "Success";
            case 2:
              return "Processing";
            case 3:
              return "Failed";
            default:
              return "Unknown Status";
          }
        };

        const status = getStatus();

        const updateValues = [
          rechargeData.opcode || "",
          // rechargeData.STATUS || "",
          status || "",
          rechargeData.TXNNO || "",
          rechargeData.OPTXNID || "",
          rechargeData.dr_amount || "",
          rechargeData.ERRORCODE || "",
          rechargeData.MESSAGE || "",
          orderId,
          updatedAt,
          orderId,
        ];

        return new Promise((resolve, reject) => {
          db.query(updateQuery, updateValues, (err) => {
            if (err) {
              console.log("Update Error: ", err);
              reject({
                status: 500,
                error: "Failed to update recharge data",
                message: err.message,
              });
            } else {
              console.log("Update Success: ", orderId);
              resolve({
                rechargeData,
                orderId,
                newBalance: currentBalance.toFixed(2),
              });
            }
          });
        });
      })
      .then(({ rechargeData, orderId, newBalance }) => {
        console.log("Recharge Data: ", rechargeData);
        // if (rechargeData.STATUS === 1) {
        if (rechargeData.STATUS == 1 || rechargeData.STATUS == 2) {
          let rechargeMessage = "Recharge in process";
          if (rechargeData.STATUS == 1) {
            rechargeMessage = "Recharge successful";
          } else if (rechargeData.STATUS == 2) {
            rechargeMessage = "Recharge in process";
          }
          const transactionId = `TXNW${Date.now()}`;
          const transactionDetails = `Recharge Deduction ${number}`;
          const newWalletBalance = (newBalance - walletDeductAmt).toFixed(2);

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
              (err, walletResult) => {
                if (err) {
                  console.log("Wallet Update Error: ", err);
                  reject({
                    status: 500,
                    error: "Failed to update wallet balance",
                    message: err.message,
                  });
                } else {
                  console.log("Wallet Update Success: ", walletResult);
                  resolve({
                    message: rechargeMessage,
                    rechargeData,
                    wallet: {
                      previousBalance: currentBalance.toFixed(2),
                      newBalance: newWalletBalance,
                    },
                    orderId: orderId,
                  });
                }
              }
            );
          });
        } else {
          return Promise.resolve({
            message: "Recharge failed but no money was deducted",
            rechargeData,
            wallet: {
              previousBalance: currentBalance.toFixed(2),
              newBalance: currentBalance.toFixed(2),
            },
            orderId: orderId,
          });
        }
      })
      .then((finalResult) => {
        res.json(finalResult);
      })
      .catch((error) => {
        console.error("Caught an error in the promise chain:", error);
        res.status(error.status || 500).json({
          error: error.error || "Recharge failed",
          message: error.message || "Unknown error",
          details: error.details || "No additional information available.",
        });
      });
  });
};

const rechargeCallback = (req, res) => {
//   const { STATUS, OPTXNID, YOURREQID } = req.query;
     const { txid, status, opid } = req.query;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  // SQL query to insert data into the recharge table
  const query = `
    INSERT INTO ezytmrechargecallback (transaction_id, status, operator_txn_id, created_at)
    VALUES (?, ?, ?, ?)
  `;

  // Execute the SQL query
  db.query(query, [txid, status, opid, createdAt], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Internal Server Error");
    }

    // console.log("Data inserted successfully:", result);
    console.log("Data inserted successfully:");
    res.status(200).send("Callback processed successfully");
  });
};

const operatorMappingBillPayment = {
"Dish TV": { code: "9", category: "DTH" },
  "Tata Sky": { code: "12", category: "DTH" },
  "Videocon": { code: "20", category: "DTH" },
  "Sun Direct": { code: "11", category: "DTH" },
  "Airtel DTH": { code: "7", category: "DTH" },
  
  
   "Airtel Broadband": { code: "256", category: "Broadband" },
  "Hathway Broadband": { code: "293", category: "Broadband" },
  "Tikona Broadband" : { code: "338", category: "Broadband" },



  "Airtel Landline" : { code: "775", category: "Landline" },
  "BSNL Corporate" : { code: "777", category: "Landline" },
  "BSNL Individual" : { code: "776", category: "Landline" },
  "Tata Teleservices" : { code: "780", category: "Landline" },
  
  
  
  "M.P. Madhya Kshetra Vidyut Vitaran - RURAL" : { code: "63", category: "Electricity" },
  "M.P. Madhya Kshetra Vidyut Vitaran - URBAN" : { code: "64", category: "Electricity" },
  "M.P. Paschim Kshetra Vidyut Vitaran" : { code: "36", category: "Electricity" },
  "M.P. Poorv Kshetra Vidyut Vitaran - RURAL" : { code: "65", category: "Electricity" },
  "M.P. Poorv Kshetra Vidyut Vitaran - URBAN" : { code: "90", category: "Electricity" },
  "M.P. Poorva Kshetra Vidyut Vitaran Co. Ltd Jabalpur - NGB Billing System" : { code: "65", category: "Electricity" },
  
  
  "LIC- Life Insurance Corporation Of India" : {code : "107" , category: "Insurance" }
  
};

const billPayment = (req, res) => {
  const { number, amount, operatorName,	recharge_Type } = req.body;
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const providerName = "ezytm"
  if (!number || !amount || !operatorName) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const operatorDetails = operatorMappingBillPayment[operatorName];


  // Step 1: Fetch balance
  getDataFromEzytmClientApi("/Balance")
    .then((balanceData) => {
      if (balanceData.BALANCE < amount) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // Step 2: Map operator name to code
      // const operatorDetails = operatorMapping[operatorName];
      if (!operatorDetails) {
        return res.status(400).json({ error: "Invalid operator name" });
      }

      // Step 3: Insert initial row to generate orderid
      const insertQuery =
        "INSERT INTO recharges (mobile_no, amount, operator_name, providerName,	recharge_Type , created_at) VALUES (?, ?, ?, ? , ? , ?)";
      const values = [number, amount, operatorName,providerName,	recharge_Type, createdAt];

      return new Promise((resolve, reject) => {
        db.query(insertQuery, values, (err, result) => {
          if (err) {
            console.error("Error generating orderid:", err.message);
            return reject(err);
          }

          // Step 4: Retrieve the auto-generated orderid (id from the insert)
          const autoGeneratedOrderId = result.insertId; // Get the inserted id (orderid)
          const formattedOrderId = String(autoGeneratedOrderId).padStart(
            6,
            "0"
          );

          resolve({ orderid: formattedOrderId, id: autoGeneratedOrderId }); // Resolve with both orderid and id
        });
      });
    })
    .then(({ orderid, id }) => {
      // Step 5: Perform recharge with the generated orderid
      return makeBillPaymentRequest("/BillPay",{
        op : operatorDetails.code,
        num : number,
        acno : "",
        acoth : "",
        amt: amount,
        rq : orderid,

      }
       
      ).then((rechargeData) => {
        return { rechargeData, id , orderid }; // Return rechargeData and the initial inserted id
      });
    })
    .then(({ rechargeData, id , orderid }) => {
      // Step 6: Update the recharge row with API response data using the initially generated id
      const updateQuery =
        "UPDATE recharges SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?,	message = ? , errorcode = ? , updated_at = ?  WHERE id = ?";

      const getStatus = () => {
        if (rechargeData?.STATUS == 1) {
          return "Success";
        } else {
          return "Failure";
        }
      };
      const Status = getStatus();

      const updateValues = [
        operatorDetails.code,
        Status,
        rechargeData.TXNNO,
        rechargeData.OPTXNID,
        // rechargeData.dr_amount,
        orderid,
        rechargeData.MESSAGE,
        rechargeData.ERRORCODE,
        updatedAt,
        id, // Use the initial autoGeneratedOrderId for the update query
      ];

      db.query(updateQuery, updateValues, (err, result) => {
        if (err) {
          console.error("Error updating recharge data:", err.message);
          return res
            .status(500)
            .json({ error: "Database update error", message: err.message });
        }

        // Step 7: Respond with the recharge data and orderid
        if(Status == "Success"){
          res.json({
            message: "Recharge successful",
          rechargeData,
          orderid: rechargeData.orderid,
          })
        }
        res.json({
          message: "Recharge failed",
          rechargeData,
          orderid: rechargeData.orderid,
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: "Error during recharge process",
        message: error.message,
      });
    });
};

const billFetch = (req, res) => {
  const { number, amount, operatorName,	recharge_Type } = req.body;
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const providerName = "ezytm"
  if (!number || !amount || !operatorName) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const operatorDetails = operatorMappingBillPayment[operatorName];


  // Step 1: Fetch balance
  getDataFromEzytmClientApi("/Balance")
    .then((balanceData) => {
      // if (balanceData.BALANCE < amount) {
      //   return res.status(400).json({ error: "Insufficient balance" });
      // }

      // Step 2: Map operator name to code
      // const operatorDetails = operatorMapping[operatorName];
      if (!operatorDetails) {
        return res.status(400).json({ error: "Invalid operator name" });
      }

      // Step 3: Insert initial row to generate orderid
      const insertQuery =
        "INSERT INTO recharges (mobile_no, amount, operator_name, providerName,	recharge_Type , created_at) VALUES (?, ?, ?, ? , ? , ?)";
      const values = [number, amount, operatorName,providerName,	recharge_Type, createdAt];

      return new Promise((resolve, reject) => {
        db.query(insertQuery, values, (err, result) => {
          if (err) {
            console.error("Error generating orderid:", err.message);
            return reject(err);
          }

          // Step 4: Retrieve the auto-generated orderid (id from the insert)
          const autoGeneratedOrderId = result.insertId; // Get the inserted id (orderid)
          const formattedOrderId = String(autoGeneratedOrderId).padStart(
            6,
            "0"
          );

          resolve({ orderid: formattedOrderId, id: autoGeneratedOrderId }); // Resolve with both orderid and id
        });
      });
    })
    .then(({ orderid, id }) => {
      // Step 5: Perform recharge with the generated orderid
      return makeBillPaymentRequest("/BillFetch",{
        op : operatorDetails.code,
        num : number,
        acno : "",
        acoth : "",
        amt: amount,
        rq : orderid,

      }
       
      ).then((rechargeData) => {
        return { rechargeData, id , orderid }; // Return rechargeData and the initial inserted id
      });
    })
    .then(({ rechargeData, id , orderid }) => {
      // Step 6: Update the recharge row with API response data using the initially generated id
      const updateQuery =
        "UPDATE recharges SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?,	message = ? , errorcode = ? , updated_at = ?  WHERE id = ?";

      const getStatus = () => {
        if (rechargeData?.STATUS == 1) {
          return "Success";
        } else {
          return "Failure";
        }
      };
      const Status = getStatus();

      const updateValues = [
        operatorDetails.code,
        Status,
        rechargeData.TXNNO,
        rechargeData.OPTXNID,
        // rechargeData.dr_amount,
        orderid,
        rechargeData.MESSAGE,
        rechargeData.ERRORCODE,
        updatedAt,
        id, // Use the initial autoGeneratedOrderId for the update query
      ];

      db.query(updateQuery, updateValues, (err, result) => {
        if (err) {
          console.error("Error updating recharge data:", err.message);
          return res
            .status(500)
            .json({ error: "Database update error", message: err.message });
        }

        // Step 7: Respond with the recharge data and orderid
        if(Status == "Success"){
          res.json({
            message: "Recharge successful",
          rechargeData,
          orderid: rechargeData.orderid,
          })
        }
        res.json({
          message: "Recharge failed",
          rechargeData,
          orderid: rechargeData.orderid,
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: "Error during recharge process",
        message: error.message,
      });
    });
};


module.exports = {
  getBalanceEzytm,
   rechargeMobile,
  rechargeCallback,
  getRechargeStatus,
  billPayment,
  billFetch
};

// const rechargeMobile = (req, res) => {
//   const { number, amount, operatorName , recharge_Type, created_by_userid } = req.body;
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const providerName = "ezytm";

//   if (!number || !amount || !operatorName) {
//     return res.status(400).json({ error: "All fields are required" });
//   }
//   const operatorDetails = operatorMapping[operatorName];

//   // Step 1: Fetch balance
//   getDataFromEzytmClientApi("/Balance")
//     .then((balanceData) => {
//       if (balanceData.BALANCE < amount) {
//         return res.status(400).json({ error: "Insufficient balance" });
//       }

//       // Step 2: Map operator name to code
//       // const operatorDetails = operatorMapping[operatorName];
//       if (!operatorDetails) {
//         return res.status(400).json({ error: "Invalid operator name" });
//       }

//       // Step 3: Insert initial row to generate orderid
//       const insertQuery =
//         "INSERT INTO recharges (mobile_no, amount, operator_name, providerName,	recharge_Type, created_by_userid, created_at) VALUES (?, ?, ?, ? , ? , ?, ?)";
//       const values = [number, amount, operatorName, providerName ,	recharge_Type, created_by_userid, createdAt];

//       return new Promise((resolve, reject) => {
//         db.query(insertQuery, values, (err, result) => {
//           if (err) {
//             console.error("Error generating orderid:", err.message);
//             return reject(err);
//           }

//           // Step 4: Retrieve the auto-generated orderid (id from the insert)
//           const autoGeneratedOrderId = result.insertId; // Get the inserted id (orderid)
//           const formattedOrderId = `REE${String(autoGeneratedOrderId).padStart(
//             6,
//             "0"
//           )}`;

//           resolve({ orderid: formattedOrderId, id: autoGeneratedOrderId }); // Resolve with both orderid and id
//         });
//       });
//     })
//     .then(({ orderid, id }) => {
//       // Step 5: Perform recharge with the generated orderid
//       return makeRechargeRequest("/Recharge2",{
//         MobileNo : number,
//         Amount : amount,
//         OpId: operatorDetails.code,
//         RefTxnId : orderid,

//       }
       
//       ).then((rechargeData) => {
//         return { rechargeData, id , orderid }; // Return rechargeData and the initial inserted id
//       });
//     })
//     .then(({ rechargeData, id , orderid }) => {
//       // Step 6: Update the recharge row with API response data using the initially generated id
//       const updateQuery =
//         "UPDATE recharges SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?,	message = ? , errorcode = ? , updated_at = ?  WHERE id = ?";

//       const getStatus = () => {
//         if (rechargeData?.STATUS == 1) {
//           return "Success";
//         } else {
//           return "Failure";
//         }
//       };
//       const Status = getStatus();

//       const updateValues = [
//         operatorDetails.code,
//         Status,
//         rechargeData.TXNNO,
//         rechargeData.OPTXNID,
//         // rechargeData.dr_amount,
//         orderid,
//         rechargeData.MESSAGE,
//         rechargeData.ERRORCODE,
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
//           res.json({
//             message: "Recharge successful",
//           rechargeData,
//           orderid: rechargeData.orderid,
//           })
//         }
//         res.json({
//           message: "Recharge failed",
//           rechargeData,
//           orderid: rechargeData.orderid,
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

// const rechargeMobile = (req, res) => {
//   const { number, amount, operatorName, recharge_Type, created_by_userid } =
//     req.body;

//   if (!number || !amount || !operatorName || !recharge_Type) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   const providerName = "ezytm";
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
//   const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//   // Fetch wallet balance
//   const queryBalance = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY STR_TO_DATE(transaction_date, '%Y-%m-%d %H:%i:%s') DESC LIMIT 1`;
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
//     const orderId = `REZ${Date.now()}`;

//     // Fetch provider balance and make the recharge request
//     getDataFromEzytmClientApi("/Balance")
//       .then((balanceData) => {
//         if (parseFloat(balanceData.balance) < amount) {
//           return Promise.reject({
//             status: 400,
//             error: "Insufficient provider balance",
//           });
//         }

//         const operatorDetails = operatorMapping[operatorName];
//         if (!operatorDetails) {
//           return Promise.reject({
//             status: 400,
//             error: "Invalid operator name",
//             message: `Operator ${operatorName} not found.`,
//           });
//         }

//         const insertQuery =
//           "INSERT INTO recharges (mobile_no, amount, operator_name, providerName, recharge_Type, created_by_userid, created_at, orderid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
//         const values = [
//           number,
//           amount,
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
//               console.log("Insert Error: ", err);
//               reject({
//                 status: 500,
//                 error: "Database insertion error",
//                 message: err.message,
//               });
//             } else {
//               console.log("Insert Success: ", result);
//               resolve({ orderId, operatorDetails });
//             }
//           });
//         });
//       })
//       .then(({ orderId, operatorDetails }) => {
//         return makeRechargeRequest("/Recharge2", {
//           MobileNo: number,
//           Amount: amount,
//           OpId: operatorDetails.code,
//           RefTxnId: orderId,
//         }).then((rechargeData) => {
//           return { rechargeData, orderId, operatorDetails }; // Return rechargeData and the initial inserted orderId
//         });
//       })
//       .then(({ rechargeData, orderId }) => {
//         const updateQuery = `
//     UPDATE recharges 
//     SET 
//       opcode = ?, 
//       status = ?, 
//       transaction_id = ?, 
//       opid = ?, 
//       dr_amount = ?, 
//       errorcode = ?, 
//       message = ?, 
//       orderid = ?, 
//       updated_at = ? 
//     WHERE orderid = ?
//   `;
  
//           const status =
//           rechargeData.STATUS === 1
//             ? "Success"
//             : rechargeData.STATUS === 0
//             ? "Failure"
//             : "Pending";
  
//         const updateValues = [
//           rechargeData.opcode || "",
//         //   rechargeData.STATUS,
//           status || "",
//           rechargeData.TXNNO || "",
//           rechargeData.OPTXNID || "",
//           rechargeData.dr_amount || "",
//           rechargeData.ERRORCODE || "",
//           rechargeData.MESSAGE || "",
//           orderId,
//           updatedAt,
//           orderId,
//         ];

//         return new Promise((resolve, reject) => {
//           db.query(updateQuery, updateValues, (err) => {
//             if (err) {
//               console.log("Update Error: ", err);
//               reject({
//                 status: 500,
//                 error: "Failed to update recharge data",
//                 message: err.message,
//               });
//             } else {
//               console.log("Update Success: ", orderId);
//               resolve({
//                 rechargeData,
//                 orderId,
//                 newBalance: currentBalance.toFixed(2),
//               });
//             }
//           });
//         });
//       })
//       .then(({ rechargeData, orderId, newBalance }) => {
//         console.log("Recharge Data: ", rechargeData);
//         if (rechargeData.STATUS === 1) {
//           const transactionId = `TXNW${Date.now()}`;
//           const transactionDetails = `Recharge Deduction ${number}`;
//           const newWalletBalance = (newBalance - amount).toFixed(2);

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
//                 amount,
//                 transactionDetails,
//                 "Success",
//               ],
//               (err, walletResult) => {
//                 if (err) {
//                   console.log("Wallet Update Error: ", err);
//                   reject({
//                     status: 500,
//                     error: "Failed to update wallet balance",
//                     message: err.message,
//                   });
//                 } else {
//                   console.log("Wallet Update Success: ", walletResult);
//                   resolve({
//                     message: "Recharge successful",
//                     rechargeData,
//                     wallet: {
//                       previousBalance: currentBalance.toFixed(2),
//                       newBalance: newWalletBalance,
//                     },
//                     orderId: orderId,
//                   });
//                 }
//               }
//             );
//           });
//         } else {
//           return Promise.resolve({
//             message: "Recharge failed but no money was deducted",
//             rechargeData,
//             wallet: {
//               previousBalance: currentBalance.toFixed(2),
//               newBalance: currentBalance.toFixed(2),
//             },
//             orderId: orderId,
//           });
//         }
//       })
//       .then((finalResult) => {
//         res.json(finalResult);
//       })
//       .catch((error) => {
//         console.error("Caught an error in the promise chain:", error);
//         res.status(error.status || 500).json({
//           error: error.error || "Recharge failed",
//           message: error.message || "Unknown error",
//           details: error.details || "No additional information available.",
//         });
//       });
//   });
// };

