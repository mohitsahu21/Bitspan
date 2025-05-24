const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();


const sizarPayBaseURL = process.env.sizarPayBaseURL;
const Token = process.env.sizarPayToken;
const UserID = process.env.sizarPayUserID;
const apiClient = axios.create({
  baseURL: sizarPayBaseURL,
});
const getDataFromSizarPayClientApi = (endpoint,params = {}) => {
  return apiClient
    .get(endpoint, {
      params: {
        UserID: UserID,
        Token : Token,
        ...params
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
    getDataFromSizarPayClientApi,
}
