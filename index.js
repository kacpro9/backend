const config = require("./config");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.listen(config.app.port, () => {
  console.log(`Express server is up on port ${config.app.port}`);
});
