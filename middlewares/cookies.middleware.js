module.exports.requireCookie = function(req, res, next) {
  var cookie = req.cookies;
  if(!cookie.cookieId) {
    res.cookie('cookieId', '12345');
    res.redirect("/");
  }
  
  next();
}