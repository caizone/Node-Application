function logger(format) {
  var regexp = /:(\w+)/g;

  return function(req, res, next) {
    var str = format.replace(regexp, function (match, property) {
      return req[property];
    });

    console.log(str);
    next();
  }
}

module.exports = logger;