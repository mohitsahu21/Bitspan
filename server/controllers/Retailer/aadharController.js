const { fetchAadharFromEid } = require("../../APIS URL/aadharApi");

const getAadharData = async (req, res) => {
  const { eid_no, api_key } = req.body;

  if (!eid_no || !api_key) {
    return res.status(400).json({ error: "eid_no and api_key are required" });
  }

  const result = await fetchAadharFromEid(api_key, eid_no);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  return res.status(200).json({ data: result.data });
};

module.exports = { getAadharData };
