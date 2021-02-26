const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");

const router = require("./controllers/routes");
const middleware = require("./utils/middleware");

const logger = require("./utils/logger");
const config = require("./utils/config");

app.use("/api/products", router);

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
app.use("/api/products", router);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
