var express = require("express");
var router = express.Router();
var controller = require('../controllers/cart.controller');
var cartValidate = require('../validates/cart.validate');

router.get(
  '/',
  controller.index
);


router.get(
  '/add/:bookId',
  controller.add
);

router.get(
  '/delete/:bookId',
  controller.delete
);

router.get(
  '/hire',
  cartValidate.validateCart,
  controller.hire
);

module.exports = router;