const jwt = require('jsonwebtoken');
const { db } = require("../connect");
const dotenv = require("dotenv");
dotenv.config();

const verifyAdminToken = async (token) => {
   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        // Check if the user exists in the database
        const query = 'SELECT * FROM userprofile WHERE UserId = ?';
        const params = [decoded.userId];

        return new Promise((resolve, reject) => {
            db.query(query, params, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    reject(error);
                    return;
                }

                if (!results || results.length === 0) {
                    console.error('User not found in the database');
                    resolve(null);
                    return;
                }

                const user = results[0]; // Assuming user data is in the first row
                // The user object contains the user information
                resolve(user);
            });
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
};

module.exports = verifyAdminToken;