const axios = require("axios");
const https = require("https");

const fetchVoterData = async (api_key, epicno) => {
  const url = `https://alpha-api.co.in/apiservice/votardata/api.php?api_key=${api_key}&epicno=${epicno}`;

  try {
    const response = await axios.get(url, {
      headers: { "cache-control": "no-cache" },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Like CURLOPT_SSL_VERIFYPEER = false
    });

    if (typeof response.data === "string" && response.data === "Not Allowed") {
      return { error: "API access not allowed" };
    }

    return { data: response.data };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = { fetchVoterData };
