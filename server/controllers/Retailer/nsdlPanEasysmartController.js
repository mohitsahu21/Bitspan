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
  const easySmartNewPanRequest = (req, res) => {
    const { env_mode, app_type,app_mode,phyPanIsReq, redirect_url,order_id,first_name,middle_name,last_name,gender,dob,mobile_no,email_id,pan_no} = req.body;
    const endpoint = "/nsdl/request";
  
    getDataFromEasySmartPANApi(endpoint,  {
        api_key : easySmartApiKey,
        env_mode,
        app_type,
        app_mode,
        phyPanIsReq,
        redirect_url,
        order_id,
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




  module.exports = {
    easySmartBalance,
    easySmartNewPanRequest,
    easySmartNewPanTransactionStatus,
    easySmartNewPanAckStatus
  }


