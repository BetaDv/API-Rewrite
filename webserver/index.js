const express = require("express");
const http = require("http");
const WEBCONFIG = require("../data/web-config");
const DATABASECONFIG = require("../data/db-config");
const EasyDB = require("@betadv/easy-db");

class WebApp {
  constructor() {
    this.App = express();
    this.Server = http.createServer(this.App);
    this.Config = WEBCONFIG;
    this.Database = new EasyDB(DATABASECONFIG);
    this.Database.load();
  }

  Run() {
    const authRouter = require("./routers/auth");
    this.App.use(express.urlencoded({ extended: false, limit: "5mb" }));
    this.App.use(express.json());
    this.App.set("json spaces", 2);

    this.Server.listen(this.Config.port, () =>
      console.log("Application is listening to port", this.Config.port)
    );
  }
}

module.exports = WebApp;
