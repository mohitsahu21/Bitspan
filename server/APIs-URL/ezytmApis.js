const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const ezytmBaseURL = process.env.EZYTM;
const apiToken = process.env.APIKEY_EZYTM;

const apiClient = axios.create({
  baseURL: ezytmBaseURL,
});

const getDataFromEzytmClientApi = (endpoint) => {
  return apiClient.get(endpoint, {
    params: {
      at: apiToken
    },
  }).then(response => {
    return response.data;
  }).catch(error => {
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

const makeBillPaymentRequest = (endpoint,params = {}) => {
  // const endpoint = "/Recharge2";
  
  return apiClient
    .get(endpoint, {
      params: {
        at: apiToken,
        ...params
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error making recharge request:", error.message);
      throw error;
    });
};



const ezytmBaseURL1 = "https://sizarpay.in/API";
const Token = "ad384bdf2ba69258da94fa40451d6558"
const UserID = "5766";
const apiClient1 = axios.create({
  baseURL: ezytmBaseURL1,
});

module.exports = {
  getDataFromEzytmClientApi,
  makeRechargeRequest,
  makeBillPaymentRequest
};

