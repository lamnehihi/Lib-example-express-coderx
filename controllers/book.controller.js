var shortid = require('shortid');

var db = require('../db');
var Books = require("../models/books.model");

module.exports.index = async function(req, res, next ) {
  var page = req.query.page || 1;
  var perPage = 6;
  var start = (page-1) * perPage;
  var end = start + perPage;
  console.log("asd")
  var books = await Books.find();
  console.log(books);
  
  res.render('books/index', {
    books,
    page,
    test : res.locals.test
  })
}

module.exports.createBook = function(req, res) {
  res.render('books/createBook', {
  })
}

module.exports.createBookPost = function(req, res) {
  req.body.id = shortid.generate();
  db.get('books')
    .push(req.body)
    .write();
  res.redirect('/books');
}

module.exports.updateBook = function(req, res) {
  var bookId = req.params.bookId;
  var book = db
      .get('books')
      .find({ id: bookId })
      .value()
  res.render('books/updateBook', {
    book,
  })
}

module.exports.updateBookPost = function(req, res) {
  var bookId = req.params.bookId;
  var newTitle = req.body.title;
  //
  db.get('books')
  .find({ id: bookId })
  .assign({ title: newTitle})
  .write()
  res.redirect('/books');
}

module.exports.deleteBook = function(req, res) {
  var bookId = req.params.bookId;
  db.get('books')
    .remove({ id: bookId })
    .write()
  res.redirect('/books');
}

module.exports.updateBookCover = function(req, res) {
  var bookId = req.params.bookId;
  var book = db
      .get('books')
      .find({ id: bookId })
      .value()
  res.render('books/changeCover', {
    book,
  })
}

module.exports.updateBookCoverPost = function(req, res) {
  db.get("books")
    .find({ id : req.params.bookId })
    .assign({image : res.locals.cover})
    .write();
  res.redirect("/books/update/" + req.params.bookId);
}