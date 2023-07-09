const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./controllers/users");

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

module.exports = app;
