// // DEPENDENCIES
// const WebApp = require("./webserver/index");

// // WEBSERVER
// const website = new WebApp();
// website.Run();
const App = require("./webserver");
const EasyDB = require("@betadv/easy-db");
const Database = new EasyDB(require("./data/db-config"))

App(Database, require("./data/web-config")).run();
