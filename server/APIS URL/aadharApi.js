const axios = require("axios");
const https = require("https");

const fetchAadharFromEid = async (api_key, eid_no) => {
  const url = `https://alpha-api.co.in/apiservice/generated_eid/eid_to_aadhar.php?api_key=${api_key}&eid=${eid_no}`;

  try {
    const response = await axios.get(url, {
      headers: { "cache-control": "no-cache" },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }), // ignore SSL issues
    });

    const data = response.data;

    // Handle error string response
    if (typeof data === "string" && data.includes("balance")) {
      return { error: "API balance is low" };
    }

    // Handle proper error object response
    if (data.statusCode === 100) {
      return { error: data.resMessage || "Invalid EID" };
    }

    // Success
    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { fetchAadharFromEid };
