const keymodule = require("./generateKey");
const checkKey = (authKey) => {
    if (!authKey) return undefined;
    if (authKey.isBlacklisted === true) return false; //Blacklisted
    return true; // Allowed
};

const getKeyData = (db, authKey) => {
    return db.get("key:" + authKey);
}

const findKeyByUID = (db, uid) => {
    const enc = Buffer.from(uid).toString("base64");
    return db.startsWith(`key:${enc}`)?.[0];
}

// ERRORS
const Errors = require("./errors");

const checkAndVerifyKey = (db, req, res, next) => {
    const key = req.headers["Authorization"];
    const stat = checkKey(getKeyData(db, key));
    switch(stat) {
        // None / Invalid
        case undefined:{
            res.status(401).json(Errors.bodyUnauthorized);
        }
        break;
        // Blacklisted
        case false: {
            res.status(403).json(Errors.bodyBlacklisted);
        }
        break;
        // Allowed
        case true: {
            next();
        }
        break;
    };
    return;
}

module.exports = {
    checkKey,
    checkAndVerifyKey,
    findKeyByUID
}