var express = require("express");
var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validates/user.validate');
var usersMiddleware = require('../middlewares/users.middleware');

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
  validate.validateName,
  controller.createUserPost
)

router.get(
  "/update/:userId",
  controller.updateUser
)

router.post(
  "/update/:userId",
  validate.validateName,
  controller.updateUserPost
)

router.get(
  "/delete/:userId",
  controller.deleteUser
)

module.exports = router;