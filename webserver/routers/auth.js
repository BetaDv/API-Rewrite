const express = require("express");

const body401_in = {
  message: "You are unauthorized within our database",
  serverCode: "Unauthorized",
  status: "401 - Unauthorized",
  statusCode: 401,
};

const body401_bl = {
  message: "This key does not exist in our database",
  serverCode: "Unauthorized",
  status: "401 - Unauthorized",
  statusCode: 401,
};

const body403_bl = {
  message: "Your API Key has been blacklisted from our api",
  serverCode: "Blacklisted",
  status: "403 - Forbidden",
  statusCode: 403,
};

/**
 * @param {import("../index.js")} app
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
