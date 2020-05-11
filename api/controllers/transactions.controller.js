var Transactions = require("../../models/transactions.model");

module.exports.index = async function(req, res, next) {
  var transactions = await Transactions.find();
  
  res.json(transactions)
};