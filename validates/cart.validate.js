
var db = require("../db");

module.exports.validateCart = function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  var errors = [];
  
  var cart = db.get('sessions').find({ id : sessionId}).value().cart;
  
  var count = 0;
  for ( var book in cart) {
    count += cart[book];
  }
  
  if(!count) {
    errors.push('Empty cart ! can\'t hire anything')
    res.render('cart', {
      errors,
      books : []
    })
    return
  }
  
  next();
}