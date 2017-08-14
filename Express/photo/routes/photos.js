var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

// list
exports.list = function (req, res, next) {
  Photo.find({}, function (err, photos) {
    if (err) return next(err);

    res.render('photos', {
      title: 'Photos',
      photos: photos
    });
  });
}

// upload form
exports.form = function (req, res) {
  res.render('photos/upload', {
    title: 'Photo upload'
  });
}

// upload submit
exports.submit = function (dir) {
  return function(req, res, next) {
    console.log('req.files: ', req.files);
    var img = req.files.photoImage;
    var name = req.body.photoName || img.name;
    var path = join(dir, img.name);

    fs.rename(img.path, path, function (err) {
      if (err) return next(err);

      Photo.create({
        name: name,
        path: img.name
      }, function (err) {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  };
};

// download img
exports.download = function (dir) {
  return function (req, res, next) {
    var id = req.params.id;
    Photo.findById(id, function (err, photo) {
      if (err) return next(err);
      console.log('download photo: ', photo);
      var path = join(dir, photo.path);
      res.download(path, photo.name + '.jpeg');
    });
  }
}

