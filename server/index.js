const express = require("express");
const app = express();
const config = require("./utils/config");

app.listen(config.PORT, () => console.log("server running"));
