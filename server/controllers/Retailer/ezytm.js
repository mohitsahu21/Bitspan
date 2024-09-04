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

const rechargeMobile = (req, res) => {
  const { mobileNo, amount, opId, refTxnId } = req.body;

  console.log(req.body);

  makeRechargeRequest(mobileNo, amount, opId, refTxnId)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error processing recharge request");
    });
};

const rechargeCallback = (req, res) => {
  const { STATUS, OPTXNID, YOURREQID } = req.query;

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  // SQL query to insert data into the recharge table
  const query = `
    INSERT INTO ezytmrechargecallback (transaction_id, status, operator_txn_id, created_at)
    VALUES (?, ?, ?, ?)
  `;

  // Execute the SQL query
  db.query(query, [YOURREQID, STATUS, OPTXNID, createdAt], (err, result) => {
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
