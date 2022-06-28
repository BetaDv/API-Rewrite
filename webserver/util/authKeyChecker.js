module.exports = (db, authKey) => {
  let key = db.get("key_" + authKey);

  if (authKey === null) return "blank";
  if (key === null) return "invalid";
  if (key.isBlacklisted === true) return "blacklisted";
  return "valid";
};
