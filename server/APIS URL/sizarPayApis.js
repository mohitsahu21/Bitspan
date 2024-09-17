const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();


const sizarPayBaseURL = "https://sizarpay.in/API";
const Token = "ad384bdf2ba69258da94fa40451d6558"
const UserID = "5766";
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
    getDataFromSizarPayClientApi
}
