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
};

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

const rechargeWithBalanceCheck = (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;
  const { number, amount, operatorName } = req.body;
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  if (!number || !amount || !operatorName) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Step 1: Fetch balance
  getDataFromClientApi("/v3/recharge/balance", token, username, {
    format: "json",
  })
    .then((balanceData) => {
      if (balanceData.balance < amount) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      // Step 2: Map operator name to code
      const operatorDetails = operatorMapping[operatorName];
      if (!operatorDetails) {
        return res.status(400).json({ error: "Invalid operator name" });
      }

      // Step 3: Insert initial row to generate orderid
      const insertQuery =
        "INSERT INTO recharges (mobile_no, amount, operator_name, created_at) VALUES (?, ?, ?, ?)";
      const values = [number, amount, operatorName, createdAt];

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
      return getDataFromClientApi("/v3/recharge/api", token, username, {
        opcode: operatorMapping[operatorName].code,
        number: number,
        amount: amount,
        orderid: orderid, // Use the generated orderid
        format: "json",
      }).then((rechargeData) => {
        return { rechargeData, id }; // Return rechargeData and the initial inserted id
      });
    })
    .then(({ rechargeData, id }) => {
      // Step 6: Update the recharge row with API response data using the initially generated id
      const updateQuery =
        "UPDATE recharges SET opcode = ?, status = ?, transaction_id = ?, opid = ?, dr_amount = ?, orderid = ?, updated_at = ?  WHERE id = ?";
      const updateValues = [
        rechargeData.opcode,
        rechargeData.status,
        rechargeData.txid,
        rechargeData.opid,
        rechargeData.dr_amount,
        rechargeData.orderid,
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
        res.json({
          message: "Recharge successful",
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
};

// const panVerification = async (req, res) => {
//   try {
//     const token = process.env.APITokenInstapay; // or fetch it dynamically
//     const username = process.env.APIUsernameInstapay; // or fetch from request, etc.

//     const data = await getDataFromClientApi(
//       "/v3/verification/pan_verification",
//       token,
//       username,
//       { number: "FTIPS5510K", orderid: "123456", format: "json" }
//     );
//     res.json(data);
//   } catch (error) {
//     res.status(500).send("Error fetching data from client API");
//   }
// };

// {
//   "number": "1234567890",
//   "amount": 100,
//   "orderid": "ORD12345",
//   "operatorName": "Airtel"
// }
