var express = require("express");
var router = express.Router();
var controller = require('../controllers/book.controller');

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

module.exports = router;