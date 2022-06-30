const autoGen = (db, UID) => {
  let genKey = keyGen(UID);

  let mKey = db.set("key:" + genKey, UID.toString());
  return genKey;
};

// generate a key
const keyGen = (uid, randomSize = 36) => {
  return Buffer.from(uid).toString("base64") + random(randomSize);
};

const getUIDFromKey = (key) => {
  return parseInt(Buffer.from(key, "base64"));
};

// generate random character strings
const random = (length) => {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
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
  random,
};
