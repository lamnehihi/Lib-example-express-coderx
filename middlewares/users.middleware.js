var cloudinary = require("cloudinary");

var Users = require("../models/users.model");

module.exports.requireAuth = async function(req, res, next) {
  var userId = req.signedCookies.userId;

  if (!userId) {
    res.redirect("/auth/login");
    return;
  }

  var user = await Users.findOne({ _id: userId });
  if (!user) {
    res.redirect("/auth/login");
    return;
  }

  if (!req.signedCookies.sessionId) {
    res.redirect("/");
  }

  if (!user.sessionId) {
    user.sessionId = req.signedCookies.sessionId;
  }

  res.cookie("sessionId", user.sessionId, {
    signed: true
  });
  try {
    var result = await Users.updateOne(
      { _id: userId },
      { $set: { sessionId: req.signedCookies.sessionId } }
    );
  } catch (error) {
    console.log(error);
  }

  res.locals.user = user;
  next();
};

module.exports.uploadImg = async function(req, res, next) {
  if (req.file) {
    cloudinary.config({
      cloud_name: "lamnehihi",
      api_key: "754463431636487",
      api_secret: "baJlIxvTKPQ6hadS_LuKaujj0bk"
    });

    var avatar = await cloudinary.v2.uploader.upload(
      req.file.path,
      {
        public_id: "avatar_" + req.params.userId,
        folder: "Library/userAvatar/" + req.params.userId,
        width: 1000,
        height: 1000,
        crop: "limit"
      },
      function(error, result) {
        res.locals.avatar = result.secure_url;
      }
    );
  } else {
    res.locals.avatar =
      "https://res.cloudinary.com/lamnehihi/image/upload/v1588732086/avatar_urnlxj.png";
  }

  next();
};
