var Transactions = require("../models/transactions.model");
var Users = require("../models/users.model");
var Books = require("../models/books.model");

module.exports.index = async function(req, res, next) {
  var transactions = await Transactions.find();
  var users = [];
  for (var transaction of transactions) {
    var user = await Users.findOne({ _id: transaction.userId });
    users.push(user);
  }

  var books = [];
  for (var transaction of transactions) {
    var booksFilter = [];
    for (var id of transaction.books) {
      var book = await Books.findOne({ _id: id });
      booksFilter.push(book);
    }
    books.push(booksFilter);
  }
  

  res.render("transactions/index", {
    transactions,
    users,
    books,
    x: 0
  });
};

module.exports.createTransaction = async function(req, res, next) {
  var users = await Users.find();
  var books = await Books.find();

  res.render("transactions/createTransaction", {
    users,
    books
  });
};

module.exports.createTransactionPost = async function(req, res, next) {
  var userId = req.body.user.split(" ").pop();
  var bookId = req.body.book.split(" ").pop();
  var books = [];
  books.push(bookId);

  var transaction = {
    userId: userId,
    books: books,
    isComplete: false
  };

  var result = await Transactions.create(transaction);

  res.redirect("/transactions");
};

module.exports.completeTransaction = async function(req, res, next) {
  var transactionId = req.params.transactionId;
  
  var result = await Transactions.updateOne({ _id : transactionId}, { isComplete: true });
  
  res.redirect("/transactions");
};
