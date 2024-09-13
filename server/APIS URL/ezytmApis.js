const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const ezytmBaseURL = process.env.EZYTM;
const apiToken = process.env.APIKEY_EZYTM;

const apiClient = axios.create({
  baseURL: ezytmBaseURL,
});

const getDataFromEzytmClientApi = (endpoint) => {
  return apiClient
    .get(endpoint, {
      params: {
        at: apiToken,
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



const makeRechargeRequest = (endpoint,params = {}) => {
  // const endpoint = "/Recharge2";
  
  return apiClient
    .get(endpoint, {
      params: {
        ApiToken: apiToken,
        ...params
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error making recharge request:", error.message);
      throw error;
    });
};

// const makeRechargeRequest = (mobileNo, amount, opId, refTxnId) => {
//   const endpoint = "/Recharge2";
//   return apiClient
//     .get(endpoint, {
//       params: {
//         ApiToken: apiToken,
//         MobileNo: mobileNo,
//         Amount: amount,
//         OpId: opId,
//         RefTxnId: refTxnId,
//       },
//     })
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error("Error making recharge request:", error.message);
//       throw error;
//     });
// };

module.exports = {
  getDataFromEzytmClientApi,
  makeRechargeRequest,
};
