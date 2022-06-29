const keymodule = require("./generateKey");
const checkKey = (db, authKey) => {
    let key = db.has("key:" + authKey);
  
    if (key === false) return "invalid"; // Invalid
    if (key.isBlacklisted === true) return "blacklisted"; //Blacklisted
    return "valid"; // Allowed
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
    const key = req.query["Authorization"];
    const stat = checkKey(db, key);
    switch(stat) {
        case "invalid": {
            res.status(401).json(bodyUnauthorized);
        }
        break;
        case "blacklisted": {
            res.status(403).json(bodyBlacklisted);
        }
        break;
        case "valid": {
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