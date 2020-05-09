var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  cart: Array
});

var Sessions = mongoose.model("Sessions", sessionSchema, "Sessions");

module.exports = Sessions;
