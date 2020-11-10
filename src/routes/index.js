var express = require('express');
var router = express.Router();

var authController = require('./AuthController');


router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/validate', authController.validate_token);

module.exports = router;