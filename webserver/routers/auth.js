const express = require("express");

/**
 * @param {import("../index_old.js")} app
 */
function initRouter(app) {
  const router = express.Router();

  router.use(async (req, res, next) => {
    const key = req.query["key"];
    const check = require("../util/authKeyChecker")(app.Database, key);

    if (check === "blank")
      return res.status(body401_bl.statusCode).json(body401_bl);
    if (check === "invalid")
      return res.status(body401_in.statusCode).json(body401_in);
    if (check === "blacklisted")
      return res.status(body403_bl.statusCode).json(body403_bl);

    next();
  });

  return router;
}

module.exports = initRouter;
