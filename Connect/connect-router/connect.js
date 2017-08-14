var connect = require('connect');
var router = require('./middleware/router');

var routers = {
    GET: {
        '/users': function(req, res) {
            res.end('aaaaa, bbbbbb, cccccc');
        },
        '/user/:id': function(req, res, id) {
            res.end('user ' + id);
        }
    },
    DELETE: {
        '/user/:id': function(req, res, id) {
            red.end('delete user ' + id);
        }
    }
}

connect()
    .use(router(routers))
    .listen(3000);