var md5 = require("md5");
var bcrypt = require("bcryptjs");

var db = require('../db');
var Users = require("../models/users.model");

module.exports.login = function(req, res) {
  res.render("auth/login", {});
};

module.exports.loginPost = async function(req, res, next) {
  var errors = [];
  var email = req.body.email;
  var password = req.body.password;

  var user = await Users.findOne({ email : email});

  if (!user) {
    errors.push("Wrong email!");
    res.render("auth/login", {
      errors
    });
  }

  var isRightPass = bcrypt.compareSync(password, user.password); // true

  if (!isRightPass) {
    errors.push("Wrong password!");
    res.render("auth/login", {
      errors
    });
  }

  res.cookie("userId", user.id, {
    signed: true
  });

  res.redirect("/users");
};

module.exports.logout = function(req, res) {
  res.clearCookie("userId");
  res.clearCookie("sessionId");
  res.redirect("auth/login");
};
