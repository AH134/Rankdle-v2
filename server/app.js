const config = require("./utils/config");
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const userRouter = require("./controllers/users");
const clipRouter = require("./controllers/clips");
const gameRouter = require("./controllers/games");

mongoose.set("strictQuery", false);
console.log("[MongoDB] connecting to", config.MONGODBURI.substring(22, 54));

mongoose
  .connect(config.MONGODBURI)
  .then(() =>
    console.log("[MongoDB] connected to", config.MONGODBURI.substring(22, 54))
  )
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/clips", clipRouter);
app.use("/api/games", gameRouter);

app.use(middleware.errorHandler);

module.exports = app;
