const { autoGen } = require("../../../../util/generateKey");

/**
 *
 * @param {import("@betadv/easy-db")} database
 * @returns
 */
module.exports = (app, database, route) => {
  app["Routes"].push(route);
  app["No-RequireKey"].push(route);
  app.get(route, async (req, res) => {
    // Do stuff here
    const uid = req.query["uid"];
    const key = autoGen(database, uid);

    res.json({
      uid,
      key,
    });
  });
};
