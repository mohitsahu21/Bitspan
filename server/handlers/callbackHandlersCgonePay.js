const moment = require("moment-timezone");
const { db } = require("../connect"); 


const handleCgonePayCallback = (req, res)=>{

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
    db.query(query, [STATUS, TRANSACTIONID, OPERATORID, CLIENTID, MESSAGE,createdAt], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send("Internal Server Error");
      }
  
      console.log("Data inserted successfully:");
      res.status(200).send("Callback processed successfully");
    });
}

module.exports = {
    handleCgonePayCallback 
}