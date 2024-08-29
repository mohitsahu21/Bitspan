const axios = require("axios");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();

const inspayBaseURL = process.env.INSTPAY;

const apiClient = axios.create({
  baseURL: `${inspayBaseURL}`,
});

// const getDataFromClientApi = async (endpoint, token, userId, params = {}) => {
//   try {
//     const response = await apiClient.get(endpoint, {
//       params: {
//         ...params,
//         token: token, // API token as a query parameter
//         username: userId, // User ID as a query parameter
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data from client API:", error.message);
//     throw error;
//   }
// };

const getDataFromClientApi = (endpoint, token, userId, params = {}) => {
  
  return apiClient.get(endpoint, {
      params: {
        ...params,
        token: token, // API token as a query parameter
        username: userId, // User ID as a query parameter
      },
    }).then(response => {
     return response.data
    }).catch (error => {
    console.error("Error fetching data from client API:", error.message);
    throw error;
  })
};



module.exports = {
  getDataFromClientApi,
};

// const axios = require("axios");
// const dotenv = require("dotenv");
// dotenv.config();

// const inspayBaseURL = process.env.INSTPAY;

// const apiClient = axios.create({
//   baseURL: `${inspayBaseURL}`,
// });

// const getDataFromClientApi = (
//   endpoint,
//   token,
//   userId,
//   additionalParams = {}
// ) => {
//   // Manually construct the params object
//   const queryParams = {
//     token: token,
//     username: userId,
//   };

//   for (let key in additionalParams) {
//     if (additionalParams.hasOwnProperty(key)) {
//       queryParams[key] = additionalParams[key];
//     }
//   }

//   return apiClient
//     .get(endpoint, { params: queryParams })
//     .then((response) => response.data)
//     .catch((error) => {
//       console.error("Error fetching data from client API:", error.message);
//       throw error;
//     });
// };

// module.exports = {
//   getDataFromClientApi,
// };
