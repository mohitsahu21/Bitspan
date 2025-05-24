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

const getDlPrint = async (apiKey, dlno, dob, cardtype = 1) => {
  const url = `https://www.apizone.in/api/dl_pdf/dlprint.php`;

  try {
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
        dlno,
        dob,
        cardtype,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching DL Print:", error.message);
    return { status: 500, message: "API Error" };
  }
};

const verifyVoterCard = async (epic_number, orderid) => {
  const username = "9926054551";
  const token = "da1a29b74e50cbfbf3f357beb52d6b32";
  const url = `https://connect.ekychub.in/v3/verification/voter?username=${username}&token=${token}&epic_number=${epic_number}&orderid=${orderid}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || "API Error");
  }
};

const verifyPassport = async (file_number, dob, orderid) => {
  const username = "9926054551";
  const token = "da1a29b74e50cbfbf3f357beb52d6b32";

  const url = `https://connect.ekychub.in/v3/verification/passport?username=${username}&token=${token}&file_number=${file_number}&dob=${dob}&orderid=${orderid}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw new Error("API call failed: " + err.message);
  }
};

// AADHAAR VERIFICATION SEND OTP && GET OTP API

const BASE_URL = "https://connect.ekychub.in/v3/verification";

const EKYCHUB_USERNAME = "9926054551";
const EKYCHUB_TOKEN = "da1a29b74e50cbfbf3f357beb52d6b32";

const getAadhaarOtp = async (aadhaarNumber, orderId) => {
  const url = `${BASE_URL}/get_aadhaar_otp?username=${EKYCHUB_USERNAME}&token=${EKYCHUB_TOKEN}&aadhaar_number=${aadhaarNumber}&orderid=${orderId}`;
  return axios.get(url);
};

const verifyAadhaarOtp = async (aadhaarNumber, refId, otp, orderId) => {
  const url = `${BASE_URL}/aadhaar_verify?username=${EKYCHUB_USERNAME}&token=${EKYCHUB_TOKEN}&aadhaar_number=${aadhaarNumber}&ref_id=${refId}&otp=${otp}&orderid=${orderId}`;
  return axios.get(url);
};

const verifyVehicleRC = async (vehicle_number, orderid) => {
  const url = `https://connect.ekychub.in/v3/verification/vehicle_rc?username=${EKYCHUB_USERNAME}&token=${EKYCHUB_TOKEN}&vehicle_number=${vehicle_number}&orderid=${orderid}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return {
      status: "Error",
      message:
        error.message || "Something went wrong while verifying vehicle RC",
    };
  }
};

const verifyDrivingLicense = async (dl_numner, dob, orderid) => {
  const url = `https://connect.ekychub.in/v3/verification/driving?username=${EKYCHUB_USERNAME}&token=${EKYCHUB_TOKEN}&dl_numner=${dl_numner}&dob=${dob}&orderid=${orderid}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return {
      status: "Error",
      message:
        error.message || "Something went wrong while verifying Driving Licence",
    };
  }
};

const verifyGST = async (gstNumber, orderId) => {
  const username = "9926054551";
  const token = "da1a29b74e50cbfbf3f357beb52d6b32";

  const url = `https://connect.ekychub.in/v3/verification/gst_verification?username=${username}&token=${token}&gst=${gstNumber}&orderid=${orderId}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return { status: "Failure", message: error.message };
  }
};

module.exports = { findPanByAadhaar, findPanDetails, getRcPdfData, getDlPrint, verifyVoterCard, verifyPassport, getAadhaarOtp, verifyAadhaarOtp, verifyVehicleRC, verifyDrivingLicense, verifyGST };
