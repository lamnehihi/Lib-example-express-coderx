var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  priority: String,
  sessionId : String
});

var Users = mongoose.model("Users", userSchema, "Users");

module.exports = Users;
