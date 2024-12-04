const fetch = require("node-fetch");
const FormData = require("form-data");
const { db } = require("../../connect");
const moment = require("moment-timezone");
const createOrderInstance = require("./orderController");
// PAYMENT - 1
// const createOrder = async (req, res) => {
//   const { customer_mobile, amount, redirect_url, remark1, remark2 } = req.body;

//   //   console.log(req.body);
//   const order_id = `OR${Date.now()}`;
//   const user_token = process.env.PAYMENT_TOKEN;
//   const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//   try {
//     const sql = `
//         INSERT INTO orders (customer_mobile, amount, order_id, remark1, remark2, status, created_at)
//         VALUES (?, ?, ?, ?, ?, ?, ?)`;

//     const values = [
//       customer_mobile,
//       amount,
//       order_id,
//       remark1,
//       remark2,
//       "PENDING",
//       createdAt,
//     ];

//     db.query(sql, values, async (err, result) => {
//       if (err) {
//         console.error("Error saving order to database:", err.message);
//         return res.status(500).json({
//           status: false,
//           message: "Error saving order to database",
//           Error: err,
//         });
//       }

//       console.log(`Order saved with ID: ${result.insertId}`);

//       try {
//         const order = await createOrderInstance.createOrder(
//           customer_mobile,
//           user_token,
//           amount,
//           order_id,
//           redirect_url,
//           remark1,
//           remark2
//         );

//         return res.status(200).json({
//           status: true,
//           message: "Order created successfully!",
//           data: order,
//           dbId: result.insertId,
//         });
//       } catch (apiError) {
//         console.error("Error in external API call:", apiError.message);

//         db.query(
//           "DELETE FROM orders WHERE id = ?",
//           [result.insertId],
//           (deleteErr) => {
//             if (deleteErr) {
//               console.error(
//                 "Error deleting order from database:",
//                 deleteErr.message
//               );
//             }
//           }
//         );

//         return res.status(500).json({
//           status: false,
//           message: "Error in external API call",
//         });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ status: false, message: error.message });
//   }
// };

const createOrder = async (req, res) => {
  const { customer_mobile, amount, redirect_url, remark1, remark2 } = req.body;
  const order_id = `OR${Date.now()}`; // Dynamic order ID based on timestamp
  const user_token = process.env.PAYMENT_TOKEN; // Security token from environment
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const sql = `
    INSERT INTO orders (customer_mobile, amount, order_id, remark1, remark2, status, created_at)
    VALUES (?, ?, ?, ?, ?, 'PENDING', ?)`;

  const values = [
    customer_mobile,
    amount,
    order_id,
    remark1,
    remark2,
    createdAt,
  ];

  try {
    const result = await db.query(sql, values);
    try {
      const order = await createOrderInstance.createOrder(
        customer_mobile,
        user_token,
        amount,
        order_id,
        redirect_url,
        remark1,
        remark2
      );
      res.status(200).json({
        status: true,
        message: "Order created successfully!",
        data: order,
        dbId: result.insertId,
      });
    } catch (apiError) {
      console.error("Error in external API call:", apiError.message);
      await db.query("DELETE FROM orders WHERE id = ?", [result.insertId]);
      res.status(500).json({
        status: false,
        message: "Error in external API call",
        error: apiError.message,
      });
    }
  } catch (dbError) {
    console.error("Error saving order to database:", dbError.message);
    res.status(500).json({
      status: false,
      message: "Error saving order to database",
      error: dbError.message,
    });
  }
};

