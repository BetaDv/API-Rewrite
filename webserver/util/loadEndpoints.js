const fs = require("fs");
const { join } = require("path");
const log = require("../../generalUtil/log");
const endpoints = join(__dirname, "..", "endpoints");

const rootPath = endpoints.split("/").length;

const getRoute = (path) => {
  return "/" + path.split("\\").splice(rootPath).join("/").replace(".js", "");
}

const walkInFolders = (path, app, database) => {
  const stat = fs.statSync(path);
  if (stat.isDirectory()) {
    const dir = fs.readdirSync(path);
    for (const e of dir) {
      walkInFolders(join(path, e), app, database);
    }
  } else if (stat.isFile() && path.endsWith(".js")) {
    const routePath = getRoute(path);
    // Load the module file
    require(path)(app, database, routePath);
    app["AddedRoutes"]++;
    log.verbose(`File handled route '${routePath}'`);
  };
}

module.exports = {
	getRoute,
	walkInFolders,
};
