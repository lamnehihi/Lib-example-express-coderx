var shortid = require("shortid");

var db = require("../db");

module.exports.requireSession = function(req, res, next) {
  var cookie = req.signedCookies;

  if (!cookie.sessionId) {
    var sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true
    });

    var session = {
      id: sessionId,
      cart: {}
    };

    db.get("sessions")
      .push(session)
      .write();

    res.redirect("/");
  }

  res.locals.sessionId = cookie.sessionId;

  next();
};

module.exports.count = function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;

  var session = db
    .get("sessions")
    .find({ id : sessionId })
    .value();
  
  //count total books in cart
  var totalInCart = 0;
  if(session){
    for(var book in session.cart) {
      totalInCart += session.cart[book];
    }
  }
  res.locals.total = totalInCart;
  next();
};
