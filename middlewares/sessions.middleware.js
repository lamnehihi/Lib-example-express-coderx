var db = require("../db");
var Sessions = require("../models/sessions.model");


module.exports.requireSession = async function(req, res, next) {
  var cookie = req.signedCookies;

  if (!cookie.sessionId) {
    var session = {
      cart: {}
    };
    
    var result = await Sessions.create(session);

    res.cookie("sessionId", result.id, {
      signed: true
    });

    res.redirect("/");
  }

  res.locals.sessionId = cookie.sessionId;

  next();
};

module.exports.count = function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;

  var session = db
    .get("sessions")
    .find({ id: sessionId })
    .value();

  //count total books in cart
  var totalInCart = 0;
  if (session) {
    for (var book in session.cart) {
      totalInCart += session.cart[book];
    }
  }
  res.locals.total = totalInCart;
  next();
};
