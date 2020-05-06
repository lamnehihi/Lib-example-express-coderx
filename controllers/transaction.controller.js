var shortid = require('shortid');

var db = require('../db');

module.exports.index = function(req, res, next) {
  var transactions = db.get('transactions').value();
  var users = [];
  for(var transaction of transactions) {
     var user = db.get('users').find({ id : transaction.userId }).value();
    users.push(user);
  }
  
  var books = [];
  for(var transaction of transactions) {
    var booksFiler = [];
    for(var id in transaction.books) {
      var book = db.get('books').find({ id : id }).value();
      book.quantity = transaction.books[id];
      booksFiler.push(book);
    }
    books.push(booksFiler);
  }

  
  res.render('transactions/index', {
    transactions,
    users,
    books,
    x : 0
  });
}

module.exports.createTransaction = function(req, res, next) {
  var users = db.get('users').value();
  var books = db.get('books').value();
  
  res.render('transactions/createTransaction', {
    users,
    books
  })
}

module.exports.createTransactionPost = function(req, res, next) {
  var id = shortid.generate();
  
  console.log(req.body)
  var userId = req.body.user.split(' ').pop();
  var bookId = req.body.book.split(' ').pop();
  var books = {}
  books[bookId] = '1';


  var transaction = {
    id : id,
    userId : userId,
    books : books
  }
  
   console.log(transaction)
  db.get('transactions')
  .push(transaction)
  .write()
  
  res.redirect("/transactions")
}

module.exports.completeTransaction = function(req, res, next) {
  var transactionId = req.params.transactionId;
  console.log(transactionId);
  db.get('transactions')
  .find({ id : transactionId })
  .assign({isComplete : true})
  .write();
  res.redirect('/transactions');
}