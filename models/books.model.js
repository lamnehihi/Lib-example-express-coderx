var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

var Books = mongoose.model("Books", userSchema, "Books");

module.exports = Books;
