// services/panaadharApi.js
const axios = require("axios");

const findPanByAadhaar = async (apiKey, aadhaarNo) => {
  try {
    const response = await axios.get(
      "https://www.apizone.info/api/find_pan/aadhaar_to_pan.php",
      {
        params: {
          api_key: apiKey,
          aadhaar_no: aadhaarNo,
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle error and return meaningful message
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "500", message: "Internal Server Error" };
    }
  }
};

const findPanDetails = async (apiKey, panno) => {
  try {
    const response = await axios.get(
      "https://www.apizone.info/api/pan_details/pan.php",
      {
        params: {
          api_key: apiKey,
          panno: panno,
        },
      }
    );

    return response.data;
  } catch (error) {
    // Handle error and return meaningful message
    if (error.response) {
      return error.response.data;
    } else {
      return { status: "500", message: "Internal Server Error" };
    }
  }
};

const getRcPdfData = async (apiKey, rcno, cardtype = "", chiptype = "") => {
  const baseURL = "https://www.apizone.info/api/rc_pdf/rc.php";

  try {
    const response = await axios.get(baseURL, {
      params: {
        api_key: apiKey,
        rcno,
        cardtype,
        chiptype,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching RC PDF:", error.message);
    throw error;
  }
};

module.exports = { findPanByAadhaar, findPanDetails, getRcPdfData };
