/**
 *
 * @param {import("@betadv/easy-db")} database
 * @returns
 */

 module.exports = (app, database, route) => {
    app.get(route, async(req, res) => {
          // Do stuff here
        res.status(200).json({ status: "OK" })
    })
};
  