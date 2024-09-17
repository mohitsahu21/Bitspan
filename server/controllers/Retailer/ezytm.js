const {
  getDataFromEzytmClientApi,
  makeRechargeRequest,
} = require("../../APIS URL/ezytmApis");
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

// const rechargeMobile = (req, res) => {
//   const { mobileNo, amount, opId, refTxnId } = req.body;

//   console.log(req.body);

//   makeRechargeRequest(mobileNo, amount, opId, refTxnId)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       res.status(500).send("Error processing recharge request");
//     });
// };

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

const rechargeMobile = (req, res) => {
  const { number, amount, operatorName,	recharge_Type } = req.body;
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const providerName = "ezytm"
  if (!number || !amount || !operatorName) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const operatorDetails = operatorMapping[operatorName];


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
      return makeRechargeRequest("/Recharge2",{
        MobileNo : number,
        Amount : amount,
        OpId: operatorDetails.code,
        RefTxnId : orderid,

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

const rechargeCallback = (req, res) => {
  // const { STATUS, OPTXNID, YOURREQID } = req.query;
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

module.exports = {
  getBalanceEzytm,
  rechargeMobile,
  rechargeCallback,
  getRechargeStatus,
};

//   apiClient.get(endpoint, {
//     params: { at: apiToken },
//   })
//   .then(response => {
//     // Send the API response to the client
//     res.status(200).json(response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching data from client API:', error.message);

//     // Send error response to the client
//     res.status(error.response?.status || 500).json({
//       status: 'error',
//       message: error.message,
//       data: error.response?.data || null,
//     });
//   });
