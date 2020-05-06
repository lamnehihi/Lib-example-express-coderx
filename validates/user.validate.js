var low = require('lowdb');

var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

module.exports.validateName = function(req, res, next) {
  var name = req.body.name;
  var errors = [];
  
  if(name) {
    if(name.split('').length > 30) {
      errors.push('Invalid Name!');
    }
  }
  
  if(!name) {
      errors.push('Require name!');
  }
  
  if(!req.body.email) {
      errors.push('Require email!');
  }
  
  if(!req.body.password) {
      errors.push('Require password!');
  }
  
  var users = db.get('users').value();
  
  var isEmailExist = db.get('users').find({ email : req.body.email}).value();
  
  if(isEmailExist) {
    errors.push('This email has used before!');
  }
  
  if(errors.length) {
    res.render('users/createUser', {
      errors,
      users
    })
    return
  }
  
  res.locals.email = req.body.email;
  next();
}