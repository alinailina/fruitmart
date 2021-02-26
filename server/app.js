const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");

const productsRouter = require("./controllers/products");
const customersRouter = require("./controllers/customers");
const ordersRouter = require("./controllers/orders");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const config = require("./utils/config");

const url = config.MONGODB_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use("/api/products", productsRouter);
app.use("/api/customers", customersRouter);
app.use("/api/orders", ordersRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
