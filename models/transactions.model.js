var mongoose = require("mongoose");

var transactionSchema = new mongoose.Schema({
  userId: String,
  books: Array,
  isComplete: Boolean
});

var Transactions = mongoose.model("Transactions", transactionSchema, "Transactions");

module.exports = Transactions;
