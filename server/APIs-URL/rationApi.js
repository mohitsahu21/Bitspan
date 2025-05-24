const axios = require("axios");
const qs = require("qs");

const verifyRationCard = async (apiKey, order_id, rcno) => {
  const data = qs.stringify({ apiKey, order_id, rcno });

  try {
    const response = await axios.post(
      "https://api.chack.co.in/serviceApi/V1/RashanVerification",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to verify ration card: " + error.message);
  }
};

module.exports = {
  verifyRationCard,
};
