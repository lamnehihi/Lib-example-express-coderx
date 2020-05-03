var low = require('lowdb');
var shortid = require('shortid');

var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

module.exports.index = function(req, res, next) {
  var users = db.get('users').value();
  res.render('users/index', {
    users
  });
}

module.exports.createUser = function(req, res) {
  res.render('users/createUser', {
  })
}

module.exports.createUserPost = function(req, res) {
  req.body.id = shortid.generate();
  req.body.cart = {};
  db.get('users')
    .push(req.body)
    .write();
  res.redirect('/users');
}

module.exports.updateUser = function(req, res) {
  var userId = req.params.userId;
  var user = db
      .get('users')
      .find({ id: userId })
      .value()
  res.render('users/updateUser', {
    user,
  })
}

module.exports.updateUserPost = function(req, res) {
  var userId = req.params.userId;
  var name = req.body.name;
  //
  db.get('users')
  .find({ id: userId })
  .assign({ name: name})
  .write()
  res.redirect('/users');
}

module.exports.deleteUser = function(req, res) {
  var userId = req.params.userId;
  db.get('users')
    .remove({ id: userId })
    .write()
  res.redirect('/users');
}