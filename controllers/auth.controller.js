var low = require('lowdb');

var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

module.exports.login = function(req, res) {
  res.render('auth/login', {
  });
}

module.exports.loginPost = function(req, res) {
  var errors = [];
  var email = req.body.email;
  var password = req.body.password;
  
  var user = db.get('users').find({ email : email}).value();
  
  if(!user) {
    errors.push('Wrong email!');
    res.render('auth/login', {
      errors
    });
  }
  
  if(password !== user.password) {
    errors.push('Wrong password!');
    res.render('auth/login', {
      errors
    });
  }
  
  res.cookie('userId', user.id);
  
  res.redirect('/users');
}