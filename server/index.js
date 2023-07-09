const app = require("./app");
const config = require("./utils/config");

app.listen(config.PORT, () =>
  console.log("[Server] Starting on port", config.PORT)
);
