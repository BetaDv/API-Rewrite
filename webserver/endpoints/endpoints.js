/**
 * 
 * @param {import("@betadv/easy-db")} database 
 * @returns 
 */
module.exports = (app, database) {
	return {
		name: "generate",
	type: "get",
		options: {
			useKeyAuth: false
		}
	run: async (req, res) => {
		res.json({ endpoints: app["Routes"})
	}
	}
}