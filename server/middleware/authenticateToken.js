// const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET;

// const authenticateToken = (req, res, next) => {
//   const token = req.headers["authorization"];

//   if (!token) {
//     return res
//       .status(401)
//       .json({
//         status: "Failure",
//         message: "Access denied. No token provided.",
//       });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);

//     req.user = decoded;

//     next();
//   } catch (err) {
//     return res
//       .status(403)
//       .json({ status: "Failure", message: "Invalid or expired token." });
//   }
// };

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: "Failure", message: "No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ status: "Failure", message: "Invalid or expired token." });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
