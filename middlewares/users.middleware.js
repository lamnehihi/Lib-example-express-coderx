var cloudinary = require("cloudinary");
var low = require("lowdb");

var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("db.json");
var db = low(adapter);

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

  res.locals.user = user;
  next();
};

module.exports.uploadImg = async function(req, res, next) {
  cloudinary.config({
    cloud_name: "lamnehihi",
    api_key: "754463431636487",
    api_secret: "baJlIxvTKPQ6hadS_LuKaujj0bk"
  });

  var avatar = await cloudinary.v2.uploader.upload(
    req.file.path,
    { public_id: "avatar_" + res.locals.email },
    function(error, result) {
      console.log(result);
      avatar = result.secure_url;
      console.log("avatar : " + avatar);
      res.locals.avatar = avatar;
    }
  );
  
  next()
  
};
