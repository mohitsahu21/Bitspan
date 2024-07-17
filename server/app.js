const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const retailerRouter = require("./routers/retailerRouter");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth/retailer", retailerRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 7777;

app.listen(port, () => {
  console.log(`Server Run on PORT : ${port}`);
});
