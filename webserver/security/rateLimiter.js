const rateLimit = require("express-rate-limit");

const apply = (app) => {
  const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });

  
  app.use("/api", apiLimiter);
};

module.exports = { apply };
