module.exports.requireCookie = function(req, res, next) {
  var cookie = req.signedCookies;
  if(!cookie.cookieId) {
    res.cookie('cookieId', '12345', {
      signed : true
    });
    res.redirect("/");
  }
  
  next();
}