var low = require('lowdb');
var shortid = require('shortid');

var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);


module.exports.index = function(req, res, next ) {
  var page = req.query.page || 1;
  console.log(page);
  var perPage = 6;
  var start = (page-1) * perPage;
  var end = start + perPage;
  
  res.render('books/index', {
    books : db.get('books').value().slice(start, end),
    page
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