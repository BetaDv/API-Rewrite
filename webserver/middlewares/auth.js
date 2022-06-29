const checkmodule = require("../util/keycheck");

module.exports = (app) => {
  app.use(async (req, res, next) => {
    if (req.path.startsWith("/v1/backend/key/generate")) return next();
    return checkmodule.checkAndVerifyKey(app.Database, req, res, next);
  });
}