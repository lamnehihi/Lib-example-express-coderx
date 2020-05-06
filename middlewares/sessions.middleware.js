var shortid = require("shortid");

module.exports.requireSession = function(req, res, next) {
  var cookie = req.signedCookies;
  var sessionId = shortid.generate();
  
  if(!cookie.sessionId) {
    res.cookie('sessionId', sessionId, {
      signed : true
    });
    res.redirect("/");
  }
  
  res.locals.sessionId = sessionId;
  
  next();
}