const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const UserRouter = require("./src/Routes/User");
const CategoryRouter = require("./src/Routes/Category");
const ProductRouter = require("./src/Routes/Product");
const BrandRouter = require("./src/Routes/Brand");
const InitialDataRouter = require("./src/Routes/initiateData");
const CouponRouter = require("./src/Routes/Coupon");
const StripeRouter = require("./src/Routes/stripe");
const CartRouter = require("./src/Routes/Cart");
const OrderRouter = require("./src/Routes/Order");
// Connect with database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database Error ---->", error);
  });
// Middleware
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "src/uploads")));

// Router Handler
app.use("/api", UserRouter);
app.use("/api", CategoryRouter);
app.use("/api", ProductRouter);
app.use("/api", BrandRouter);
app.use("/api", InitialDataRouter);
app.use("/api", CouponRouter);
app.use("/api", StripeRouter);
app.use("/api", CartRouter);
app.use("/api", OrderRouter);
//404 Handler
app.use((req, res, next) => {
  next("Request URL not found!");
});
app.use((error, req, res, next) => {
  if (error) {
    res.status(500).send(error);
  } else {
    res.status(500).send("There was an Error!");
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
