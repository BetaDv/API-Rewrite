const mod = require("./webserver/util/generateKey");
const crypto = require("crypto")
const key = mod.keyGen("193728");
const keyUid = mod.getUIDFromKey(key);

console.log("Key:", key);
console.log("UID:", keyUid)

console.log(mod.random(36).length)
console.log(crypto.randomBytes(36).toString("base64").length)