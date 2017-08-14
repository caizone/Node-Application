var parse = require('url').parse;
function reg(path) {
  path = path.replace(/\//g, '\\/').replace(/:(\w+)/g, '([^\\/]+)');
  return new RegExp('^' + path + '$');
};

module.exports = function (obj) {
  return function (req, res, next) {
    if (!obj[req.method]) {
      next();
      return;
    }

    var routers = obj[req.method];
    var url = parse(req.url);
    var paths = Object.keys(routers);

    for (var i=0; i < paths.length; i++) {
      var path = paths[i];
      var fn = routers[path];

      var re = reg(path);
      var captures = url.pathname.match(re);
      if (captures) {
        var args = [req, res].concat(captures.slice(1));
        fn.apply(null, args);
        return;
      } else {
        next();
      }
    }
  }
}