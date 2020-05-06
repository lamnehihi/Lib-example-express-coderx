var db = require('../db');

module.exports.add = function(req, res) {
  var bookId = req.params.bookId
  var sessionId = res.locals.sessionId;
  var session = db.get('sessions')
                  .find({ id : sessionId})
                  .value();
  console.log(session);
  //add book to cart
  var cart = session.cart;
  if(bookId in cart) {
    cart[bookId] += 1;
  }else {
    cart[bookId] = 1;
  }
  
  db.get('sessions')
    .find({ id : sessionId})
    .assign({cart : cart})
    .write()
  
  res.redirect('/books')
};