const checkOrderStatus = async (req, res) => {
  const { order_id } = req.body;

  const user_token = process.env.PAYMENT_TOKEN;

  if (!user_token || !order_id) {
    return res.status(400).json({
      status: false,
      message: "Missing user_token or order_id",
    });
  }

  try {
    // Formulate the request to the external API
    const apiUrl = process.env.PAYMENT_CHECK_STATUS_LINK;
    const formData = new FormData();
    formData.append("user_token", user_token);
    formData.append("order_id", order_id);

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    // Handle the response
    if (response.ok && data.status) {
      return res.status(200).json({
        status: true,
        message: "Order status retrieved successfully",
        data: data.result,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: data.message || "Failed to retrieve order status",
      });
    }
  } catch (error) {
    console.error("Error checking order status:", error.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

const webhook = (req, res) => {
  const { status, order_id, remark1 } = req.body;

  console.log(
    `Received request with status: ${status}, order_id: ${order_id}, remark1: ${remark1}`
  );

  if (status === "SUCCESS") {
    console.log(`Order ID: ${order_id}, Remark1: ${remark1}`);

    const updateSql = `
            UPDATE orders
            SET status = ?, remark1 = ?
            WHERE order_id = ?`;

    const values = [status, remark1, order_id];

    db.query(updateSql, values, (updateErr, result) => {
      if (updateErr) {
        console.error("Error updating order in database:", updateErr.message);
        return res.status(500).json({
          status: false,
          message: "Error updating order in database",
        });
      }

      console.log(`Rows affected: ${result.affectedRows}`);

      if (result.affectedRows === 0) {
        console.error("Order not found for update");
        return res.status(404).json({
          status: false,
          message: "Order not found for the given order ID",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Order updated successfully",
      });
    });
  } else {
    console.log(`Invalid status for Order ID: ${order_id}`);
    return res.status(400).send("Invalid status");
  }
};

// const addWallet = (req, res) =>{
//   const { customer_mobile, amount, redirect_url, remark1, remark2, pay_method, user_id, status } = req.body;

//     //   console.log(req.body);
//     const order_id = `WAOR${Date.now()}`;
//     const user_token = process.env.PAYMENT_TOKEN;
//     const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

//     try {
//       const sql = `
//           INSERT INTO orders (customer_mobile, amount, order_id, remark1, remark2, pay_method, user_id, status, created_at)
//           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//       const values = [
//         customer_mobile,
//         amount,
//         order_id,
//         remark1,
//         remark2,
//         pay_method,
//         user_id,
//         status,
//         createdAt,
//       ];

//       db.query(sql, values, async (err, result) => {
//         if (err) {
//           console.error("Error saving order to database:", err.message);
//           return res.status(500).json({
//             status: false,
//             message: "Error saving order to database",
//             Error: err,
//           });
//         }

//         console.log(`Order saved with ID: ${result.insertId}`);

//         try {
//           const order = await createOrderInstance.createOrder(
//             customer_mobile,
//             user_token,
//             amount,
//             order_id,
//             redirect_url,
//             remark1,
//             remark2
//           );

//           return res.status(200).json({
//             status: true,
//             message: "Order created successfully!",
//             data: order,
//             dbId: result.insertId,
//           });
//         } catch (apiError) {
//           console.error("Error in external API call:", apiError.message);

//           db.query(
//             "DELETE FROM orders WHERE id = ?",
//             [result.insertId],
//             (deleteErr) => {
//               if (deleteErr) {
//                 console.error(
//                   "Error deleting order from database:",
//                   deleteErr.message
//                 );
//               }
//             }
//           );

//           return res.status(500).json({
//             status: false,
//             message: "Error in external API call",
//           });
//         }
//       });
//     } catch (error) {
//       res.status(500).json({ status: false, message: error.message });
//     }
// }

const addWallet = async (req, res) => {
  const {
    customer_mobile,
    amount,
    redirect_url,
    remark1,
    remark2,
    pay_method,
    user_id,
    status,
  } = req.body;

  const order_id = `WAOR${Date.now()}`;
  const user_token = process.env.PAYMENT_TOKEN;
  const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

  const sql = `
    INSERT INTO orders (customer_mobile, amount, order_id, remark1, remark2, pay_method, user_id, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    customer_mobile,
    amount,
    order_id,
    remark1,
    remark2,
    pay_method,
    user_id,
    status,
    createdAt,
  ];

  try {
    const result = await queryDatabase(sql, values);
    console.log(`Order saved with ID: ${result.insertId}`);

    try {
      const order = await createOrderInstance.createOrder(
        customer_mobile,
        user_token,
        amount,
        order_id,
        redirect_url,
        remark1,
        remark2
      );

      return res.status(200).json({
        status: true,
        message: "Order created successfully!",
        data: order,
        dbId: result.insertId,
      });
    } catch (apiError) {
      console.error("Error in external API call:", apiError.message);
      await queryDatabase("DELETE FROM orders WHERE id = ?", [result.insertId]);

      return res.status(500).json({
        status: false,
        message: "Error in external API call",
      });
    }
  } catch (dbError) {
    console.error("Error saving order to database:", dbError.message);
    return res.status(500).json({
      status: false,
      message: "Error saving order to database",
    });
  }
}; // This Api is not used yet. Due to Webhook Response. but API Is fine/Work.

module.exports = { createOrder, checkOrderStatus, webhook };
