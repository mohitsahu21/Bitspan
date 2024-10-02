const moment = require("moment-timezone");
const { db } = require("../connect");

const paymentCallback = async (req, res) => {
  const { status, order_id, gateway_txn, amt } = req.query;

  try {
    // Fetch the order details from the database
    db.query(
      "SELECT * FROM online_pay WHERE orderid = ?",
      [order_id],
      (err, result) => {
        if (err) {
          console.error("Error fetching data from database", err);
          res.status(500).send("Database error");
          return;
        }

        if (result.length === 0) {
          res.status(404).send("Order not found");
          return;
        }

        const row = result[0];
        const { userid: uid, amt: amt2, mobile: mob, status: dbStatus } = row;

        // Verify the amount
        if (amt === amt2.toString()) {
          const rand = Math.floor(3333333 + Math.random() * 6666666);

          // Insert into the recharge table
          db.query(
            "INSERT INTO easyPayUpiCallback (username, recharge, status, upi, utr, rand) VALUES (?, ?, ?, ?, ?, ?)",
            [mob, amt,status , uid, gateway_txn, rand],
            (err, insertResult) => {
              if (err) {
                console.error("Error inserting into recharge", err);
                res.status(500).send("Database insert error");
                return;
              }

              // Update user balance
              db.query(
                "UPDATE users SET balance = balance + ? WHERE username = ?",
                [amt, mob],
                (err, updateResult) => {
                  if (err) {
                    console.error("Error updating user balance", err);
                    res.status(500).send("Database update error");
                    return;
                  }

                  // Update the order ID in online_pay (set new random order ID)
                  db.query(
                    "UPDATE online_pay SET orderid = ? WHERE orderid = ?",
                    [rand, order_id],
                    (err, updateOrderResult) => {
                      if (err) {
                        console.error("Error updating order ID", err);
                        res.status(500).send("Database update error");
                        return;
                      }

                      // Check the status to ensure the transaction hasn't been already processed
                      if (dbStatus === "PENDING") {
                        res.send("Transaction successful and balance added");
                      } else {
                        res.send("Transaction already initiated");
                      }
                    }
                  );
                }
              );
            }
          );
        } else {
          res.send("Amount mismatch");
        }
      }
    );
  } catch (error) {
    console.error("Error processing payment callback", error);
    res.status(500).send("Internal server error");
  }
};


module.exports = {
    paymentCallback
}