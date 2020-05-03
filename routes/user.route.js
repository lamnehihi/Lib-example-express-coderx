var express = require("express");
var router = express.Router();
var controller = require('../controllers/user.controller');

router.get(
  "/",
  controller.index
)

router.get(
  "/create",
  controller.createUser
)

router.post(
  "/create",
  controller.createUserPost
)

router.get(
  "/update/:userId",
  controller.updateUser
)

router.post(
  "/update/:userId",
  controller.updateUserPost
)

router.get(
  "/delete/:userId",
  controller.deleteUser
)

module.exports = router;