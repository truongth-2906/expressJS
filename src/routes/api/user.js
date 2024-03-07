const express = require("express");
const router = express.Router();

const userController = require("../../controllers/api/UserController");

router.post("/sign-up", userController.signUp);
router.post("/login", userController.login);

module.exports = router;
