/**
 *
 * @param {import("@betadv/easy-db")} database
 * @returns
 */

module.exports = (app, database) => {
	return {
		requestType: "get",
		execute: async (req, res) => {
			// Do stuff here
			res.send("Received request")
		}
	}
}
