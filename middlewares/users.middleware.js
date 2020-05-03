var low = require('lowdb');

var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

module.exports.requireLogin = function(req, res, next) {
  res.render('auth/login', {
  })
  
  next();
}

module.exports.requireAuth = function(req, res, next) {
  var userId = req.cookies.userId;
  
  if(!userId) {
    res.redirect('/auth/login');
    return;
  }
  
  var user = db.get('users').find({ id : userId}).value();
  console.log(user);
  if(!user) {
    res.redirect('/auth/login');
    return;
  }
  
  res.locals.user = user;
  next();
}