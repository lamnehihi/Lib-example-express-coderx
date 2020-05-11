var md5 = require("md5");
var bcrypt = require("bcryptjs");

var Users = require("../../models/users.model");

module.exports.loginPost = async function(req, res, next) {
  var errors = [];
  var email = req.body.email;
  var password = req.body.password;

  var user = await Users.findOne({ email : email});

  if (!user) {
    errors.push("Wrong email!");
    res.json(errors);
  }

  var isRightPass = bcrypt.compareSync(password, user.password); // true

  if (!isRightPass) {
    errors.push("Wrong password!");
    res.json(errors);
  }

  res.json("login susscess!");
};

