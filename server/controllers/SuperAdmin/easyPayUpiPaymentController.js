const moment = require("moment-timezone");
const { db } = require("../../connect");
const dotenv = require("dotenv");
const axios = require('axios');
dotenv.config();


const createOrder = async (req, res) => {
    const odid = Math.floor(10000000 + Math.random() * 90000000); // Generate random 8-digit order ID
    const { user: mob, id: userid, am: amt } = req.query;

    // Payload for the external API request
    const data = {
        api_token: "876907",
        customer_name: "namo",
        order_id: odid,
        amount: amt,
        remark1: "fsffsdf",
        customer_mobile: mob,
        redirect_url: "https://in.ezeepay.in/#/recharge"
    };

    try {
        // Make a POST request to the payment API using Axios
        const response = await axios.post('https://in.ezeepay.in/order/create', data);
        const { status, payment_link: url } = response.data;

        if (status === 'SUCCESS') {
            // Insert into the database
            db.query('INSERT INTO online_pay (mobile, userid, amt, orderid, status) VALUES (?, ?, ?, ?, ?)',
                [mob, userid, amt, odid, 'PENDING'],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting into database', err);
                        res.status(500).send('Internal Server Error');
                        return;
                    }
                    // Redirect to the payment link
                    res.redirect(url);
                });
        } else {
            // Handle API failure response
            res.send(response.data);
        }
    } catch (error) {
        console.error('Error in API request', error);
        res.status(500).send('Error in payment creation');
    }

}

// const createOrder = (req, res) => {
//     const odid = Math.floor(10000000 + Math.random() * 90000000); // Generate random 8-digit order ID
//     const { user: mob, id: userid, am: amt } = req.query;

//     // Payload for the external API request
//     const data = {
//         api_token: "876907",
//         customer_name: "namo",
//         order_id: odid,
//         amount: amt,
//         remark1: "fsffsdf",
//         customer_mobile: mob,
//         redirect_url: "https://in.ezeepay.in/#/recharge"
//     };

//     // Make a POST request to the payment API using Axios
//     axios.post('https://in.ezeepay.in/order/create', data)
//         .then(response => {
//             const { status, payment_link: url } = response.data;

//             if (status === 'SUCCESS') {
//                 // Insert into the database
//                 db.query('INSERT INTO online_pay (mobile, userid, amt, orderid, status) VALUES (?, ?, ?, ?, ?)',
//                     [mob, userid, amt, odid, 'PENDING'],
//                     (err, result) => {
//                         if (err) {
//                             console.error('Error inserting into database', err);
//                             res.status(500).send('Internal Server Error');
//                         } else {
//                             // Redirect to the payment link
//                             res.redirect(url);
//                         }
//                     });
//             } else {
//                 // Handle API failure response
//                 res.send(response.data);
//             }
//         })
//         .catch(error => {
//             console.error('Error in API request', error);
//             res.status(500).send('Error in payment creation');
//         });
// };

module.exports = {
    createOrder
}
