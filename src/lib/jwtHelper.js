const jwt = require("jsonwebtoken");
const response = require("./response");

module.exports = {
  generateAccessToken: (username) => {
    return jwt.sign(username, process.env.JWT_SECRET);
  },

  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(' ').pop();
    if (token == null)
      return res.status(401).json(response.fail("Unauthorized", null));

    return module.exports.verify(token, process.env.JWT_SECRET, res, req, next);
  },

  verify: (token, secret, res, req, next) => {
    jwt.verify(token, secret, (err, username) => {
      if (err) return res.status(403).json(response.fail("Forbidden", null));

      req.username = username;
      next();
    });
  },
};
