// const jwt = require("jsonwebtoken");
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ status: "Failure", message: "No token provided." });
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res
//         .status(403)
//         .json({ status: "Failure", message: "Invalid or expired token." });
//     }
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;

const verifyAdminToken = require('./verifyAdminToken.js');

// Middleware to check authentication
const authenticateToken = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ success:false,message: 'Unauthorized - Missing token' });
    }

    // const token = authorizationHeader.slice(7);
    const token = authorizationHeader.split(" ")[1];

    // Verify and decode the token (you need to implement this function)
    
    const user = await verifyAdminToken(token);

    if (!user) {
        return res.status(401).json({ success:false,message: 'Unauthorized - Invalid token' });
    }

    // Attach the user to the request for later use
    req.user = user;
    console.log(user)
    next();
};

module.exports = authenticateToken;