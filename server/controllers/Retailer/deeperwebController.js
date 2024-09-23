const moment = require("moment-timezone");
const { db } = require("../../connect");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const deeperwebBaseURL = process.env.deeperwebBaseURL;
const deeperwebUserID = process.env.deeperwebUserID
const Token = process.env.deeperwebToken;
const apiClient = axios.create({
  baseURL: deeperwebBaseURL,
});

const getDataFromdeeperwebClientApi = (endpoint, params = {}) => {
  return apiClient
    .get(endpoint, {
      params: {
        username : deeperwebUserID,
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

  getDataFromdeeperwebClientApi(endpoint, {

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
    Airtel: { code: "AT", category: "Prepaid" },
    "BSNL STV": { code: "BSP", category: "Prepaid" },
    "BSNL TOPUP": { code: "	BT", category: "Prepaid" },
    "Airtel Postpaid": { code: "AT", category: "Postpaid" },
    "BSNL Postpaid": { code: "", category: "Postpaid" },
    Jio: { code: "JIO", category: "Prepaid" },
    "Jio Postpaid": { code: "JIO", category: "Postpaid" },
    Vi: { code: "VI", category: "Prepaid" },
    "Vi Postpaid": { code: "VI", category: "Postpaid" },
  
  
    "Dish TV": { code: "DISHTV", category: "DTH" },
    "Tata Sky": { code: "TATASKY", category: "DTH" },
    "Videocon": { code: "VDDTH", category: "DTH" },
    "Sun Direct": { code: "SUNDTH", category: "DTH" },
    "Airtel DTH": { code: "ATDTH", category: "DTH" },
  
  
  };


  const deeperwebRecharge = (req, res) => {
    const { number, amount, operatorName, recharge_Type } = req.body;
    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const updatedAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const providerName = "Deeperweb";
    
    let responseSent = false; // Flag to track if response has been sent
    
    if (!number || !amount || !operatorName) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const operatorDetails = operatorMapping[operatorName];
    const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();
  
    // Step 1: Fetch balance
    getDataFromdeeperwebClientApi("/balance", {
    })
      .then((balanceData) => {
        if (balanceData?.totalBalance < amount) {
          if (!responseSent) { // Check if response was already sent
            responseSent = true;
            return res.status(400).json({ message: "Recharge failed", error: "Insufficient balance in Recharge Api" });
          }
        }
  
        // Step 2: Map operator name to code
        if (!operatorDetails) {
          if (!responseSent) {
            responseSent = true;
            return res.status(400).json({ error: "Invalid operator name" });
          }
        }
  
        // Step 3: Insert initial row to generate orderid
        const insertQuery =
          "INSERT INTO recharges (mobile_no, amount, operator_name, providerName, recharge_Type, created_at) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [number, amount, operatorName, providerName, recharge_Type, createdAt];
  
        return new Promise((resolve, reject) => {
          db.query(insertQuery, values, (err, result) => {
            if (err) {
              console.error("Error generating orderid:", err.message);
              return reject(err);
            }
  
            const autoGeneratedOrderId = result.insertId;
            const formattedOrderId = String(autoGeneratedOrderId).padStart(6, "0");
            resolve({ orderid: formattedOrderId, id: autoGeneratedOrderId });
          });
        });
      })
      .then(({ orderid, id }) => {
        // Step 4: Perform recharge with the generated orderid
        return getDataFromdeeperwebClientApi("/recharge", {
         number: number,
         amount: amount,
         operator: operatorDetails.code,
         ref_id: orderid,
        }).then((rechargeData) => {
          return { rechargeData, id, orderid };
        });
      })
      .then(({ rechargeData, id, orderid }) => {
        // Step 5: Update the recharge row with API response data
        const updateQuery =
          "UPDATE recharges SET opcode = ?, status = ?, transaction_id = ?, opid = ?, orderid = ?, message = ?, updated_at = ? WHERE id = ?";
        // const getStatus = () => {
        //   if (rechargeData?.status == 1) {
        //     return "Pending";
        //   } else if (rechargeData?.status == 2) {
        //     return "Success";
        //   } else {
        //     return "Failure";
        //   }
        // };
        // const Status = getStatus();
  
        const updateValues = [
          operatorDetails?.code,
          rechargeData?.status,
          rechargeData?.txn_id,
          rechargeData?.opt_id,
          orderid,
          rechargeData?.message,
          updatedAt,
          id,
        ];
  
        db.query(updateQuery, updateValues, (err, result) => {
          if (err) {
            console.error("Error updating recharge data:", err.message);
            if (!responseSent) {
              responseSent = true;
              return res.status(500).json({ error: "Database update error", message: err.message });
            }
          }
  
          // Step 6: Respond with the recharge data and orderid
          if (rechargeData?.status  == "Accepted" || rechargeData?.status  == "Success" ) {
            if (!responseSent) {
              responseSent = true;
              return res.json({
                message: "Recharge successful",
                rechargeData,
                orderid: rechargeData?.ref_id,
              });
            }
          }
          else if(rechargeData?.status == "Pending"){
            if (!responseSent) {
              responseSent = true;
              return res.json({
                message: "Recharge IN PROCESS",
                rechargeData,
                orderid: rechargeData?.ref_id,
              });
            }
          }
           else {
            if (!responseSent) {
              responseSent = true;
              return res.json({
                message: "Recharge failed",
                rechargeData,
                orderid: rechargeData?.ref_id,
              });
            }
          }
        });
      })
      .catch((error) => {
        console.error("Error during recharge process:", error.message);
        if (!responseSent) {
          responseSent = true;
          return res.status(500).json({
            error: "Error during recharge process",
            message: error.message,
          });
        }
      });
  };

  const deeperwebRechargeStatusCheck = (req,res) =>{
    const { transaction_id , recharge_date } = req.body;
    const endpoint = "/statusByRefId";
    // Generate random 6-digit number for OutletID
    // const randomOutletID = Math.floor(100000 + Math.random() * 900000).toString();
  
    getDataFromdeeperwebClientApi(endpoint, {
  
        ref_id : transaction_id,
    recharge_date : recharge_date
    
  })
  .then((data) => {
    res.json(data);
  })
  .catch((error) => {
    console.error("Error details:", error.response ? error.response.data : error.message);
    res.status(500).send("Error fetching data from client API");
  });
  
  
  };

  module.exports = {
    deeperwebBalance,
    deeperwebRecharge,
    deeperwebRechargeStatusCheck
  }