var express = require("express");
var router = express.Router();
var controller = require('../controllers/cart.controller');
var sessionMiddleware = require('../middlewares/sessions.middleware');

router.get(
  '/',
  controller.index
);


router.get(
  '/add/:bookId',
  sessionMiddleware.requireSession,
  controller.add
);

router.get(
  '/delete/:bookId',
  controller.delete
);

module.exports = router;