const { connectDatabase } = require("./config/configDatabase");
const { configExpress } = require("./config/configExpress");
const { configRoutes } = require("./config/configRoutes");
const { configSocket } = require("./config/configSocket");

const express = require("express");
const app = express();

connectDatabase();
configExpress(app);
configRoutes(app);
configSocket(app);

module.exports = app;

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}
