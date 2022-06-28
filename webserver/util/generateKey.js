const autoGen = (db, authKey, UID) => {
  let gKey = keyGen(36, UID);

  let mKey = db.set("key_" + genKey, UID);
  let uKey = db.set("user_" + UID, key);
};

// Length of 36
const keyGen = (charCount = 36, uid) => {
  return [
    random(charCount / 4),
    random(charCount / 2),
    String(uid),
    random(charCount / 6),
  ].join("-");
};

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
};
