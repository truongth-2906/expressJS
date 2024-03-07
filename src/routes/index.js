const { authenticateToken } = require("../lib/jwtHelper");
const { authenticateSession } = require("../lib/sessionHelper");

module.exports = (app) => {
  // Api routes
  const userApiRouters = require("./api/user");
  app.use("/api/users", userApiRouters);

  // Backend routes
  const userRouters = require("./backend/user");
  app.use("/users", userRouters);

  // Create a catch-all route for testing the installation.
  app.get("*", (req, res) =>
    res.status(404).send({
      message: "Not found!",
    })
  );
};
