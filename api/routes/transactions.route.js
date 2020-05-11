var express = require("express");
var router = express.Router();
var controller = require('../controllers/transactions.controller');

var validate = require('../../validates/transaction.validate');

router.get(
  "/",
  controller.index
)

module.exports = router;