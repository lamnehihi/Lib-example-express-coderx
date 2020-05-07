var db = require("../db");

module.exports.index = function(req, res) {
  var cart = db
    .get("sessions")
    .find({ id: req.signedCookies.sessionId })
    .value().cart;

  //books array
  var books = [];
  for (var book in cart) {
    var bookk = db
      .get("books")
      .find({ id: book })
      .value();
    bookk.quantity = cart[book];
    books.push(bookk);
  }

  res.render("cart/index", {
    books
  });
};

module.exports.add = function(req, res) {
  var bookId = req.params.bookId;
  var sessionId = res.locals.sessionId;
  var session = db
    .get("sessions")
    .find({ id: sessionId })
    .value();
  //add book to cart
  var cart = session.cart;
  if (bookId in cart) {
    cart[bookId] += 1;
  } else {
    cart[bookId] = 1;
  }

  db.get("sessions")
    .find({ id: sessionId })
    .assign({ cart: cart })
    .write();

  res.redirect("/books");
};

module.exports.delete = function(req, res) {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;

  var session = db
    .get("sessions")
    .find({ id: sessionId })
    .value();

  //add book to cart
  var cart = session.cart;

  delete cart[bookId];

  db.get("sessions")
    .find({ id: sessionId })
    .assign({ cart: cart })
    .write();

  res.redirect("/cart");
};
