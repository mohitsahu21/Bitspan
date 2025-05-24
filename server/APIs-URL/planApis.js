const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const planApiBaseURL = process.env.PLAN_API_BASE_URL;

const apiClient = axios.create({
  baseURL: planApiBaseURL, // Use the base URL from .env
});

/**
 * Generic method to fetch data from the Plan API
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {Promise<object>} - API response
 */
const fetchFromPlanApi = (endpoint, params = {}) => {
  return apiClient
    .get(endpoint, { params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data from Plan API:", error.message);
      throw error;
    });
};

module.exports = {
  fetchFromPlanApi,
};
