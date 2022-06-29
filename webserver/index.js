const express = require("express");
const log = require("./util/log");
const { walkInFolders, getRoute } = require("./util/loadEndpoints");

const fs = require("fs");
const { join } = require("path");

const config = require("../data/web-config");

const endpoints = join(__dirname, "endpoints");

/**
 *
 * @param {import("@betadv/easy-db")} database
 * @param {*} config
 */
module.exports = (database) => {
  const app = express();
  let added;
  app["Routes"] = [];
  app["No-RequireKey"] = [];
  for (const route of fs.readdirSync(endpoints)) {
    added = walkInFolders(join(endpoints, route), app, database);
  }
  log.verbose(`Successfully Added ${added} Routes to API`);
  app.use(
    express.urlencoded({
      extended: false,
      limit: "3mb",
    })
  );
  app.use(express.json());
  app.set("json spaces", 2);

  // Unknown Route
  app.get("*", (req, res) => {
    if (req.path === "/help") {
      res.redirect("/endpoints");
      if (!res.headersSent)
        res.status(404).json({
          status: "404",
          message: "Page Not Found",
        });
    }
  });

  return app.listen(config.port, () =>
    log.verbose(`API Listening to port ${config.port}`)
  );
};
