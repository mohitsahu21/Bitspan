const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const inspayBaseURL = process.env.INSTPAY;

const apiClient = axios.create({
  baseURL: inspayBaseURL,
});

const getDataFromClientApi = (endpoint, token, userId, params = {}) => {
  return apiClient.get(endpoint, {
    params: {
      ...params,
      token: token, // API token as a query parameter
      username: userId, // User ID as a query parameter
    },
  })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error("Error fetching data from client API:", error.message);
      throw error;
    });
};

module.exports = {
  getDataFromClientApi,
};
