var express = require("express");
var multer  = require('multer');

var upload = multer({ dest: './public/uploads/' });

var router = express.Router();
var controller = require('../controllers/book.controller');
var booksMiddleware = require('../middlewares/books.middleware');

router.get(
  "/",
  controller.index
)

router.get(
  "/create",
  controller.createBook
)

router.post(
  "/create",
  controller.createBookPost
)

router.get(
  "/update/:bookId", 
  controller.updateBook
)

router.post(
  "/update/:bookId",
  controller.updateBookPost
)

router.get(
  "/delete/:bookId",
  controller.deleteBook
)

router.get(
  "/update/:bookId/cover",
  controller.updateBookCover
)

router.post(
  "/update/:bookId/cover",
  upload.single('cover'),
  booksMiddleware.uploadCover,
  controller.updateBookCoverPost
)

module.exports = router;