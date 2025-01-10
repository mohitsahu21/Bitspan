const { getDataFromClientApi } = require("../../APIS URL/instpayApis");
const { db } = require("../../connect");
const moment = require("moment-timezone");

const getBalance = (req, res) => {
  const token = process.env.APITokenInstapay; // or fetch it dynamically
  const username = process.env.APIUsernameInstapay; // or fetch from request, etc.

  getDataFromClientApi("/v3/recharge/balance", token, username, {
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send("Error fetching data from client API", error.message);
    });
};

const panVerification = async (req, res) => {
  const token = process.env.APITokenInstapay; // or fetch it dynamically
  const username = process.env.APIUsernameInstapay;

  const { number, orderid } = req.query;

  if (!number || !orderid) {
    return res.status(400).json({ error: "Number & Order ID are Required" });
  }

  getDataFromClientApi("/v3/verification/pan_verification", token, username, {
    number: number,
    orderid: orderid,
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

const gstVerification = async (req, res) => {
  const token = process.env.APITokenInstapay; // or fetch it dynamically
  const username = process.env.APIUsernameInstapay; // or fetch from request, etc.

  getDataFromClientApi("/v3/verification/gst_verification", token, username, {
    number: "23AGLPP2890G1Z7",
    orderid: "654123",
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

const adharVerification = async (req, res) => {
  const token = process.env.APITokenInstapay; // or fetch it dynamically
  const username = process.env.APIUsernameInstapay; // or fetch from request, etc.

  getDataFromClientApi("/v3/verification/get_aadhaar_otp", token, username, {
    number: "",
    orderid: "",
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

const adharotpVerification = async (req, res) => {
  const token = process.env.APITokenInstapay; // or fetch it dynamically
  const username = process.env.APIUsernameInstapay; // or fetch from request, etc.

  getDataFromClientApi("/v3/verification/aadhaar_verify", token, username, {
    number: "",
    otp: "",
    ref_id: "",
    orderid: "",
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

const bankverification = async (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;
  const { ifsc, number, orderid } = req.query;
  if (!ifsc || !number || !orderid) {
    return res
      .status(400)
      .json({ error: "IFSC, Number, OrderID are Required" });
  }
  getDataFromClientApi("/v3/bank_verification/api", token, username, {
    ifsc: ifsc,
    number: number,
    orderid: orderid,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

const getDthPlan = async (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;
  // Call the client API with the dynamic values
  getDataFromClientApi("/v3/dth_connection/get_plan", token, username, {
    opcode: "TPC",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

const applyDth = async (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;

  const {
    opcode,
    number,
    amount,
    plan_id,
    first_name,
    last_name,
    full_address,
    postal_code,
    orderid,
  } = req.body;

  // Check if all required parameters are provided
  if (
    !opcode ||
    !number ||
    !amount ||
    !plan_id ||
    !first_name ||
    !last_name ||
    !full_address ||
    !postal_code ||
    !orderid
  ) {
    return res.status(400).json({ error: "All parameters are required" });
  }

  getDataFromClientApi("/v3/dth_connection/api", token, username, {
    opcode: opcode,
    number: number,
    amount: amount,
    plan_id: plan_id,
    first_name: first_name,
    last_name: last_name,
    full_address: full_address,
    postal_code: postal_code,
    orderid: orderid,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error applying DTH connection");
    });
};

const billfetch = (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;

  const { number, opcode } = req.body;

  if (!number || !opcode) {
    return res.status(400).json({ error: "Number and Opcode are required" });
  }

  getDataFromClientApi("/plan_api/bill_fetch", username, token, {
    number: number,
    opcode: opcode,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching bill");
    });
};

const rechargeApi = (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;

  const { opcode, number, amount, orderid } = req.body;

  if (!number || !opcode || !amount || !orderid) {
    return res.status(400).json({ error: "All are required" });
  }

  getDataFromClientApi("/v3/recharge/api", username, token, {
    opcode: opcode,
    number: number,
    amount: amount,
    orderid: orderid,
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error in recharge");
    });
};

const getStatus = (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;

  const { orderid } = req.body;

  if (!orderid) {
    return res.status(400).json({ error: "Order ID are required" });
  }

  getDataFromClientApi("/v3/recharge/status", token, username, {
    orderid: orderid,
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send("Error fetching data from client API", error.message);
    });
};

// NSDL API
const nsdlPan = (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;

  const { number, orderid } = req.body;

  if (!number || !orderid) {
    return res.status(400).json({ error: "Number & Order ID are required" });
  }

  getDataFromClientApi("/v4/nsdl/new_pan", token, username, {
    number: number,
    mode: "EKYC",
    orderid: orderid,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send("Error fetching data from client API", error.message);
    });
};

const nsdlPanCorrect = (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;

  const { number, orderid } = req.body;

  if (!number || !orderid) {
    return res.status(400).json({ error: "Number & Order ID are required" });
  }

  getDataFromClientApi("/v4/nsdl/correction", token, username, {
    number: number,
    mode: "EKYC",
    orderid: orderid,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send("Error fetching data from client API", error.message);
    });
};

const nsdlPanIncom = (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;

  const { orderid } = req.body;

  if (!orderid) {
    return res.status(400).json({ error: "Order ID are required" });
  }

  getDataFromClientApi("/v4/nsdl/incomplete", token, username, {
    orderid: orderid,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send("Error fetching data from client API", error.message);
    });
};

// check Balance and then Recharge

const operatorMapping = {
  Airtel: { code: "A", category: "Prepaid" },
  "BSNL STV": { code: "BR", category: "Prepaid" },
  "BSNL TOPUP": { code: "BT", category: "Prepaid" },
  "Airtel Postpaid": { code: "AP", category: "Postpaid" },
  "BSNL Postpaid": { code: "BSNLMP", category: "Postpaid" },
  Jio: { code: "RC", category: "Prepaid" },
  "Jio Postpaid": { code: "JIOP", category: "Postpaid" },
  Vi: { code: "V", category: "Prepaid" },
  "Vi Postpaid": { code: "VP", category: "Postpaid" },
  "Dish TV": { code: "DTV", category: "DTH" },
  "Tata Sky": { code: "TTV", category: "DTH" },
  Videocon: { code: "VTV", category: "DTH" },
  "Sun Direct": { code: "STV", category: "DTH" },
  "Airtel DTH": { code: "ATV", category: "DTH" },
  "M.P. Paschim Kshetra Vidyut Vitaran Company Ltd": {
    code: "MPPKVVCL",
    category: "Electricity",
  },
  "M.P. Madhya Kshetra Vidyut Vitaran - URBAN": {
    code: "MPMKVVCLU",
    category: "Electricity",
  },
  "M.P. Madhya Kshetra Vidyut Vitaran - RURAL": {
    code: "MPMKVVCLR",
    category: "Electricity",
  },
  "M.P. Poorv Kshetra Vidyut Vitaran Company Ltd (RURAL)": {
    code: "MPPKVVCLR",
    category: "Electricity",
  },
  "Airtel Broadband": { code: "214", category: "Broadband" },
  Hathway: { code: "135", category: "Broadband" },
  "BSNL Broadband": { code: "1057", category: "Broadband" },
};

const rechargeWithBalanceCheck = (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;
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

  const providerName = "inspay";
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
    const orderId = `REI${Date.now()}`;

    getDataFromClientApi("/v3/recharge/balance", token, username, {
      format: "json",
    })
      .then((balanceData) => {
        if (parseFloat(balanceData.balance) < amount) {
          return Promise.reject({
            status: 400,
            error: "Insufficient provider balance",
          });
        }

        const operatorDetails = operatorMapping[operatorName];
        if (!operatorDetails) {
          return Promise.reject({
            status: 400,
            error: "Invalid operator name",
            message: `Operator ${operatorName} not found.`,
          });
        }

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
            if (err) {
              reject({
                status: 500,
                error: "Database insertion error",
                message: err.message,
              });
            } else {
              resolve({ orderId, operatorDetails });
            }
          });
        });
      })
      .then(({ orderId, operatorDetails }) => {
        return getDataFromClientApi("/v3/recharge/api", token, username, {
          opcode: operatorDetails.code,
          number,
          amount,
          orderid: orderId,
          format: "json",
        }).then((rechargeData) => {
          return { rechargeData, orderId, operatorDetails };
        });
      })
      .then(({ rechargeData, orderId }) => {
        const updateQuery =
          "UPDATE recharges SET opcode = ?, status = ?, transaction_id = ?, opid = ?, dr_amount = ?, orderid = ?, updated_at = ? WHERE orderid = ?";
        const updateValues = [
          rechargeData.opcode || "",
          rechargeData.status,
          rechargeData.txid || "",
          rechargeData.opid || "",
          rechargeData.dr_amount || "",
          orderId,
          updatedAt,
          orderId,
        ];

        return new Promise((resolve, reject) => {
          db.query(updateQuery, updateValues, (err) => {
            if (err) {
              reject({
                status: 500,
                error: "Failed to update recharge data",
                message: err.message,
              });
            } else {
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
        if (rechargeData.status === "Success" || rechargeData.status === "Pending") {
          let rechargeMessage = "Recharge in process";
          if(rechargeData.STATUS === "Success"){
            rechargeMessage = "Recharge successful"
          } else if(rechargeData.STATUS === "Pending"){
            rechargeMessage = "Recharge in process";
          }
          const transactionId = `TXNW${Date.now()}`;
          const transactionDetails = `Recharge Deduction ${number}`;
          const newWalletBalance = (currentBalance - walletDeductAmt).toFixed(
            2
          );

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

const operatorMappingDTH = {
  "Dish TV": { code: "DTV", category: "DTH" },
  "Tata Sky": { code: "TTV", category: "DTH" },
  Videocon: { code: "VTV", category: "DTH" },
  "Sun Direct": { code: "STV", category: "DTH" },
  "Airtel DTH": { code: "ATV", category: "DTH" },
};

const generateUniqueOrderId = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT MAX(id) AS maxId FROM dth_connection";

    db.query(query, (err, result) => {
      if (err) {
        console.error("Error generating unique orderid:", err.message);
        return reject(err);
      }

      const maxId = result[0].maxId || 0;
      const newOrderId = `ORD${String(maxId + 1).padStart(6, "0")}`;
      resolve(newOrderId);
    });
  });
};

const dthRechargeWithBalanceCheck = (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;
  const {
    operatorName,
    number,
    amount,
    plan_id,
    first_name,
    last_name,
    full_address,
    postal_code,
    user_id,
  } = req.body;

  const providerName = "inspay";
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  if (
    !operatorName ||
    !number ||
    !amount ||
    !plan_id ||
    !first_name ||
    !last_name ||
    !full_address ||
    !postal_code
  ) {
    return res
      .status(400)
      .json({ status: "failure", error: "All fields are required" });
  }

  // Step 1: Fetch balance
  getDataFromClientApi("/v3/recharge/balance", token, username, {
    format: "json",
  })
    .then((balanceData) => {
      if (!balanceData || balanceData.balance < amount) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // Step 2: Map operator name to code
      const operatorDetails = operatorMappingDTH[operatorName];
      if (!operatorDetails) {
        return res.status(400).json({ error: "Invalid operator name" }); // Return after sending response
      }

      // Step 3: Generate a unique orderid
      return generateUniqueOrderId();
    })
    .then((generatedOrderId) => {
      const insertQuery = `
        INSERT INTO dth_connection (
          operatorName, number, amount, plan_id, first_name, last_name, 
          full_address, postal_code, orderid, providerName, user_id, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        operatorName,
        number,
        amount,
        plan_id,
        first_name,
        last_name,
        full_address,
        postal_code,
        generatedOrderId,
        providerName,
        user_id,
        createdAt,
      ];

      return new Promise((resolve, reject) => {
        db.query(insertQuery, values, (err, result) => {
          if (err) {
            console.error("Error inserting recharge record:", err.message);
            return reject(err);
          }

          const autoGeneratedOrderId = result.insertId;
          resolve({ orderid: generatedOrderId, id: autoGeneratedOrderId });
        });
      });
    })
    .then(({ orderid, id }) => {
      return getDataFromClientApi("/v3/dth_connection/api", token, username, {
        opcode: operatorMappingDTH[operatorName].code,
        number: number,
        amount: amount,
        plan_id: plan_id,
        first_name: first_name,
        last_name: last_name,
        full_address: full_address,
        postal_code: postal_code,
        orderid: orderid,
      }).then((rechargeData) => {
        return { rechargeData, id };
      });
    })
    .then(({ rechargeData, id }) => {
      const updateQuery = `
        UPDATE dth_connection SET opcode = ?, txid = ?, status = ?, opid = ?, dr_amount = ?, message = ? WHERE id = ?`;
      const updateValues = [
        rechargeData.opcode,
        rechargeData.txid,
        rechargeData.status,
        rechargeData.opid,
        rechargeData.dr_amount,
        rechargeData.message,
        id,
      ];

      db.query(updateQuery, updateValues, (err, result) => {
        if (err) {
          console.error("Error updating recharge data:", err.message);
          if (!res.headersSent) {
            return res
              .status(500)
              .json({ error: "Database update error", message: err.message });
          }
        }

        const responseMessage =
          {
            Success: "Recharge successful",
            Pending: "Recharge pending",
            Failure: "Recharge failed",
          }[rechargeData.status] || "Recharge status unknown";

        if (!res.headersSent) {
          res.json({
            message: responseMessage,
            rechargeData,
            orderid: rechargeData.orderid,
          });
        }
      });
    })
    .catch((error) => {
      if (!res.headersSent) {
        res.status(500).json({
          error: "Error during recharge process",
          message: error.message,
        });
      }
    });
};

const nsdlNewRequest = async (req, res) => {
  try {
    const token = process.env.APITokenInstapay;
    const username = process.env.APIUsernameInstapay;
    const {
      applicationMode,
      selectType,
      name,
      dob,
      gender,
      mobile,
      email,
      physicalPan,
      walletDeductAmt,
      userId,
    } = req.body;

    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // Check required fields
    if (
      !applicationMode ||
      !selectType ||
      !name ||
      !dob ||
      !gender ||
      !mobile ||
      !email ||
      !physicalPan ||
      !walletDeductAmt ||
      !userId
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Fetch balance
    const balanceData = await getDataFromClientApi(
      "/v3/recharge/balance",
      token,
      username,
      { format: "json" }
    );
    if (!balanceData || balanceData.balance < walletDeductAmt) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Insert initial row to generate orderid
    const insertQuery = `INSERT INTO nsdlpan (applicationMode, selectType, name, dob, gender, mobile, email, physicalPan, walletDeductAmt, providerName, userId, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      applicationMode,
      selectType,
      name,
      dob,
      gender,
      mobile,
      email,
      physicalPan,
      walletDeductAmt,
      "inspay",
      userId,
      createdAt,
    ];

    const result = await new Promise((resolve, reject) => {
      db.query(insertQuery, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    const autoGeneratedOrderId = result.insertId;
    const formattedOrderId = String(autoGeneratedOrderId).padStart(6, "0");

    // Perform recharge with the generated orderid
    const nsdlData = await getDataFromClientApi(
      "/v4/nsdl/new_pan",
      token,
      username,
      {
        number: mobile,
        mode: "EKYC",
        orderid: formattedOrderId, // Pass the formatted orderid
      }
    );

    // Check if NSDL API returned valid data
    // if (!nsdlData || !nsdlData.txid) {
    //   return res.status(500).json({ error: "Invalid response from NSDL API" });
    // }

    // Update the database with API response data
    const updateQuery = `
      UPDATE nsdlpan SET txid = ?, status = ?, opid = ?, message = ?, url = ?, number = ?, amount =?, orderid = ? WHERE id = ?`;
    const updateValues = [
      nsdlData.txid,
      nsdlData.status,
      nsdlData.opid,
      nsdlData.message,
      nsdlData.url,
      nsdlData.number,
      nsdlData.amount,
      formattedOrderId, // Use the generated orderid if not returned from API
      autoGeneratedOrderId, // Use the database id for updating
    ];

    await new Promise((resolve, reject) => {
      db.query(updateQuery, updateValues, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Respond based on the status from nsdlData
    const statusMessage =
      nsdlData.status === "Success"
        ? "Successful"
        : nsdlData.status === "Failure"
        ? "Recharge failed"
        : "Status unknown";

    res.json({
      message: statusMessage,
      nsdlData,
      orderid: formattedOrderId, // Include the generated orderid in the response
    });
  } catch (error) {
    console.error("Error in nsdlNewRequest:", error);
    res
      .status(500)
      .json({ error: "Error during recharge process", message: error.message });
  }
};

const nsdlCorrection = async (req, res) => {
  try {
    const token = process.env.APITokenInstapay;
    const username = process.env.APIUsernameInstapay;
    const {
      applicationMode,
      selectType,
      name,
      dob,
      gender,
      mobile,
      email,
      physicalPan,
      walletDeductAmt,
      userId,
    } = req.body;

    // console.log("Request Body:", req.body);

    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

    // Check required fields
    if (
      !applicationMode ||
      !selectType ||
      !name ||
      !dob ||
      !gender ||
      !mobile ||
      !email ||
      !physicalPan ||
      !walletDeductAmt ||
      !userId
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Fetch balance
    const balanceData = await getDataFromClientApi(
      "/v3/recharge/balance",
      token,
      username,
      { format: "json" }
    );
    // console.log("Balance Data:", balanceData);

    if (!balanceData || balanceData.balance < walletDeductAmt) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    // Insert initial row to generate orderid
    const insertQuery = `INSERT INTO nsdlpancorrection (applicationMode, selectType, name, dob, gender, mobile, email, physicalPan, walletDeductAmt, providerName, userId, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      applicationMode,
      selectType,
      name,
      dob,
      gender,
      mobile,
      email,
      physicalPan,
      walletDeductAmt,
      "inspay",
      userId,
      createdAt,
    ];

    const result = await new Promise((resolve, reject) => {
      db.query(insertQuery, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
    console.log("Insert Query Result:", result);

    const autoGeneratedOrderId = result.insertId;
    const formattedOrderId = String(autoGeneratedOrderId).padStart(6, "0");

    console.log("Generated Order ID:", formattedOrderId);

    // Perform recharge with the generated orderid
    const nsdlData = await getDataFromClientApi(
      "/v4/nsdl/correction",
      token,
      username,
      {
        number: mobile,
        mode: "EKYC",
        orderid: formattedOrderId,
      }
    );
    console.log("Mobile Number:", mobile);
    console.log("Formatted Order ID:", formattedOrderId);

    // console.log("NSDL API Request Payload:", {
    //   number: mobile,
    //   mode: "EKYC",
    //   orderid: formattedOrderId,
    // });

    // Update the database with API response data
    const updateQuery = `
      UPDATE nsdlpancorrection SET txid = ?, status = ?, opid = ?, message = ?, url = ?, number = ?, amount =?, orderid = ? WHERE id = ?`;
    const updateValues = [
      nsdlData.txid,
      nsdlData.status,
      nsdlData.opid,
      nsdlData.message,
      nsdlData.url,
      nsdlData.number,
      nsdlData.amount,
      formattedOrderId,
      autoGeneratedOrderId,
    ];

    const updateResult = await new Promise((resolve, reject) => {
      db.query(updateQuery, updateValues, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
    console.log("Update Query Result:", updateResult);

    // Respond based on the status from nsdlData
    const statusMessage =
      nsdlData.status === "Success"
        ? "Successful"
        : nsdlData.status === "Failure"
        ? "Recharge failed"
        : "Status unknown";

    res.json({
      message: statusMessage,
      nsdlData,
      orderid: formattedOrderId,
    });
  } catch (error) {
    console.error("Error in nsdlCorrection:", error);
    res
      .status(500)
      .json({ error: "Error during recharge process", message: error.message });
  }
};

module.exports = {
  getBalance,
  panVerification,
  gstVerification,
  adharVerification,
  adharotpVerification,
  bankverification,
  getDthPlan,
  applyDth,
  billfetch,
  rechargeApi,
  getStatus,
  nsdlPan,
  nsdlPanCorrect,
  nsdlPanIncom,
  rechargeWithBalanceCheck,
  dthRechargeWithBalanceCheck,
  nsdlNewRequest,
  nsdlCorrection,
};

// const dthRechargeWithBalanceCheck = (req, res) => {
//   const token = process.env.APITokenInstapay;
//   const username = process.env.APIUsernameInstapay;
//   const {
//     operatorName,
//     number,
//     amount,
//     plan_id,
//     first_name,
//     last_name,
//     full_address,
//     postal_code,
//   } = req.body;

//   console.log(req.body);

//   const providerName = "inspay";
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//   if (
//     !operatorName ||
//     !number ||
//     !amount ||
//     !plan_id ||
//     !first_name ||
//     !last_name ||
//     !full_address ||
//     !postal_code
//   ) {
//     return res
//       .status(400)
//       .json({ status: "failure", error: "All fields are required" });
//   }

//   // Step 1: Fetch balance
//   getDataFromClientApi("/v3/recharge/balance", token, username, {
//     format: "json",
//   })
//     .then((balanceData) => {
//       if (!balanceData || balanceData.balance < amount) {
//         return res.status(400).json({ error: "Insufficient balance" });
//       }

//       // Step 2: Map operator name to code
//       const operatorDetails = operatorMappingDTH[operatorName]; // Corrected to use `operatorMappingDTH`
//       if (!operatorDetails) {
//         return res.status(400).json({ error: "Invalid operator name" });
//       }

//       // Step 3: Generate the orderid
//       const generatedOrderId = `OR${Math.floor(Math.random() * 1000000)
//         .toString()
//         .padStart(6, "0")}`; // Generate random orderid with prefix

//       // Step 4: Insert initial row with generated orderid
//       const insertQuery = `
//         INSERT INTO dth_recharge (
//           operatorName, number, amount, plan_id, first_name, last_name,
//           full_address, postal_code, orderid, created_at
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//       const values = [
//         operatorName,
//         number,
//         amount,
//         plan_id,
//         first_name,
//         last_name,
//         full_address,
//         postal_code,
//         generatedOrderId, // Use the generated order ID here
//         createdAt,
//       ];

//       return new Promise((resolve, reject) => {
//         db.query(insertQuery, values, (err, result) => {
//           if (err) {
//             console.error("Error inserting recharge record:", err.message);
//             return reject(err);
//           }

//           const autoGeneratedOrderId = result.insertId; // Use the inserted row ID for future reference
//           resolve({ orderid: generatedOrderId, id: autoGeneratedOrderId }); // Pass both orderid and id for next steps
//         });
//       });
//     })
//     .then(({ orderid, id }) => {
//       // Step 5: Perform recharge with the generated orderid
//       return getDataFromClientApi("/v3/dth_connection/api", token, username, {
//         opcode: operatorMappingDTH[operatorName].code,
//         number: number,
//         amount: amount,
//         plan_id: plan_id,
//         first_name: first_name,
//         last_name: last_name,
//         full_address: full_address,
//         postal_code: postal_code,
//         orderid: orderid, // Use the generated orderid
//       }).then((rechargeData) => {
//         return { rechargeData, id };
//       });
//     })
//     .then(({ rechargeData, id }) => {
//       // Step 6: Update the recharge row with API response data using the initially generated id
//       const updateQuery = `
//         UPDATE dth_recharge SET opcode = ?, txid = ?, status = ?, opid = ?, dr_amount = ?, message = ? WHERE id = ?`;
//       const updateValues = [
//         rechargeData.opcode,
//         rechargeData.txid,
//         rechargeData.status,
//         rechargeData.opid,
//         rechargeData.dr_amount,
//         rechargeData.message,
//         id, // Use the initial autoGeneratedOrderId
//       ];

//       db.query(updateQuery, updateValues, (err, result) => {
//         if (err) {
//           console.error("Error updating recharge data:", err.message);
//           return res
//             .status(500)
//             .json({ error: "Database update error", message: err.message });
//         }

//         // Step 7: Respond with the recharge data and orderid
//         const responseMessage =
//           {
//             Success: "Recharge successful",
//             Pending: "Recharge pending",
//             Failure: "Recharge failed",
//           }[rechargeData.status] || "Recharge status unknown";

//         res.json({
//           message: responseMessage,
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
// }; // end

// const rechargeWithBalanceCheck = (req, res) => {
//   const token = process.env.APITokenInstapay;
//   const username = process.env.APIUsernameInstapay;
//   const { number, amount, orderid, operatorName } = req.body;

//   if (!number || !amount || !orderid || !operatorName) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   // Step 1: Fetch balance
//   getDataFromClientApi("/v3/recharge/balance", token, username, {
//     format: "json",
//   })
//     .then((balanceData) => {
//       if (balanceData.balance < amount) {
//         return res.status(400).json({ error: "Insufficient balance" });
//       }

//       // Step 2: Map operator name to code
//       const operatorDetails = operatorMapping[operatorName];
//       if (!operatorDetails) {
//         return res.status(400).json({ error: "Invalid operator name" });
//       }

//       // Step 3: Perform recharge
//       return getDataFromClientApi("/v3/recharge/api", token, username, {
//         opcode: operatorDetails.code,
//         number: number,
//         amount: amount,
//         orderid: orderid,
//         format: "json",
//       });
//     })
//     .then((rechargeData) => {
//       res.json(rechargeData); // Step 4: Respond with recharge data
//     })
//     .catch((error) => {
//       res
//         .status(500)
//         .json({
//           error: "Error in balance check or recharge",
//           message: error.message,
//         });
//     });
// };

// const nsdlNewRequest = (req, res) => {
//   const token = process.env.APITokenInstapay;
//   const username = process.env.APIUsernameInstapay;
//   const {
//     applicationMode,
//     selectType,
//     name,
//     dob,
//     gender,
//     mobile,
//     email,
//     physicalPan,
//     walletDeductAmt,
//     userId,
//   } = req.body;
//   const providerName = "inspay";
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//   if (
//     !applicationMode ||
//     !selectType ||
//     !name ||
//     !dob ||
//     !gender ||
//     !mobile ||
//     !email ||
//     !physicalPan ||
//     !walletDeductAmt ||
//     !userId
//   ) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   // Step 1: Fetch balance
//   getDataFromClientApi("/v3/recharge/balance", token, username, {
//     format: "json",
//   }).then((balanceData) => {
//     if (balanceData.balance < walletDeductAmt) {
//       return res.status(400).json({ error: "Insufficient balance" });
//     }

//     // Step 3: Insert initial row to generate orderid
//     const insertQuery = `INSERT INTO nsdlpan (applicationMode, selectType, name, dob, gender, mobile, email, physicalPan, walletDeductAmt, providerName, userId, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//     const values = [
//       applicationMode,
//       selectType,
//       name,
//       dob,
//       gender,
//       mobile,
//       email,
//       physicalPan,
//       walletDeductAmt,
//       providerName,
//       userId,
//       createdAt,
//     ];

//     return new Promise((resolve, reject) => {
//       db.query(insertQuery, values, (err, result) => {
//         if (err) {
//           console.error("Error generating orderid:", err.message);
//           return reject(err);
//         }

//         // Step 4: Retrieve the auto-generated orderid (id from the insert)
//         const autoGeneratedOrderId = result.insertId; // Get the inserted id (orderid)
//         const formattedOrderId = String(autoGeneratedOrderId).padStart(6, "0");

//         resolve({ orderid: formattedOrderId, id: autoGeneratedOrderId }); // Resolve with both orderid and id
//       });
//     });
//   })
//   .then(({ orderid, id }) => {
//     // Step 5: Perform recharge with the generated orderid
//     return getDataFromClientApi("/v4/nsdl/new_pan", token, username, {
//       number: mobile,
//       mode: "EKYC",
//       orderid: orderid,
//     }).then((nsdlData) => {
//       return { nsdlData, id };
//     });
//   })
//   .then(({ nsdlData, id }) => {
//     // Step 6: Update the recharge row with API response data using the initially generated id
//     const updateQuery =
//       "UPDATE nsdlpan SET txid = ?, status = ?, opid = ?, message = ?, url = ?, number = ?, amount =?, orderid = ? WHERE id = ?";
//     const updateValues = [
//       nsdlData.txid,
//       nsdlData.status,
//       nsdlData.opid,
//       nsdlData.message,
//       nsdlData.url,
//       nsdlData.number,
//       nsdlData.amount,
//       nsdlData.orderid,
//       id, // Use the initial autoGeneratedOrderId for the update query
//     ];

//     db.query(updateQuery, updateValues, (err, result) => {
//       if (err) {
//         console.error("Error updating recharge data:", err.message);
//         return res
//           .status(500)
//           .json({ error: "Database update error", message: err.message });
//       }

//       // Step 7: Respond with the recharge data and orderid
//       if (nsdlData.status === "Success") {
//         res.json({
//           message: "Successful",
//           nsdlData,
//           orderid: nsdlData.orderid,
//         });
//       } else if (nsdlData.status === "Failure") {
//         res.json({
//           message: "Recharge failed",
//           nsdlData,
//           orderid: nsdlData.orderid,
//         });
//       } else {
//         res.json({
//           message: "status unknown",
//           nsdlData,
//           orderid: nsdlData.orderid,
//         });
//       }
//     });
//   })
//   .catch((error) => {
//     res.status(500).json({
//       error: "Error during recharge process",
//       message: error.message,
//     });
//   });
// };

// const nsdlNewRequest = async (req, res) => {
//   try {
//     const token = process.env.APITokenInstapay;
//     const username = process.env.APIUsernameInstapay;
//     const {
//       applicationMode,
//       selectType,
//       name,
//       dob,
//       gender,
//       mobile,
//       email,
//       physicalPan,
//       walletDeductAmt,
//       userId,
//     } = req.body;

//     const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//     // Check required fields
//     if (
//       !applicationMode ||
//       !selectType ||
//       !name ||
//       !dob ||
//       !gender ||
//       !mobile ||
//       !email ||
//       !physicalPan ||
//       !walletDeductAmt ||
//       !userId
//     ) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Fetch balance
//     const balanceData = await getDataFromClientApi(
//       "/v3/recharge/balance",
//       token,
//       username,
//       { format: "json" }
//     );
//     if (!balanceData || balanceData.balance < walletDeductAmt) {
//       return res.status(400).json({ error: "Insufficient balance" });
//     }

//     // Insert initial row to generate orderid
//     const insertQuery = `INSERT INTO nsdlpan (applicationMode, selectType, name, dob, gender, mobile, email, physicalPan, walletDeductAmt, providerName, userId, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//     const values = [
//       applicationMode,
//       selectType,
//       name,
//       dob,
//       gender,
//       mobile,
//       email,
//       physicalPan,
//       walletDeductAmt,
//       "inspay",
//       userId,
//       createdAt,
//     ];

//     const result = await new Promise((resolve, reject) => {
//       db.query(insertQuery, values, (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       });
//     });

//     const autoGeneratedOrderId = result.insertId;
//     const formattedOrderId = String(autoGeneratedOrderId).padStart(6, "0");

//     // Perform recharge with the generated orderid
//     const nsdlData = await getDataFromClientApi(
//       "/v4/nsdl/new_pan",
//       token,
//       username,
//       {
//         number: mobile,
//         mode: "EKYC",
//         orderid: formattedOrderId,
//       }
//     );

//     if (!nsdlData || !nsdlData.txid) {
//       return res.status(500).json({ error: "Invalid response from NSDL API" });
//     }

//     // Update the database with API response data
//     const updateQuery = `
//       UPDATE nsdlpan SET txid = ?, status = ?, opid = ?, message = ?, url = ?, number = ?, amount =?, orderid = ? WHERE id = ?`;
//     const updateValues = [
//       nsdlData.txid,
//       nsdlData.status,
//       nsdlData.opid,
//       nsdlData.message,
//       nsdlData.url,
//       nsdlData.number,
//       nsdlData.amount,
//       nsdlData.orderid,
//       autoGeneratedOrderId,
//     ];

//     await new Promise((resolve, reject) => {
//       db.query(updateQuery, updateValues, (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       });
//     });

//     // Respond based on the status from nsdlData
//     const statusMessage =
//       nsdlData.status === "Success"
//         ? "Successful"
//         : nsdlData.status === "Failure"
//         ? "Recharge failed"
//         : "Status unknown";

//     res.json({
//       message: statusMessage,
//       nsdlData,
//       orderid: nsdlData.orderid,
//     });
//   } catch (error) {
//     console.error("Error in nsdlNewRequest:", error);
//     res
//       .status(500)
//       .json({ error: "Error during recharge process", message: error.message });
//   }
// };
