var low = require('lowdb');

var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

module.exports.validateId = function(req, res, next) {
  var transactionId = req.params.transactionId;
  var errors = [];
  
  var transaction = db.get('transactions').find({ id : transactionId}).value();
  var transactions = db.get('transactions').value();
  if(!transaction) {
    errors.push('Invalid Id!');
  }
  
  if(errors.length) {
    res.render('transactions/index', {
      errors
    })
    return
  }
  
  next();
}