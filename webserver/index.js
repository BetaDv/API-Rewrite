module.exports = (db) => {
  // DEPENDENCIES
  const express = require("express");

  // OTHER IMPORTS
  const config = require("../web-config.json");

  // EXPRESS SETUP
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(config.port, () => {
    console.log(`application online`);
  });
};
