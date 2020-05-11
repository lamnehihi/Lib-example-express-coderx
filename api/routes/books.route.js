var express = require("express");
var multer  = require('multer');

var upload = multer({ dest: './public/uploads/' });

var router = express.Router();
var controller = require('../controllers/book.controller');
var booksMiddleware = require('../../middlewares/books.middleware');

router.get(
  "/",
  controller.index
)

router.post(
  "/",
  controller.createPost
)

router.put(
  "/:bookId",
  controller.replace
)

router.patch(
  "/:bookId",
  controller.update
)

router.delete(
  "/:bookId",
  controller.delete
)


module.exports = router;
