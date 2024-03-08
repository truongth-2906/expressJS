const express = require("express");
const router = express.Router();
const userController = require("../../controllers/api/UserController");
const {authenticateToken} = require("../../lib/jwtHelper");

router.get("/", authenticateToken, userController.index);
router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.login);

module.exports = router;
