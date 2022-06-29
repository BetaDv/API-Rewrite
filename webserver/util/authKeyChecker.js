const keyCheck = (db, authKey) => {
  let key = db.get("key_" + authKey);
  if (authKey === null) return "blank";
  if (key === null) return "invalid";
  if (key.isBlacklisted === true) return "blacklisted";
  return "valid";
};

// ERRORS
const body401_in = {
  message: "You are unauthorized within our database",
  serverCode: "Unauthorized",
  status: "401 - Unauthorized",
  statusCode: 401,
};

const body401_bl = {
  message: "This key does not exist in our database",
  serverCode: "Unauthorized",
  status: "401 - Unauthorized",
  statusCode: 401,
};

const body403_bl = {
  message: "Your API Key has been blacklisted from our api",
  serverCode: "Blacklisted",
  status: "403 - Forbidden",
  statusCode: 403,
};

const checkAndVerifyKey = (req, res, db) => {
  const key = req.query["auth"];
  const check = keyCheck(db, key);

  if (check === "blank")
    return res.status(body401_bl.statusCode).json(body401_bl);

  if (check === "invalid")
    return res.status(body401_in.statusCode).json(body401_in);

  if (check === "blacklisted")
    return res.status(body403_bl.statusCode).json(body403_bl);
};

module.exports = {
  keyCheck,
  checkAndVerifyKey,
};
