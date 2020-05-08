var shortid = require("shortid");
var bcrypt = require("bcryptjs");
var db = require('../db');


module.exports.index = function(req, res, next) {
  var user = res.locals.user;
  if(user.priority == 1) {
    var users = db.get("users").value();
  }
 
  res.render("users/index", {
    user,
    users
  });
};

module.exports.createUser = function(req, res) {
  res.render("users/createUser", {});
};

module.exports.createUserPost = function(req, res) {
  req.body.id = shortid.generate();
  req.body.cart = {};
  req.body.avatar = res.locals.avatar;
  req.body.priority = "3";                //1 == Admin . 2 == staff . 3 == user . 4 == banned
  
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);
  
  req.body.password = hash;

  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};

module.exports.updateUser = function(req, res) {
  var userId = req.params.userId;
  var user = db
    .get("users")
    .find({ id: userId })
    .value();
  res.render("users/updateUser", {
    user
  });
};

module.exports.updateUserPost = function(req, res) {
  var userId = req.params.userId;
  var name = req.body.name;
  //
  db.get("users")
    .find({ id: userId })
    .assign({ name: name })
    .write();
  res.redirect("/users");
};

module.exports.deleteUser = function(req, res) {
  var userId = req.params.userId;
  db.get("users")
    .remove({ id: userId })
    .write();
  res.redirect("/users");
};

module.exports.updateUserPost = function(req, res) {
  var userId = req.params.userId;
  var name = req.body.name;
  //
  db.get("users")
    .find({ id: userId })
    .assign({ name: name })
    .write();
  res.redirect("/users");
};

module.exports.profile = function(req, res) {
  var userId = req.signedCookies.userId;
  
  res.render("users/profile", {
    user : db.get('users').find({ id : userId }).value()
  });
};

module.exports.avatar = function(req, res) {
  res.render("users/changeAvatar", {
  });
};

module.exports.avatarPost = function(req, res) {
  db.get("users")
    .find({ id : req.signedCookies.userId })
    .assign({avatar : res.locals.avatar})
    .write();
  res.redirect("/users/profile");
};