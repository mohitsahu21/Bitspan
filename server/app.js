const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const retailerRouter = require("./routers/Retailer/retailerRouter");
const instpayRouter = require("./routers/Retailer/instpayRouter");
const ezytmRouter = require("./routers/Retailer/ezytmRouter");
const sizarPayRouter = require("./routers/Retailer/sizarPayRouter");
const cgonePayRouter = require("./routers/Retailer/cgonePayRouter");
const deeperwebRouter = require("./routers/Retailer/deeperwebRouter");
const nsdlPanEasySmart = require("./routers/Retailer/nsdlPanEasysmartRouter");
const zlink = require("./routers/Retailer/zlinkPanRouter");
const easyPayRouter = require("./routers/SuperAdmin/easyPayUpiPaymentRouter");
const superAdminRouter = require("./routers/SuperAdmin/superAdminRouter");
const superEmployeeRoute = require("./routers/superadminemployee/superEmployeeRoute");
const superDistributor = require("./routers/superDistributor/superDistributorRoute");
const loginRouter = require("./routers/LoginApi/loginUserRoute");
const moment = require("moment-timezone");
const { db } = require("./connect");
const {
  handleCgonePayCallback,
} = require("./handlers/callbackHandlersCgonePay");
const {
  handleEasySmartNsdlPANCallback,
} = require("./handlers/easySmartnsdlCallback");
const { paymentCallback } = require("./handlers/easyPay-payment-callback");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth/retailer", retailerRouter);
app.use("/api/auth/log-reg", loginRouter);
app.use("/api/auth/instpay", instpayRouter);
app.use("/api/auth/ezytm", ezytmRouter);
app.use("/api/auth/sizarpay", sizarPayRouter);
app.use("/api/auth/cgonepay", cgonePayRouter);
app.use("/api/auth/deeperweb", deeperwebRouter);
app.use("/api/auth/nsdlpan", nsdlPanEasySmart);
app.use("/api/auth/zlink", zlink);
app.use("/api/auth/easyPayUpi", easyPayRouter);
app.use("/api/auth/superAdmin", superAdminRouter);
app.use("/api/auth/superAdminEmployee", superEmployeeRoute);
app.use("/api/auth/superDistributor", superDistributor);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/panUploads", express.static(path.join(__dirname, "panUploads")));
app.use(
  "/complainUpload",
  express.static(path.join(__dirname, "complainUpload"))
);
app.use("/profile-data", express.static(path.join(__dirname, "profile-data")));

// Callback URL endpoint
app.get("/callbackUrl", (req, res) => {
  const txid = req.query.txid?.trim();
  const status = req.query.status?.trim();
  const opid = req.query.opid?.trim();

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

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

    console.log("Data inserted successfully:");
    res.status(200).send("Callback processed successfully");
  });
});

app.get("/callbackUrlCgonePay", (req, res) => {
  const STATUS = req.query.STATUS?.trim();
  const TRANSACTIONID = req.query.TRANSACTIONID?.trim();
  const OPERATORID = req.query.OPERATORID?.trim();
  const CLIENTID = req.query.CLIENTID?.trim();
  const MESSAGE = req.query.MESSAGE?.trim();

  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const query = `
    INSERT INTO cgonePaycallback (STATUS, TRANSACTIONID, OPERATORID,CLIENTID,MESSAGE, created_at)
    VALUES (?, ?, ?, ?, ? , ?)
  `;

  // Execute the SQL query
  db.query(
    query,
    [STATUS, TRANSACTIONID, OPERATORID, CLIENTID, MESSAGE, createdAt],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send("Internal Server Error");
      }

      console.log("Data inserted successfully:");
      res.status(200).send("Callback processed successfully");
    }
  );
});

app.get("/callbackUrlCgonePay", handleCgonePayCallback);
app.get("/easySmartNsdlPANCallback", handleEasySmartNsdlPANCallback);
app.get("/easyPay-payment-callback", paymentCallback);

const port = process.env.PORT || 7777;

app.listen(port, () => {
  console.log(`Server Run on PORT : ${port}`);
});
