var mongoose = require("mongoose");

var shopSchema = new mongoose.Schema({
  name: String,
  description: String,
});

var Shops = mongoose.model("Shops", shopSchema, "Shops");

module.exports = Shops;
