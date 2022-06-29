const fs = require("fs");
const {
  join
} = require("path");

const endpoints = join(__dirname, "../", "endpoints");
const rootPath = endpoints.split("\\").length;

const {
  checkAndVerifyKey
} = require("./authKeyChecker");

const getRoute = (path) => {
  return "/" + path.split("\\").splice(rootPath).join("/").replace(".js", "");
}

const walkInFolders = (path, app, database) => {
  const stat = fs.statSync(path);
  if (stat.isDirectory()) {
    const dir = fs.readdirSync(path);
    for (const e of dir) {
      walkInFolders(join(path, e));
    }
  } else if (stat.isFile() && path.endsWith(".js")) {
    const routePath = getRoute(path);
    const functionData = require(path)(app, database, routePath);
  };

  log.verbose(`Added Route '${route}'`);
  added++;
}

module.exports = {
  getRoute,
  walkInFolders
}