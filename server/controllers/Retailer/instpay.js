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
  const username = process.env.APIUsernameInstapay;

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

const bankverification = async (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;
  const { ifsc, number, orderid } = req.query;
  if (!ifsc || !number || !orderid) {
    return res
      .status(400)
      .json({ error: "IFSC, Number, OrderID are Required" });
  }
  getDataFromClientApi("/v3/bank_verification/api", token, username, {
    ifsc: ifsc,
    number: number,
    orderid: orderid,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

const getDthPlan = async (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;
  // Call the client API with the dynamic values
  getDataFromClientApi("/v3/dth_connection/get_plan", token, username, {
    opcode: "TPC",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

const applyDth = async (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;

  const {
    opcode,
    number,
    amount,
    plan_id,
    first_name,
    last_name,
    full_address,
    postal_code,
    orderid,
  } = req.body;

  // Check if all required parameters are provided
  if (
    !opcode ||
    !number ||
    !amount ||
    !plan_id ||
    !first_name ||
    !last_name ||
    !full_address ||
    !postal_code ||
    !orderid
  ) {
    return res.status(400).json({ error: "All parameters are required" });
  }

  getDataFromClientApi("/v3/dth_connection/api", token, username, {
    opcode: opcode,
    number: number,
    amount: amount,
    plan_id: plan_id,
    first_name: first_name,
    last_name: last_name,
    full_address: full_address,
    postal_code: postal_code,
    orderid: orderid,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error applying DTH connection");
    });
};

const billfetch = (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;

  const { number, opcode } = req.body;

  if (!number || !opcode) {
    return res.status(400).json({ error: "Number and Opcode are required" });
  }

  getDataFromClientApi("/plan_api/bill_fetch", username, token, {
    number: number,
    opcode: opcode,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching bill");
    });
};

const rechargeApi = (req, res) => {
  const token = process.env.APITokenInstapay;
  const username = process.env.APIUsernameInstapay;

  const { opcode, number, amount, orderid } = req.body;

  if (!number || !opcode || !amount || !orderid) {
    return res.status(400).json({ error: "All are required" });
  }

  getDataFromClientApi("/v3/recharge/api", username, token, {
    opcode: opcode,
    number: number,
    amount: amount,
    orderid: orderid,
    format: "json",
  })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error in recharge");
    });
};

module.exports = {
  getBalance,
  panVerification,
  gstVerification,
  adharVerification,
  adharotpVerification,
  bankverification,
  getDthPlan,
  applyDth,
  billfetch,
  rechargeApi,
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
