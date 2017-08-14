var connect = require('connect');
var logger = require('./middleware/logger');

connect()
  .use(logger(':method :url'))
  .listen(3000);