const { fetchVoterData } = require("../../APIS URL/voterApis");

const VoterData = async (req, res) => {
  const { epicno, api_key } = req.body;

  if (!epicno || !api_key) {
    return res.status(400).json({ error: "epicno and api_key are required" });
  }

  const result = await fetchVoterData(api_key, epicno);

  if (result.error) {
    return res.status(500).json({ error: result.error });
  }

  return res.status(200).json({ data: result.data });
};

module.exports = { VoterData };
