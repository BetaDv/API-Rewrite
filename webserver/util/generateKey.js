const autoGen = (db, authKey, UID) => {
  let gKey = keyGen(36, UID);

  let mKey = db.set("key_" + genKey, UID);
  let uKey = db.set("user_" + UID, key);
};

// Length of 36
const keyGen = (charCount = 36, uid) => {
  return [
    random(charCount / Math.floor(Math.random() * 10) + 3),
    random(charCount / Math.floor(Math.random() * 10) + 3),
    String(uid),
    random(charCount / Math.floor(Math.random() * 10) + 3),
  ].join("-");
};

const random = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
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
