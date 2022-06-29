const fs = require("fs");
const {
  join
} = require("path");

const endpoints = join(__dirname, "endpoints");
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

    const functionData = require(path)(app, database);

    const routePath = getRoute(path);
    app["Routes"].push(route);


    app[functionData.type.toLowerCase](routePath, async (req, res) => {
        if (!functionData.options) return functionData.run(req, res);

        if (functionData.options.useKeyAuth === true) {
          checkAndVerifyKey(req, res, db);
        }

        return functionData.run(req, res);
      )
    };

    log.verbose(`Added Route '${route}'`);
    added++;
  }
}

module.exports = {
  getRoute,
  walkInFolders
}