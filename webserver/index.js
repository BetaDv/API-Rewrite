const express = require("express");
const fs = require("fs");
const { join } = require("path");
const ENDPOINTS = join(__dirname, "endpoints");
const BASELEN = ENDPOINTS.split("\\").length;
const log = require("./util/log");

function getRoute(path) {
    return "/" + path.split("\\").splice(BASELEN).join("/").replace(".js", "");
}
/**
 * 
 * @param {import("@betadv/easy-db")} database 
 * @param {*} config 
 */
module.exports = (database, config) => {
    const app = express();
    let added = 0;
    app["Routes"] = [];
    function walk(path) {
        const stat = fs.statSync(path);
        if (stat.isDirectory()) {
            const dir = fs.readdirSync(path);
            for (const e of dir) {
                walk(join(path, e));
            }
        } else if (stat.isFile() && path.endsWith(".js")) {
            const fn = require(path)(app, database);
            const route = getRoute(path);
            app["Routes"].push(route);
            app.get(route, fn);
            log.verbose(`Added Route '${route}'`);
            added++;
        }
    }
    for (const route of fs.readdirSync(ENDPOINTS)) {
        walk(join(ENDPOINTS, route));
    }
    log.verbose(`Successfully Added ${added} of Routes to API`);
    app.use(express.urlencoded({ extended: false, limit: "3mb" }));
    app.use(express.json());
    app.set('json spaces', 2)

    // Unknown Route
    app.get("*", (req, res) => {
        if (req.path === "/" || req.path === "/help") {
            res.redirect("/endpoints")
        }
        if (!res.headersSent)
        res.status(404).json({ status: "404", message: "Page Not Found" });
    })
    
    function run() {
        return app.listen(config.port, () => log.verbose(`API Listening to port ${config.port}`));
    }

    return {
        run
    }
}