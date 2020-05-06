var express = require("express");
var router = express.Router();
var controller = require('../controllers/cart.controller');
var sessionMiddleware = require('../middlewares/sessions.middleware');

router.get(
  '/add/:bookId',
  sessionMiddleware.requireSession,
  controller.add
);

module.exports = router;