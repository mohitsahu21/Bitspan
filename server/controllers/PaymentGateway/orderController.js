const fetch = require("node-fetch");

class CreateOrderAPI {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async createOrder(
    customerMobile,
    userToken,
    amount,
    orderId,
    redirectUrl,
    remark1,
    remark2
  ) {
    const payload = new URLSearchParams();
    payload.append("customer_mobile", customerMobile);
    payload.append("user_token", userToken);
    payload.append("amount", amount);
    payload.append("order_id", orderId);
    payload.append("redirect_url", redirectUrl);
    payload.append("remark1", remark1);
    payload.append("remark2", remark2);

    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    });

    console.log(response);
    // console.log(payload);

    const text = await response.text();

    console.log(text);

    // Check for an empty response
    if (!text || response.headers.get("content-length") === "0") {
      console.warn(
        "API returned an empty response. Proceeding with default values..."
      );
      return { status: false, message: "Empty response from API" }; // Adjust as needed
    }

    try {
      // Attempt to parse the JSON
      const data = JSON.parse(text);

      // Check for a successful response
      if (response.ok && data.status === true) {
        return data;
      } else {
        // API returned a JSON response with an error message
        throw new Error(data.message || "Unknown error from API");
      }
    } catch (error) {
      // Handle JSON parsing errors
      console.error("Error parsing JSON:", text);
      throw new Error("Invalid JSON response");
    }
  }
}

const createOrderInstance = new CreateOrderAPI(process.env.PAYMENT_API_LINK);

module.exports = createOrderInstance;

//   "https://upi.wf/api/create-order"
