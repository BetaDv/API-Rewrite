const mod = require("./webserver/util/generateKey");
const key = mod.keyGen("123456789011121415");
const keyUid = mod.getUIDFromKey(key);

console.log("Key:", key);
console.log("UID:", keyUid)