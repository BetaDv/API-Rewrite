const keymodule = require("./generateKey");
const checkKey = (db, authKey) => {
    let key = db.get("key:" + authKey);
  
    if (authKey === null) return undefined; // None
    if (key === null) return null; // Invalid
    if (key.isBlacklisted === true) return false; //Blacklisted
    return true; // Allowed
};

const findKeyByUID = (db, authKey) => {
    const enc = Buffer.from(keymodule.getUIDFromKey(authKey)).toString("base64");
    return db.startsWith(`key:${enc}`);
}

// ERRORS
const bodyUnauthorized = {
    message: "Authorization ( API KEY ) is invalid or unknown",
    serverCode: "Unauthorized",
    status: "401 - Unauthorized",
    statusCode: 401,
}
const bodyBlacklisted = {
    message: "Your API Key has been blacklisted from our api",
    serverCode: "Blacklisted",
    status: "403 - Forbidden",
    statusCode: 403,
}

const checkAndVerifyKey = (db, req, res, next) => {
    const key = req.headers["Authorization"];
    const stat = checkKey(db, key);
    switch(stat) {
        case undefined:
        case null: {
            res.status(401).json(bodyUnauthorized);
        }
        break;
        case false: {
            res.status(403).json(bodyBlacklisted);
        }
        break;
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