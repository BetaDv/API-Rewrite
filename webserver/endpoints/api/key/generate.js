const keymodule = require("../../../util/generateKey");
const Errors = require('../../../util/errors');
const { findKeyByUID, checkKey } = require("../../../util/keycheck");
const { Router } = require("express");
/**
 *
 * @param {import("@betadv/easy-db")} database
 * @returns
 */
module.exports = (app, database, route) => {
    const router = Router();
	app["No-RequireKey"].push(route);
    router.use(async(req, res, next) => {
        const key = req["Authorization"] || req.query["auth"];

        if (key !== app["config"].masterkey) {
            return res.status(404).json(Errors.bodyNotFound);
        }

        next();
    })
    router.get("/", /** @param {import("express").Request} req */async(req, res) => {
        const uid = req.query["userId"];
        if (!uid || uid?.length !== 18 || isNaN(Number(uid))) return res.status(400).json(Errors.bodyBadrequest);
        
        const check = checkKey(findKeyByUID(database, uid))
        if (check || check === false) {
            const clone = {...Errors.bodyBadrequest};
            clone.message = "This User ID already has a API Key";
            clone.serverCode = "KeyExist";
            return res.status(400).json(clone);
        }

        const key = keymodule.autoGen(database, uid);
        return res.status(200).json({ key, UID: uid });
    });

    app.use(route, router)
}
