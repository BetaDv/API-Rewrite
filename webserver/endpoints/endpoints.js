/**
 * 
 * @param {import("express").Express} app 
 * @param {import("@betadv/easy-db")} database 
 * @returns 
 */
 module.exports = (app, database) => {
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    return (req, res) => {
        res.json({
            endpoints: app["Routes"]
        })
    }
}