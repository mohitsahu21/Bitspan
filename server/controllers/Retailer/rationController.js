const { verifyRationCard } = require("../../APIs-URL/rationApi");

const rationVerification = async (req, res) => {
  const orderId = `ORD${Date.now()}`; // Generate unique order ID
  const apiidkey =
    "ezdc70c82a9cb2a6cab0fa9154486d7de8dc0e871ea9b2d904d916a1ac498f9306ytm";

  const { rcno } = req.body; // Only expecting rcno from frontend

  if (!rcno) {
    return res
      .status(400)
      .json({ status: "Failure", error: "rcno is required." });
  }

  try {
    const result = await verifyRationCard(apiidkey, orderId, rcno);
    res.status(200).json({ status: "Success", result: result });
  } catch (error) {
    res.status(500).json({ status: "Failure", error: error.message });
  }
};

module.exports = {
  rationVerification,
};
