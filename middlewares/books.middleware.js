var cloudinary = require("cloudinary");

module.exports.uploadCover = async function(req, res, next) {
  if (req.file) {
    cloudinary.config({
      cloud_name: "lamnehihi",
      api_key: "754463431636487",
      api_secret: "baJlIxvTKPQ6hadS_LuKaujj0bk"
    });

    var avatar = await cloudinary.v2.uploader.upload(
      req.file.path,
      {
        public_id: "cover_" + req.params.bookId,
        folder: "Library/books/" + req.params.bookId,
        width: 500,
        height: 1000,
        crop: "limit"
      },
      function(error, result) {
        res.locals.cover = result.secure_url;
      }
    );
  }

  next();
};
