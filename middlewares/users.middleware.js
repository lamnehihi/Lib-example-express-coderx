var cloudinary = require("cloudinary");
var db = require("../db");

module.exports.requireAuth = function(req, res, next) {
  var userId = req.signedCookies.userId;

  if (!userId) {
    res.redirect("/auth/login");
    return;
  }

  var user = db
    .get("users")
    .find({ id: userId })
    .value();
  if (!user) {
    res.redirect("/auth/login");
    return;
  }
  
  if (!req.signedCookies.sessionId) {
    res.redirect("/");
  }
  
  if(!user.sessionId){
    user.sessionId = req.signedCookies.sessionId;
  }
  
  res.cookie('sessionId', user.sessionId, {
      signed : true
    });

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
        public_id: "avatar_" + res.locals.email,
        folder: "Library/userAvatar/" + res.locals.email
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

