const { fetchFromPlanApi } = require("../../APIS URL/planApis");

/**
 * Controller to handle Operator & Circle Check Request
 */
const getOperatorAndCircle = (req, res) => {
  const { mobileNumber } = req.query;

  if (!mobileNumber) {
    return res.status(400).json({ error: "Mobile number is required" });
  }

  // Fetch credentials from environment variables
  const apiUserId = process.env.PLAN_API_USER_ID;
  const apiPassword = process.env.PLAN_API_PASSWORD;

  // Define query parameters
  const params = {
    ApiUserID: apiUserId,
    ApiPassword: apiPassword,
    Mobileno: mobileNumber,
  };

  const endpoint = "/OperatorFetchNew";

  // Call the utility function to fetch data
  fetchFromPlanApi(endpoint, params) // Pass the endpoint and params
    .then((data) => {
      res.json(data); // Send the response back to the client
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch operator and circle" });
    });
};

const getMobilePlans = (req, res) => {
  const { operatorCode, circleCode } = req.query;

  if (!operatorCode || !circleCode) {
    return res
      .status(400)
      .json({ error: "Operator code and circle code are required" });
  }

  // Fetch credentials from environment variables
  const apiUserId = process.env.PLAN_API_USER_ID;
  const apiPassword = process.env.PLAN_API_PASSWORD;

  // Define query parameters
  const params = {
    apimember_id: apiUserId,
    api_password: apiPassword,
    operatorcode: operatorCode,
    cricle: circleCode,
  };

  const endpoint = "/NewMobilePlans";

  console.log("Endpoint:", endpoint);
  console.log("Params:", params);

  fetchFromPlanApi(endpoint, params)
    .then((data) => res.json(data))
    .catch((error) =>
      res.status(500).json({ error: "Failed to fetch mobile plans" })
    );
};

const getBillInfo = (req, res) => {
  const { accountNo, operatorCode, optional1, optional2, optional3 } =
    req.query;

  // Validate required fields
  if (!accountNo || !operatorCode) {
    return res
      .status(400)
      .json({ error: "Account number and operator code are required" });
  }

  // Fetch credentials from environment variables
  const apiUserId = process.env.PLAN_API_USER_ID;
  const apiPassword = process.env.PLAN_API_PASSWORD;

  // Define query parameters
  const params = {
    apimember_id: apiUserId,
    api_password: apiPassword,
    Accountno: accountNo,
    operator_code: operatorCode,
    Optional1: optional1 || "",
    Optional2: optional2 || "",
    Optional3: optional3 || "",
  };

  const endpoint = "/BillCheck";

  // Call the utility function to fetch data
  fetchFromPlanApi(endpoint, params)
    .then((data) => res.json(data))
    .catch((error) =>
      res
        .status(500)
        .json({ error: "Failed to fetch bill info", details: error.message })
    );
};

module.exports = {
  getOperatorAndCircle,
  getMobilePlans,
  getBillInfo,
};
