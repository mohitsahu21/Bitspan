const moment = require("moment-timezone");
const { db } = require("../../connect");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const webhook = (req, res) => {
    // const { status, order_id, remark1 } = req.body;
    const order_id = req.query.order_id;
  
  
    // console.log(
    //   `Received request with status: ${status}, order_id: ${order_id}, remark1: ${remark1}`
    // );
  
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
  
  // const webhook_two = async (req, res) => {
  // const clientTxnId = req.query.order_id;
  // const website = req.query.website;
  // console.log(clientTxnId)
  //   const key = '4654407eb1b965763bcfcb9ae8cc87ec';
    
  //   try {
  //     const [dbData] = await new Promise((resolve, reject) => {
  //       db.query('SELECT * FROM orders WHERE order_id = ?', [clientTxnId], (err, results) => {
  //         if (err) reject(err);
  //         resolve(results);
  //       });
  //     });
  
  //     if (!dbData) {
  //       return res.status(404).send('Transaction not found.');
  //     }
  
  //     // const postData = { user_token: key, order_id: dbData.order_id };
  //     const postData = new URLSearchParams({ user_token: key, order_id: dbData.order_id });
  
  //     const response = await axios.post('https://upi.wf/api/check-order-status', postData.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  //     console.log(response)
  //     if (response.data.status === 'Success') {
  //       const txnStatus = response.data.result.txnStatus;
  //       const amount = response.data.result.amount;
  
  //       if (dbData.status === 'Pending') {
  //         await new Promise((resolve, reject) => {
  //           db.query('UPDATE orders SET status = ? WHERE order_id = ?', ['Success', clientTxnId], (err) => {
  //             if (err) reject(err);
  //             resolve();
  //           });
  //         });
  
  //         return res.send('<script>alert(\'Recharge Successful\'); window.location.replace(\'https://bitspan.vimubds5.a2hosted.com\');</script>');
  //       } else {
  //         return res.send('<script>alert(\'Already Added Balance\'); window.location.replace(\'https://bitspan.vimubds5.a2hosted.com\');</script>');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     res.status(500).send('Internal Server Error.');
  //   }
  // };
  const webhook_two = async (req, res) => {
  const clientTxnId = req.query.order_id;
  const website = req.query.website;
  console.log(clientTxnId)
    const key = '4654407eb1b965763bcfcb9ae8cc87ec';
    
    try {
      const [dbData] = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM orders WHERE order_id = ?', [clientTxnId], (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
  
      if (!dbData) {
        return res.status(404).send('Transaction not found.');
      }
  
      // const postData = { user_token: key, order_id: dbData.order_id };
      const postData = new URLSearchParams({ user_token: key, order_id: dbData.order_id });
  
      const response = await axios.post('https://upi.wf/api/check-order-status', postData.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      console.log(response)
      if (response.data.status === 'Success') {
        const txnStatus = response.data.result.txnStatus;
        const amount = response.data.result.amount;
  
        if (dbData.status === 'Pending') {
          await new Promise((resolve, reject) => {
            db.query('UPDATE orders SET status = ? WHERE order_id = ?', ['Success', clientTxnId], (err) => {
              if (err) reject(err);
              resolve();
            });
          });
  
          return res.send(`<script>alert(\'Payment Successful\'); window.location.replace('${website}');</script>`);
        } else {
          return res.send(`<script>alert(\'Transaction Failed\'); window.location.replace('${website}');</script>`);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error.');
    }
  };
  
  const createOrder = async (req, res) => {
    const { customer_mobile, amount, remark1, remark2 } = req.body;
    const order_id = `OR${Date.now()}`; // Dynamic order ID based on timestamp
    const user_token = "4654407eb1b965763bcfcb9ae8cc87ec"; // Security token from environment
    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const redirect_url = `https://bitspan.vimubds5.a2hosted.com/api/auth/superAdmin/webhooktwo?order_id=${order_id}&website=${remark1}`
    const status = "Pending"
  
    const sql = `
      INSERT INTO orders (customer_mobile, amount, order_id, remark1, remark2, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
  
    const values = [
      customer_mobile,
      amount,
      order_id,
      remark1,
      remark2,
      status,
      createdAt,
    ];
  
    try {
      db.query(sql, values, (Error, Results)=>{
        if (Error) {
          console.error('Error:', Error);
          return res.status(500).json({success: false, message: "Failed to create order" });
        }
        else {
          console.log('Order created successfully:', Results);
        }
      });
     
      try {
        const postData = { customer_mobile,
          user_token,
          amount,
          order_id,
          redirect_url};
        const response = await axios.post('https://upi.wf/api/create-order',
          postData
        );
        console.log(response);
        if(response.data && response.data.status === "Success"){
          // return data;
          res.status(200).json({
            status: true,
            message: "Order created successfully!",
            data: response.data,
            
          });
        } else {
            throw new Error(response.data.message || 'Unknown error');
        }
        
        
      } catch (apiError) {
        console.error("Error in external API call:", apiError.message);
       
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
  
  const createOrderToAddWalletMoney = async (req, res) => {
  
    const {
      user_id,
      amount,
      userName,
      userPhone,
      userEmail,
      userRole,
      Payment_Mode,
      website
    } = req.body;
    console.log( user_id,
      amount,
      userName,
      userPhone,
      userEmail,
      userRole,
      Payment_Mode,
      website)
    // const { customer_mobile, amount, remark1, remark2 } = req.body;
    const order_id = `WOR${Date.now()}`; // Dynamic order ID based on timestamp
    const Transaction_Reference = `Pay Online Payment Gateway Order ID ${order_id}`
    const user_token = process.env.UPIWF_KEY // Security token from environment
    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const redirect_url = `https://bitspan.vimubds5.a2hosted.com/api/auth/upiwf/addWalletMoneyUsingPG?order_id=${order_id}&website=${website}`
    const status = "Pending"
  
    // const sql = `
    //   INSERT INTO orders (customer_mobile, amount, order_id, remark1, remark2, status, created_at)
    //   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const sql = `INSERT INTO user_wallet_add_money_request (order_id, user_id, amount, userName, userPhone, userEmail, userRole, Payment_Mode, Transaction_Reference, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    const values = [
      order_id,
      user_id,
      amount,
      userName,
      userPhone,
      userEmail,
      userRole,
      Payment_Mode,
      Transaction_Reference,
      status,
      createdAt,
    ];
  
    try {
      db.query(sql, values, (Error, Results)=>{
        if (Error) {
          console.error('Error:', Error);
          return res.status(500).json({success: false, message: "Failed to create order" });
        }
        else {
          console.log('Order created successfully:', Results);
        }
      });
     
      try {
        const postData = { customer_mobile : userPhone,
          user_token,
          amount,
          order_id,
          redirect_url};
        const response = await axios.post('https://upi.wf/api/create-order',
          postData
        );
        console.log(response);
        if(response.data && response.data.status === "Success"){
          // return data;
          res.status(200).json({
            status: true,
            message: "Order created successfully!",
            data: response.data,
            
          });
        } else {
            throw new Error(response.data.message || 'Unknown error');
        }
        
        
      } catch (apiError) {
        console.error("Error in external API call:", apiError.message);
       
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
  
  const addWalletMoneyUsingPG = async (req, res) => {
    const clientTxnId = req.query.order_id;
    const website = req.query.website;
    const key = process.env.UPIWF_KEY;
  
    try {
      // Fetch transaction details from the database
      const [dbData] = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM user_wallet_add_money_request WHERE order_id = ?', [clientTxnId], (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
  
      if (!dbData) {
        return res.status(404).send('Transaction not found.');
      }
  
      // Check the order status from the external API
      const postData = new URLSearchParams({ user_token: key, order_id: dbData.order_id });
      const response = await axios.post('https://upi.wf/api/check-order-status', postData.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
  
      if (response.data.status === 'Success') {
        const txnStatus = response.data.result.txnStatus;
        const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
        const amount = parseFloat(response.data.result.amount).toFixed(2); // Ensure amount is a valid number
        const utr = response.data.result.utr;
       
        if (dbData.status === 'Pending') {
          // Update the order status to 'Success'
          await new Promise((resolve, reject) => {
            db.query('UPDATE user_wallet_add_money_request SET status = ? , pg_Txn_Id = ? , process_date = ? WHERE order_id = ?', ['Success',utr,createdAt, clientTxnId], (err) => {
              if (err) reject(err);
              resolve();
            });
          });
  
          // Add wallet money logic
          const userId = dbData.user_id; // Assuming `user_id` is part of the `orders` table
          const Transaction_details = `Add Wallet Money via Online Order Id ${dbData.order_id}`; // Customize as needed
          const status = 'Success';
          const Transaction_Type = 'Credit';
          const transaction_date = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
          const Order_Id = `ORW${Date.now()}`;
          const Transaction_Id = `TXNW${Date.now()}`;
  
          // Fetch the user's current closing balance
          const getClosingBalanceQuery = `SELECT Closing_Balance FROM user_wallet WHERE userId = ? ORDER BY wid DESC LIMIT 1`;
  
          db.query(getClosingBalanceQuery, [userId], (error, results) => {
            if (error) {
              console.error('Error fetching closing balance:', error);
              return res.status(500).send('Failed to fetch closing balance');
            }
  
            const old_balance = results.length !== 0 ? results[0].Closing_Balance : 0;
  
            if (isNaN(old_balance)) {
              return res.status(400).send('Invalid closing balance in user wallet');
            }
  
            const opening_balance = Number(old_balance);
            const credit_amount = Number(amount);
            const debit_amount = 0;
            let new_balance = opening_balance + credit_amount;
            console.log(typeof(new_balance))
            console.log(typeof(amount))
            console.log(typeof(opening_balance))
            new_balance = parseFloat(new_balance.toFixed(2)); // Round to 2 decimal places
  
            // Insert the wallet transaction
            const sql2 = `INSERT INTO user_wallet (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, credit_amount, debit_amount, Transaction_Type, Transaction_details, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values2 = [
              userId,
              transaction_date,
              Order_Id,
              Transaction_Id,
              opening_balance,
              new_balance,
              credit_amount,
              debit_amount,
              Transaction_Type,
              Transaction_details,
              status,
            ];
  
            db.query(sql2, values2, (error) => {
              if (error) {
                console.error('Error inserting into user_wallet:', error);
                return res.status(500).send('Failed to update wallet balance');
              }
  
              // Send success response
              return res.send(
                `<script>alert('Payment Successful and Wallet Updated'); window.location.replace('${website}');</script>`
              );
            });
          });
        } else {
          return res.send(
            `<script>alert('Transaction Failed.Please Contact to Admin'); window.location.replace('${website}');</script>`
          );
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // res.status(500).send('Internal Server Error.');
      return res.status(500).send(
        `<script>alert('Internal Server Error.Please Contact to Admin'); window.location.replace('${website}');</script>`
      );
    }
  };

  const createOrderToBuyUserId = async (req, res) => {
  
    // const {
    //   user_id,
    //   amount,
    //   userName,
    //   userPhone,
    //   userEmail,
    //   userRole,
    //   Payment_Mode,
    //   website
    // } = req.body;

 const {
      userId,
      userPhone,
      number_of_userId,
      userId_amount,
      userId_type,
      website,
      total_amount,
      payment_method,
    } = req.body;
  
    // Validate the request data
    if (
      !userId ||
      !userPhone ||
      !number_of_userId ||
      !userId_amount ||
      !userId_type ||
      !total_amount ||
      !payment_method
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

           // Validate Amount: Check for undefined, null, or invalid number
           if (total_amount == null || isNaN(parseFloat(total_amount)) || parseFloat(total_amount) < 0) {
            return res.status(400).json({
              success: false,
              error: "Invalid or missing amount",
            });
          }
    
  
    const order_id = `ORUID${Date.now()}`; // Dynamic order ID based on timestamp
    const Transaction_Reference = `Buy ${userId_type} User Id Payment Gateway Order ID ${order_id}`
    const user_token = process.env.UPIWF_KEY // Security token from environment
    const createdAt = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const redirect_url = `https://bitspan.vimubds5.a2hosted.com/api/auth/upiwf/BuyUserIdUsingPGVerify?order_id=${order_id}&website=${website}`
    const status = "Pending"
  
    // const sql = `
    //   INSERT INTO orders (customer_mobile, amount, order_id, remark1, remark2, status, created_at)
    //   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const sql = `INSERT INTO userId_bought_summary (userId, number_of_userId, userId_amount, userId_type, orderId, bought_date, total_amount, payment_method, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    const values = [
      userId,
      number_of_userId,
      userId_amount,
      userId_type,
      order_id,
      createdAt,
      total_amount,
      payment_method,
      status
    ];
  
    try {
      db.query(sql, values, (Error, Results)=>{
        if (Error) {
          console.error('Error:', Error);
          return res.status(500).json({success: false, message: "Failed to create order" });
        }
        else {
          console.log('Order created successfully:', Results);
        }
      });
     
      try {
        const postData = { customer_mobile : userPhone,
          user_token,
          amount : total_amount,
          order_id,
          redirect_url};
        const response = await axios.post('https://upi.wf/api/create-order',
          postData
        );
        console.log(response);
        if(response.data && response.data.status === "Success"){
          // return data;
          res.status(200).json({
            status: true,
            message: "Order created successfully!",
            data: response.data,
            
          });
        } else {
            throw new Error(response.data.message || 'Unknown error');
        }
        
        
      } catch (apiError) {
        console.error("Error in external API call:", apiError.message);
       
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
  

  const buyId = (req, res) => {
    const {
      userId,
      number_of_userId,
      userId_amount,
      userId_type,
  
      total_amount,
      payment_method,
    } = req.body;
  
    // Validate the request data
    if (
      !userId ||
      !number_of_userId ||
      !userId_amount ||
      !userId_type ||
      !total_amount ||
      !payment_method
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    // Generate transactionId and orderId
    const transactionId = `TXNW${Date.now()}`;
    const orderId = `ORD${Date.now()}`;
  
    const bought_date = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  
   
      // Proceed with the purchase logic
  
      // Query to insert data into userid_bought_summary table
      const insertQuery = `
        INSERT INTO userId_bought_summary (userId, number_of_userId, userId_amount, userId_type, orderId, transactionId, bought_date, total_amount, payment_method)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      // Execute the insert query for the purchase
      db.query(
        insertQuery,
        [
          userId,
          number_of_userId,
          userId_amount,
          userId_type,
          orderId,
          transactionId,
          bought_date,
          AmountNumber,
          payment_method,
        ],
        (err, result) => {
          if (err) {
            console.error("Error inserting purchase:", err);
            return res
              .status(500)
              .json({ message: "Failed to save the purchase." });
          }
  
          // After successful purchase, update user profile
          const updateQuery = `
            UPDATE userprofile
            SET 
              remaining_whitelable_id = CASE WHEN ? = 'whiteLabel' THEN remaining_whitelable_id + ? ELSE remaining_whitelable_id END,
              remaining_superDistributor_id = CASE WHEN ? = 'superDistributor' THEN remaining_superDistributor_id + ? ELSE remaining_superDistributor_id END,
              remaining_distributor_id = CASE WHEN ? = 'distributor' THEN remaining_distributor_id + ? ELSE remaining_distributor_id END,
              remaining_retailer_id = CASE WHEN ? = 'retailer' THEN remaining_retailer_id + ? ELSE remaining_retailer_id END
            WHERE userId = ?
          `;
  
          const updateParams = [
            userId_type,
            number_of_userId,
            userId_type,
            number_of_userId,
            userId_type,
            number_of_userId,
            userId_type,
            number_of_userId,
            userId,
          ];
  
          // Log the query and parameters for debugging
          console.log("Executing update query:", updateQuery);
          console.log("With parameters:", updateParams);
  
          db.query(updateQuery, updateParams, (updateErr, updateResult) => {
            if (updateErr) {
              console.error("Error updating user profile:", updateErr);
              return res
                .status(500)
                .json({ message: "Failed to update user profile." });
            }
  
            // Update wallet balance (deduct amount)
            const new_balance = opening_balance - AmountNumber;
            const walletStatus = "Success";
            const walletUpdateQuery = `
              INSERT INTO user_wallet (userId, transaction_date, Order_Id, Transaction_Id, Opening_Balance, Closing_Balance, credit_amount, debit_amount, Transaction_Type, Transaction_details, status)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
  
            const walletUpdateParams = [
              userId,
              bought_date,
              orderId,
              transactionId,
              opening_balance,
              new_balance,
              0, // No credit, since it's a debit
              AmountNumber,
              "Debit",
              `Purchase of ${number_of_userId} ${userId_type}`,
              walletStatus,
            ];
  
            db.query(
              walletUpdateQuery,
              walletUpdateParams,
              (walletErr, walletResult) => {
                if (walletErr) {
                  console.error("Error updating wallet balance:", walletErr);
                  return res.status(500).json({
                    success: false,
                    error: "Failed to update wallet balance.",
                  });
                }
  
                return res.status(200).json({
                  success: true,
                  message:
                    "User ID purchase saved and wallet balance updated successfully.",
                  purchaseId: result.insertId,
                  orderId,
                  transactionId,
                });
              }
            );
          });
        }
      );
    };
  ;

  // const BuyUserIdUsingPGVerify = async (req, res) => {
  //   const clientTxnId = req.query.order_id;
  //   const website = req.query.website;
  //   const key = process.env.UPIWF_KEY;
  
  //   try {
  //     // Fetch transaction details from the database
  //     const [dbData] = await new Promise((resolve, reject) => {
  //       db.query('SELECT * FROM userId_bought_summary WHERE orderId = ?', [clientTxnId], (err, results) => {
  //         if (err) reject(err);
  //         resolve(results);
  //       });
  //     });
  
  //     if (!dbData) {
  //       return res.status(404).send('Transaction not found.');
  //     }
  
  //     // Check the order status from the external API
  //     const postData = new URLSearchParams({ user_token: key, order_id: dbData.orderId });
  //     const response = await axios.post('https://upi.wf/api/check-order-status', postData.toString(), {
  //       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     });
  
  //     if (response.data.status === 'Success') {
  //       const txnStatus = response.data.result.txnStatus;
  //       const utr = response.data.result.utr;
  //       const amount = parseFloat(response.data.result.amount).toFixed(2); // Ensure amount is a valid number
       
  //       if (dbData.status === 'Pending') {
  //         // Update the order status to 'Success'
  //         await new Promise((resolve, reject) => {
  //           db.query('UPDATE userId_bought_summary SET status = ? , transactionId = ?  WHERE orderId = ?', ['Success',utr, clientTxnId], (err) => {
  //             if (err) reject(err);
  //             resolve();
  //           });
  //         });
  
          
  
  //             // Send success response
  //             return res.send(
  //               `<script>alert('Payment Successful and Wallet Updated'); window.location.replace('${website}');</script>`
  //             );
  //           }
          
  //        else {
  //         return res.send(
  //           `<script>alert('Transaction Failed'); window.location.replace('${website}');</script>`
  //         );
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     res.status(500).send('Internal Server Error.');
  //   }
  // };
  const BuyUserIdUsingPGVerify = async (req, res) => {
    const clientTxnId = req.query.order_id;
    const website = req.query.website;
    const key = process.env.UPIWF_KEY;
  
    try {
      // Fetch transaction details from the database
      const [dbData] = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM userId_bought_summary WHERE orderId = ?', [clientTxnId], (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
  
      if (!dbData) {
        // return res.status(404).send('Transaction not found.');
        return res.status(404).send(
          `<script>alert('Transaction not found.Please Contact to Admin'); window.location.replace('${website}');</script>`
        );
      }
  
      // Check the order status from the external API
      const postData = new URLSearchParams({ user_token: key, order_id: dbData.orderId });
      const response = await axios.post('https://upi.wf/api/check-order-status', postData.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
  
      if (response.data.status === 'Success') {
        const txnStatus = response.data.result.txnStatus;
        const utr = response.data.result.utr;
        const amount = parseFloat(response.data.result.amount).toFixed(2); // Ensure amount is a valid number
       
        if (dbData.status === 'Pending') {
          // Update the order status to 'Success'
          await new Promise((resolve, reject) => {
            db.query('UPDATE userId_bought_summary SET status = ? , transactionId = ?  WHERE orderId = ?', ['Success',utr, clientTxnId], (err) => {
              if (err) reject(err);
              resolve();
            });
          });


          // update the number of userid in profile table 
          
        const userId = dbData.userId; // Assuming the userId is in dbData
        const userIdType = dbData.userId_type;
        const number_of_userId	 = Number(dbData.number_of_userId);
        const userTableUpdateQuery =
        `
        UPDATE userprofile
        SET 
          remaining_whitelable_id = CASE WHEN ? = 'whiteLabel' THEN remaining_whitelable_id + ? ELSE remaining_whitelable_id END,
          remaining_superDistributor_id = CASE WHEN ? = 'superDistributor' THEN remaining_superDistributor_id + ? ELSE remaining_superDistributor_id END,
          remaining_distributor_id = CASE WHEN ? = 'distributor' THEN remaining_distributor_id + ? ELSE remaining_distributor_id END,
          remaining_retailer_id = CASE WHEN ? = 'retailer' THEN remaining_retailer_id + ? ELSE remaining_retailer_id END
        WHERE userId = ?
      `;
      const updateParams = [
        userIdType,
        number_of_userId,
        userIdType,
        number_of_userId,
        userIdType,
        number_of_userId,
        userIdType,
        number_of_userId,
        userId,
      ];
        await new Promise((resolve, reject) => {
          db.query(userTableUpdateQuery, updateParams, (err) => {
            if (err) reject(err);
            resolve();
          });
        });


              // Send success response
              return res.send(
                `<script>alert('Payment Successful'); window.location.replace('${website}');</script>`
              );
            }
          
         else {
          return res.send(
            `<script>alert('Transaction Failed , Please Contact to Admin'); window.location.replace('${website}');</script>`
          );
        }
      }
    } catch (error) {
      console.error('Error:', error);
      // res.status(500).send('Internal Server Error.');
      return res.status(500).send(
        `<script>alert('Transaction Failed , Please Contact to Admin'); window.location.replace('${website}');</script>`
      );
    }
  };


  module.exports = {
    webhook,
    webhook_two,
    createOrder,
    createOrderToAddWalletMoney,
    addWalletMoneyUsingPG,
    createOrderToBuyUserId,
    BuyUserIdUsingPGVerify


  }