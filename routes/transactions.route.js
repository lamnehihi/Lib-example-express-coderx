var express = require("express");
var router = express.Router();
var controller = require('../controllers/transaction.controller');

router.get(
  "/",
  controller.index
)

router.get(
  "/create",
  controller.createTransaction
)

router.post(
  "/create",
  controller.createTransactionPost
)

router.get(
  "/:transactionId/complete",
  controller.completeTransaction
)


module.exports = router;