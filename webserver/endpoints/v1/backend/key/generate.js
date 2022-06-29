const { autoGen } = require("../../../../util/generateKey");

/**
 *
 * @param {import("@betadv/easy-db")} database
 * @returns
 */
module.exports = (app, database) => {
  return { 
		requestType: "get",
		useAuth: false,
		execute: async (req, res) => {
    // Do stuff here
    const uid = req.query["uid"];
    const key = autoGen(database, uid);

    res.json({
      uid,
      key,
    });
  }
};
}
