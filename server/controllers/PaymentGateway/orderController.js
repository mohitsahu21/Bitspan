const fetch = require("node-fetch");

// class CreateOrderAPI {
//   constructor(apiUrl) {
//     this.apiUrl = apiUrl;
//   }

//   async createOrder(
//     customerMobile,
//     userToken,
//     amount,
//     orderId,
//     redirectUrl,
//     remark1,
//     remark2
//   ) {
//     const payload = new URLSearchParams();
//     payload.append("customer_mobile", customerMobile);
//     payload.append("user_token", userToken);
//     payload.append("amount", amount);
//     payload.append("order_id", orderId);
//     payload.append("redirect_url", redirectUrl);
//     payload.append("remark1", remark1);
//     payload.append("remark2", remark2);

//     const response = await fetch(this.apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: payload,
//     });

//     console.log(response);
//     // console.log(payload);

//     const text = await response.text();

//     console.log(text);

//     if (!text || response.headers.get("content-length") === "0") {
//       console.warn(
//         "API returned an empty response. Proceeding with default values..."
//       );
//       return { status: false, message: "Empty response from API" }; // Adjust as needed
//     }

//     try {
//       const data = JSON.parse(text);

//       if (response.ok && data.status === true) {
//         return data;
//       } else {
//         throw new Error(data.message || "Unknown error from API");
//       }
//     } catch (error) {
//       console.error("Error parsing JSON:", text);
//       throw new Error("Invalid JSON response");
//     }
//   }
// }

// const createOrderInstance = new CreateOrderAPI(process.env.PAYMENT_API_LINK);

// module.exports = createOrderInstance;

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
    const payload = new URLSearchParams({
      customer_mobile: customerMobile,
      user_token: userToken,
      amount: amount,
      order_id: orderId,
      redirect_url: redirectUrl,
      remark1: remark1,
      remark2: remark2,
    });

    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload,
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status) {
        return data;
      } else {
        throw new Error(data.message || "API returned unsuccessful status");
      }
    } catch (error) {
      console.error("Error creating order:", error.message);
      throw error; // Rethrowing the error to handle it in the caller function
    }
  }
}

module.exports = new CreateOrderAPI(process.env.PAYMENT_API_LINK);

