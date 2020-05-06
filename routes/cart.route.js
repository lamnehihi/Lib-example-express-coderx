var express = require("express");
var router = express.Router();
var controller = require('../controllers/cart.controller');

router.get('/add', controller.login);

module.exports = router;