var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  cart: Object
});

var Sessions = mongoose.model("Sessions", sessionSchema, "Sessions");

module.exports = Sessions;
