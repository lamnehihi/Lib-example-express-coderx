var shortid = require('shortid');

var Books = require("../../models/books.model");

module.exports.index = async function(req, res, next ) {
  var books = await Books.find();
  
  res.json(books);
}

module.exports.createPost = async function(req, res) {
  req.body.image = res.locals.cover;
  var result = await Books.create(req.body);
  res.json(result);
}

module.exports.replace = async function(req, res) {
  var bookId = req.params.bookId;
  
  var result = await Books.replaceOne({ _id : bookId }, req.body);
  
  res.json(result);
}

module.exports.update = async function(req, res) {
  var bookId = req.params.bookId;
  
  var result = await Books.updateOne({ _id : bookId }, req.body);
  
  res.json(result);
}

module.exports.delete = async function(req, res) {
  var bookId = req.params.bookId;
  var result = await Books.deleteOne({ _id : bookId});
  
  res.json(result);
}

