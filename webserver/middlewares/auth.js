const checkmodule = require("../util/keycheck");

module.exports = (app) => {
  app.use(async (req, res, next) => {
    if (app["No-RequireKey"].includes(req.path)) return next();
    return checkmodule.checkAndVerifyKey(app.Database, req, res, next);
  });
}