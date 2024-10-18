const moment = require("moment-timezone");
const { db } = require("../../connect");
const axios = require("axios");
const dotenv = require("dotenv");
const { param } = require("../../routers/Retailer/deeperwebRouter");
dotenv.config();


const easySmartBaseURL = process.env.easySmartBaseURL;
const Token = process.env.easySmartToken;
const easySmartApiKey = process.env.easySmartApiKey;
const apiClient = axios.create({
  baseURL: easySmartBaseURL,
});


const getDataFromEasySmartPANApi = (endpoint, bodyData  = {}) => {
    return apiClient
      .post(endpoint, bodyData )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching data from client API:", error.message);
        throw error;
      });
  };
  
  const easySmartBalance = (req, res) => {
    
    const endpoint = "/user/balanceCheck";
  
    getDataFromEasySmartPANApi(endpoint,  {
        token : Token
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


  const easySmartBalanceForPan = async () => {
    const endpoint = "/user/balanceCheck";
    try {
      const data = await getDataFromEasySmartPANApi(endpoint, { token: Token });
      return data;
    } catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
      throw new Error("Error fetching balance from client API");
    }
  };
  // const easySmartNewPanRequest = (req, res) => {
  //   const { env_mode, app_type,app_mode,phyPanIsReq, redirect_url,order_id,first_name,middle_name,last_name,gender,dob,mobile_no,email_id,pan_no} = req.body;
  //   const endpoint = "/nsdl/request";
  
  //   getDataFromEasySmartPANApi(endpoint,  {
  //       api_key : easySmartApiKey,
  //       env_mode,
  //       app_type,
  //       app_mode,
  //       phyPanIsReq,
  //       redirect_url,
  //       order_id,
  //       applicant_data : {
  //           first_name,
  //           middle_name,
  //           last_name,
  //           gender,
  //           dob,
  //           mobile_no,
  //           email_id,
  //           pan_no
  //       }




  //   })
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "Error details:",
  //         error.response ? error.response.data : error.message
  //       );
  //       res.status(500).send("Error fetching data from client API");
  //     });
  // };


  const easySmartNewPanRequest = async (req, res) => {
    try {
      const {app_mode, selectType,phyPanIsReq, redirect_url,first_name,middle_name,last_name,gender,dob,mobile_no,email_id,pan_no,walletDeductAmt,userId } = req.body;

     // Try to get balance, handle errors if they occur
     let balanceData;
     try {
       balanceData = await easySmartBalanceForPan(); // Wait for the balance data
      
     } catch (error) {
       console.error("Error fetching balance:", error.message);
       return res.status(500).json({ error: "Error fetching balance data" });
     }
      if (!balanceData || balanceData.user_balance < walletDeductAmt) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      if(
        !app_mode ||
        !redirect_url ||
        !first_name ||
        !last_name ||
        !dob ||
        !gender ||
        !mobile_no ||
        !email_id ||
        !phyPanIsReq ||
        !selectType ||
        !walletDeductAmt ||
        !userId
      ){
        return res.status(400).json({ error: "All fields are required" });
      }

      let applicationMode ;
      if(app_mode == 'Instant PAN Card - EKYC'){
        applicationMode = "K"
      }
      else if(app_mode == 'Scan Based PAN Card'){
        applicationMode = "E"
      }

      let physicalPanReq ;

      if(phyPanIsReq == 'Yes'){
        physicalPanReq = "Y"
      }
      else{
        physicalPanReq = "N"
      }
      const endpoint = "/nsdl/request";
      const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
      const fullName = first_name + " " + middle_name + " " + last_name;
      // Insert initial row to generate orderid
    const insertQuery = `INSERT INTO nsdlpan (applicationMode, selectType, name, dob, gender, mobile, email, physicalPan, walletDeductAmt, providerName, userId, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      app_mode,
      selectType,
      fullName,
      dob,
      gender,
      mobile_no,
      email_id,
      phyPanIsReq,
      walletDeductAmt,
      "easySmart",
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

    const nsdlData = await getDataFromEasySmartPANApi(endpoint,  {
        api_key : easySmartApiKey,
        env_mode : "LIVE",
        app_type : "NEW",
        app_mode : applicationMode ,
        phyPanIsReq: physicalPanReq,
        redirect_url,
        order_id: formattedOrderId,
        applicant_data : {
            first_name,
            middle_name,
            last_name,
            gender,
            dob,
            mobile_no,
            email_id,
            pan_no
        }
 })

 // Update the database with API response data
 const updateQuery = `
 UPDATE nsdlpan SET txid = ?, status = ?, message = ?, orderid = ? WHERE id = ?`;
const updateValues = [
 nsdlData?.txnid,
 nsdlData?.status,
 nsdlData?.message,
 formattedOrderId, // Use the generated orderid if not returned from API
 autoGeneratedOrderId, // Use the database id for updating
];

await new Promise((resolve, reject) => {
 db.query(updateQuery, updateValues, (err, result) => {
   if (err) return reject(err);
   resolve(result);
 });
});


 if( nsdlData.status == "Success"){
 return res.json({
    message: "Success",
    nsdlData,
    orderid: formattedOrderId, // Include the generated orderid in the response
  });

 }
 return res.json({
  message: "Failed",
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

  const easySmartCorrectionPanRequest = async (req, res) => {
    try {
      const {app_mode, selectType,phyPanIsReq, redirect_url,first_name,middle_name,last_name,gender,dob,mobile_no,email_id,pan_no,walletDeductAmt,userId } = req.body;

     // Try to get balance, handle errors if they occur
     let balanceData;
     try {
       balanceData = await easySmartBalanceForPan(); // Wait for the balance data
      
     } catch (error) {
       console.error("Error fetching balance:", error.message);
       return res.status(500).json({ error: "Error fetching balance data" });
     }
      if (!balanceData || balanceData.user_balance < walletDeductAmt) {
        return res.status(400).json({ error: "Insufficient balance" });
      }

      if(
        !app_mode ||
        !redirect_url ||
        !first_name ||
        !last_name ||
        !dob ||
        !gender ||
        !mobile_no ||
        !email_id ||
        !phyPanIsReq ||
        !selectType ||
        !walletDeductAmt ||
        !pan_no ||
        !userId
      ){
        return res.status(400).json({ error: "All fields are required" });
      }

      let applicationMode ;
      if(app_mode == 'Instant PAN Card - EKYC'){
        applicationMode = "K"
      }
      else if(app_mode == 'Scan Based PAN Card'){
        applicationMode = "E"
      }

      let physicalPanReq ;

      if(phyPanIsReq == 'Yes'){
        physicalPanReq = "Y"
      }
      else{
        physicalPanReq = "N"
      }
      const endpoint = "/nsdl/request";
      const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
      const fullName = first_name + " " + middle_name + " " + last_name;
      // Insert initial row to generate orderid
    const insertQuery = `INSERT INTO nsdlpancorrection (applicationMode, selectType, name, dob, gender, mobile, email, pan_no, physicalPan, walletDeductAmt, providerName, userId, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      app_mode,
      selectType,
      fullName,
      dob,
      gender,
      mobile_no,
      email_id,
      pan_no,
      phyPanIsReq,
      walletDeductAmt,
      "easySmart",
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

    const nsdlData = await getDataFromEasySmartPANApi(endpoint,  {
      api_key : easySmartApiKey,
      env_mode : "LIVE",
      app_type : "CR",
      app_mode : applicationMode ,
      phyPanIsReq: physicalPanReq,
      redirect_url,
      order_id: formattedOrderId,
      applicant_data : {
          first_name,
          middle_name,
          last_name,
          gender,
          dob,
          mobile_no,
          email_id,
          pan_no
        }
 })

 // Update the database with API response data
 const updateQuery = `
 UPDATE nsdlpancorrection SET txid = ?, status = ?, message = ?, orderid = ? WHERE id = ?`;
const updateValues = [
 nsdlData?.txnid,
 nsdlData?.status,
 nsdlData?.message,
 formattedOrderId, // Use the generated orderid if not returned from API
 autoGeneratedOrderId, // Use the database id for updating
];

await new Promise((resolve, reject) => {
 db.query(updateQuery, updateValues, (err, result) => {
   if (err) return reject(err);
   resolve(result);
 });
});


 if( nsdlData.status == "Success"){
 return res.json({
    message: "Success",
    nsdlData,
    orderid: formattedOrderId, // Include the generated orderid in the response
  });

 }
return res.json({
  message: "Failed",
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

  const easySmartNewPanTransactionStatus = (req, res) => {
    const { order_id , txn_id} = req.body;
    const endpoint = "/nsdl/transactionStatus";
    
  
    getDataFromEasySmartPANApi(endpoint,  {
        api_key : easySmartApiKey,
        order_id,
        txn_id
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
  const easySmartNewPanAckStatus = (req, res) => {
    const { ack , txn_id} = req.body;
    const endpoint = "/nsdl/panAckStatus" ;
    
  
    getDataFromEasySmartPANApi(endpoint,  {
        api_key : easySmartApiKey,
        ack,
        txn_id
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


  // uti api start

  const easySmartUtiAgentOnbording = async (req,res)=>{
    const {name,agent_id,mobile,email_id,address,state,city,pincode,pan_no,aadhaar_no} = req.body
    const endpoint = "/agent/onbording"
    if(!name || !agent_id || !mobile || !email_id || !address || !state || !city || !pincode || !pan_no || !aadhaar_no)
    {
     return res.status(400).json({status : "failed", error: "Please fill all fields"})
    }
    try {
      const data = await getDataFromEasySmartPANApi(endpoint, {
       token : Token,
       name,
       agent_id,
       mobile,
       email_id ,
       address ,
       state,
       city,
       pincode,
       pan_no,
       aadhaar_no
      })
    
     return res.status(200).json({status : "Success",
       message: "Success", data})
    } catch (error) {
     console.error("Error details:", error.response ? error.response.data : error.message);
     return res.status(500).json({ status : "failed", error: "Error from api" });
    }
}
  const easySmartUtiLogin = async (req,res)=>{
    const {agent_id} = req.body
    const endpoint = "/uti/login"
    if( !agent_id)
    {
     return res.status(400).json({status : "failed", error: "Please fill all fields"})
    }
    try {
      const data = await getDataFromEasySmartPANApi(endpoint, {
       token : Token,
       agent_id,
       req_type: "LIVE"
     
      })
    
     return res.status(200).json({status : "Success",
       message: "Success", data})
    } catch (error) {
     console.error("Error details:", error.response ? error.response.data : error.message);
     return res.status(500).json({ status : "failed", error: "Error from api" });
    }
}



  module.exports = {
    easySmartBalance,
    easySmartNewPanRequest,
    easySmartNewPanTransactionStatus,
    easySmartNewPanAckStatus,
    easySmartCorrectionPanRequest,
    easySmartUtiAgentOnbording,
    easySmartUtiLogin
  }

