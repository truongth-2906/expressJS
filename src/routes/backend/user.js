const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/backend/UserController');
router.get('/', UserController.index);

module.exports = router;
