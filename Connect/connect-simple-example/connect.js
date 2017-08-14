var connect = require('connect');

function logger(req, res, next) {
  console.log('%s %s', req.url, req.method);
  next();
}

function hello(req, res) {
  res.setHeader('Content-type', 'text/plain');
  res.end('Hello World');
}

connect()
  .use(logger)
  .use(hello)
  .listen(3000)