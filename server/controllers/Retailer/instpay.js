const { getDataFromClientApi } = require("../../APIS URL/instpayApis");
const { db } = require("../../connect");
const moment = require("moment-timezone");

const getBalance = (req, res) => {
  const token = process.env.APITokenInstapay; // or fetch it dynamically
  const username = process.env.APIUsernameInstapay; // or fetch from request, etc.

  getDataFromClientApi("/v3/recharge/balance", token, username, {
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res
        .status(500)
        .send("Error fetching data from client API", error.message);
    });
};

const panVerification = async (req, res) => {
  const token = process.env.APITokenInstapay; // or fetch it dynamically
  const username = process.env.APIUsernameInstapay; // or fetch from request, etc.

  const { number, orderid } = req.query;

  if (!number || !orderid) {
    return res.status(400).json({ error: "Number & Order ID are Required" });
  }

  getDataFromClientApi("/v3/verification/pan_verification", token, username, {
    number: number,
    orderid: orderid,
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

// const panVerification = async (req, res) => {
//   try {
//     const token = process.env.APITokenInstapay; // or fetch it dynamically
//     const username = process.env.APIUsernameInstapay; // or fetch from request, etc.

//     const data = await getDataFromClientApi(
//       "/v3/verification/pan_verification",
//       token,
//       username,
//       { number: "FTIPS5510K", orderid: "123456", format: "json" }
//     );
//     res.json(data);
//   } catch (error) {
//     res.status(500).send("Error fetching data from client API");
//   }
// };

const gstVerification = async (req, res) => {
  const token = process.env.APITokenInstapay; // or fetch it dynamically
  const username = process.env.APIUsernameInstapay; // or fetch from request, etc.

  getDataFromClientApi("/v3/verification/gst_verification", token, username, {
    number: "23AGLPP2890G1Z7",
    orderid: "654123",
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

const adharVerification = async (req, res) => {
  const token = process.env.APITokenInstapay; // or fetch it dynamically
  const username = process.env.APIUsernameInstapay; // or fetch from request, etc.

  getDataFromClientApi("/v3/verification/get_aadhaar_otp", token, username, {
    number: "",
    orderid: "",
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

const adharotpVerification = async (req, res) => {
  const token = process.env.APITokenInstapay; // or fetch it dynamically
  const username = process.env.APIUsernameInstapay; // or fetch from request, etc.

  getDataFromClientApi("/v3/verification/aadhaar_verify", token, username, {
    number: "",
    otp: "",
    ref_id: "",
    orderid: "",
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

module.exports = {
  getBalance,
  panVerification,
  gstVerification,
  adharVerification,
  adharotpVerification,
};
