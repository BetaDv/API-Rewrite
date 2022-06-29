// DEPENDENCIES
const EasyDB = require("@betadv/easy-db");

// DATABASE
const Database = new EasyDB(require("./data/db-config"));

// WEBSERVER
require("./webserver/index")(Database);
