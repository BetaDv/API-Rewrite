const checkmodule = require("../util/keycheck");
const { verbose } = require("../util/log");

module.exports = (app) => {
  app.use(async (req, res, next) => {
    if (app["No-RequireKey"].includes(req.path)) {
      return next();
    };
    if (app["Routes"].includes(req.path)) {
      return checkmodule.checkAndVerifyKey(app["database"], req, res, next)
    };
    return next();
  });
}