const moment = require("moment-timezone");
const { db } = require("../connect"); 


const handleEasySmartNsdlPANCallback = (req, res)=>{

    const {order_id , ack , status , encData} = req.query
    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  
    const query = `
      INSERT INTO easySmartnsdlCallback (order_id, ack, status,encData, created_at)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    // Execute the SQL query
    db.query(query, [order_id, ack, status, encData,createdAt], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send("Internal Server Error");
      }
  
      console.log("Data inserted successfully:");
      // res.status(200).send("Callback processed successfully");

       // Redirect the user to a specific URL after success
    const redirectUrl = `https://2kadam.co.in/dashboard`;
    res.redirect(redirectUrl);
    });
}

module.exports = {
    handleEasySmartNsdlPANCallback 
}