// this runs keyGen and adds the key to Database
const autoGen = (db, authKey, UID) => {
  let gKey = keyGen(UID);
  let mKey = db.set("key_" + genKey, UID);
  let uKey = db.set("user_" + UID, key);
};

// generate a key
const keyGen = (uid, randomSize = 36) => {
  // Length of random is size / 2 = 18
  const rand = [random(randomSize / 4), random(randomSize / 6), random(randomSize / 12)];
  return rand.join("") + Buffer.from(uid).toString("base64");
};

const getUIDFromKey = (key, originalSize = 36) => {
  // Size 36 / 2 = 18
  const randlen = originalSize / 4 + originalSize / 6 + originalSize / 12;
  return Buffer.from(key.slice(randlen), "base64").toString("utf8")
}

// generate random character strings
const random = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = {
  keyGen,
  autoGen,
  getUIDFromKey,
  random
};