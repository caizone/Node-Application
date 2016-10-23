var http = require('http');
var qs = require('querystring');
var url = require('url');
var items = [];

var server = http.createServer(function (req, res) {
    // if(req.url == '/') {
        switch (req.method) {
            case 'GET':
                show(res);
                break;

            case 'POST':
                add(req, res);
                break;

            case 'DELETE':
                del(req, res);
                break;

            default:
                badRequest(res);
        }
    // }
    // // else {
    // //     notFound(res);
    // // }
}).listen('3000');

console.log('Server is running...');

function show(res) {
    console.log('show函数里面的items:, ', items);
    var html = '<html><head><title>node-html-form</title></head><body>'
        + '<h1>TODO LIST</h1>'
        + '<ul>'
        + items.map(function (item) {
            return '<li>' + item +'</li>'
            }).join('')
        + '</ul>'
        + '<form method="POST" action="/" autocomplete=off>'
        + '<input type="text" name="item" value=""/>'
        + '<input type="submit" value="add item" />'
        + '</form>'
        + '</body></html>';

    res.setHeader('Content-type', 'text/html');
    res.setHeader('Content-length', Buffer.byteLength(html));
    res.end(html);
}

function add(req, res) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        var obj = qs.parse(body);
        items.push(obj.item);
        console.log('add函数里面的item: ', obj.item)
        show(res);
    });
}

function del(req, res) {
    var path = url.parse(req.url).pathname;
    var i = parseInt(path.slice(1), 10);

    if(isNaN(i)) {
        res.statusCode = 400;
        res.setHeader('Content-type', 'text/plain');
        res.end('Invalid request url');
    }
    else if(!items[i]) {
        res.statusCode = 404;
        res.setHeader('Content-type', 'text/plain');
        res.end('item not found');
    }
    else {
        items.splice(i, 1);
        show(res);
    }
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/plain');
    res.end('Not found');
}

function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-type', 'text/plain');
    res.end('Bad request');
}