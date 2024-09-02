const { getDataFromEzytmClientApi } = require("../../APIS URL/ezytmApis");

const getBalanceEzytm = (req, res) => {
  const endpoint = "/Balance";

  getDataFromEzytmClientApi(endpoint)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Error fetching data from client API");
    });
};

module.exports = {
  getBalanceEzytm,
};

//   apiClient.get(endpoint, {
//     params: { at: apiToken },
//   })
//   .then(response => {
//     // Send the API response to the client
//     res.status(200).json(response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching data from client API:', error.message);

//     // Send error response to the client
//     res.status(error.response?.status || 500).json({
//       status: 'error',
//       message: error.message,
//       data: error.response?.data || null,
//     });
//   });
