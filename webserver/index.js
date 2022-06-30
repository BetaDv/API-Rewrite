const express = require("express");
const log = require("../generalUtil/log");
const { walkInFolders, getRoute } = require("./util/loadEndpoints");

const rateLimiter = require("./security/rateLimiter");

const fs = require("fs");
const { join } = require("path");
const middlewares = require("./middlewares")

const config = require("../data/web-config");
const { bodyNotFound } = require("./util/errors");

const endpoints = join(__dirname, "endpoints");

/**
 *
 * @param {import("@betadv/easy-db")} database
 * @param {*} config
 */
module.exports = (database) => {
    const app = express();
    app["Routes"] = [];
    app["No-RequireKey"] = [];
    app["AddedRoutes"] = 0;
    app["database"] = database;
    app["config"] = config;
    app.use(express.urlencoded({
      extended: false,
      limit: "3mb"
    }));
    app.use(express.json());
    app.set('json spaces', 2);
    // Middlewares
    middlewares.auth(app); // Authorization Middleware
    rateLimiter.apply(app); // Rate Limiter
    // Routes
    for (const route of fs.readdirSync(endpoints)) {
      walkInFolders(join(endpoints, route), app, database);
    }
    log.success(`Finished loading ${app["AddedRoutes"]} Routes`);

    // Unknown Route
    app.get("*", (req, res) => {
        if (req.path === "/help") {
          res.redirect("/endpoints");
        }
        if (!res.headersSent)
            res.status(404).json(bodyNotFound);
    })

  return app.listen(config.port, () =>
    log.success(`API Listening to port ${config.port}`)
  );
};
