var shortid = require('shortid');

var Books = require("../models/books.model");

module.exports.index = async function(req, res, next ) {
  var page = req.query.page || 1;
  var perPage = 6;
  var start = (page-1) * perPage;
  var end = start + perPage;
  var books = await Books.find();
  
  res.render('books/index', {
    books : books.slice(start, end),
    page,
    test : res.locals.test
  })
}

module.exports.createBook = function(req, res) {
  res.render('books/createBook', {
  })
}

module.exports.createBookPost = async function(req, res) {
  req.body.image = res.locals.cover;
  var result = await Books.create(req.body);
  res.redirect('/books');
}

module.exports.updateBook = async function(req, res) {
  var bookId = req.params.bookId;
  var book = await Books.findOne({ _id : bookId });
  
  res.render('books/updateBook', {
    book,
  })
}

module.exports.updateBookPost = async function(req, res) {
  var bookId = req.params.bookId;
  var newTitle = req.body.title;
  
  var result = await Books.updateOne({ _id : bookId }, req.body);
  
  res.redirect('/books');
}

module.exports.deleteBook = async function(req, res) {
  var bookId = req.params.bookId;
  var result = await Books.deleteOne({ _id : bookId});
  res.redirect('/books');
}

module.exports.updateBookCover = async function(req, res) {
  var bookId = req.params.bookId;
  
  var book = await Books.findOne({ _id : bookId });
  
  res.render('books/changeCover', {
    book,
  })
}

module.exports.updateBookCoverPost = async function(req, res) {
  var bookId = req.params.bookId;
  
  var result = await Books.updateOne({ _id : bookId }, { image : res.locals.cover });
  
  res.redirect("/books/update/" + req.params.bookId);
}