const jwt = require("jsonwebtoken");
const Model = require("../models");
const { USER_TYPE } = require("./constants");

const User = Model.User;

module.exports = {
  authenticateSession: (req, res, next) => {
    if (req.session && req.session.authenticated) {
      return next();
    } else {
      const token = req.query.token;

      if (token == null) {
        return res.status(403).send("Unauthorized");
      }

      jwt.verify(token, process.env.JWT_SECRET, async (err, username) => {
        if (err) return res.status(403).send("Forbidden");

        const userObj = await User.findOne({
          where: {
            username: username,
            type: USER_TYPE.ADMIN,
          },
        });

        if (!userObj) {
          return res.status(403).send("Chỉ admin mới có quyền vào đây.");
        }

        req.session.username = username;
        req.session.display_name = userObj.name;
        req.session.user_id = userObj.id;
        req.session.authenticated = true;
        next();
      });
    }
  },
};
