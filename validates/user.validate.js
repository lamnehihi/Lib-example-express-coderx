var low = require('lowdb');

var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

module.exports.validateName = function(req, res, next) {
  var name = req.body.name;
  var errors = [];
  
  if(name.split('').length > 30) {
    errors.push('Invalid Name!');
  }
  
  var users = db.get('users').value();
  if(errors.length) {
    res.render('users/createUser', {
      errors,
      users
    })
    return
  }
  
  next();
}