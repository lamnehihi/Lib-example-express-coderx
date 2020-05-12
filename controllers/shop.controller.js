var Shops = require("../models/shops.model");
var Books = require("../models/books.model");
var Users = require("../models/users.model");

module.exports.index = async function(req, res, next) {
  var user = await Users.findOne({ _id: req.signedCookies.userId });
  var shop = await Shops.findOne({ _id: user.shopId });
  var books = await Books.find({ shopId: user.shopId });

  res.render("shops/index", {
    shop,
    books
  });
};

module.exports.create = function(req, res) {
  res.render("shops/create", {});
};

module.exports.createPost = async function(req, res) {
  var result = await Shops.create(req.body);
  await Users.updateOne(
    { _id: req.signedCookies.userId },
    { $set: { shopId: result._id } }
  );
  
  res.redirect('/shops')
};
