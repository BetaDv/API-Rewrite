/**
 *
 * @param {import("@betadv/easy-db")} database
 * @returns
 */
module.exports = (app, database) => {
	return {
		useAuth: false,
		requestType: "get",
		execute: async (req, res) => {
			// Do stuff here
			res.status(200).json({ endpoints: app["Routes"] })
		}
	}
}
