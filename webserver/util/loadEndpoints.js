const fs = require("fs");
const { join } = require("path");
const log = require("./log");
const endpoints = join(__dirname, "..", "endpoints");
const rootPath = endpoints.split("\\").length;

const getRoute = (path) => {
  return "/" + path.split("\\").splice(rootPath).join("/").replace(".js", "");
};

let added = 0;
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

    log.verbose(`Added Route '${routePath}'`);
    added++;
  }

  return added;
};

module.exports = {
  getRoute,
  walkInFolders,
};
