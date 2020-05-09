var express = require("express");
var multer = require("multer");

var upload = multer({ dest: "./public/uploads/" });
var router = express.Router();

var controller = require("../controllers/user.controller");
var validate = require("../validates/user.validate");
var usersMiddleware = require("../middlewares/users.middleware");
var sessionsMiddleware = require("../middlewares/sessions.middleware");

var Users = require("../models/users.model");

router.get("/", controller.index);

router.get("/create", controller.createUser);

router.post(
  "/create",
  upload.single("avatar"),
  validate.validateName,
  usersMiddleware.uploadImg,
  controller.createUserPost
);

router.get("/update/:userId", controller.updateUser);

router.post("/update/:userId", controller.updateUserPost);

router.get("/delete/:userId", controller.deleteUser);

router.get("/profile", controller.profile);

router.get("/profile/avatar", controller.avatar);

router.post(
  "/profile/avatar/:userId",
  upload.single("avatar"),
  usersMiddleware.uploadImg,
  controller.avatarPost
);

module.exports = router;
