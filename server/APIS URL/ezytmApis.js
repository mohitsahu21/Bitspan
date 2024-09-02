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

module.exports = {
  getDataFromEzytmClientApi,
};
