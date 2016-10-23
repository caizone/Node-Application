var http = require('http');
var url = require('url');
var formidable = require('formidable');

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'GET':
            show(res);
            break;

        case 'POST':
            upload(req, res);
            break;
    }
}).listen('3000');

console.log('Server is running...');

function show(res) {
    var html = '<form method="POST" action="/" enctype="multipart/form-data">'
        + '<input type="text" name="name" />'
        + '<input type="file" name="file" />'
        + '<input type="submit" value="upload file" />'
        + '</form>';

    res.setHeader('Content-type', 'text/html');
    res.setHeader('Content-length', Buffer.byteLength(html));
    res.end(html);
}

function upload(req, res) {
    if(!isFormData(req)) {
        res.statusCode = 400;
        res.end('Bad Request: expecting multipart/form-data');
        return;
    }

    var form = new formidable.IncomingForm();
    form.on('progress', function(byteReceived, byteExpected) {
        var progress = Math.floor(byteReceived/byteExpected * 100) + '%';
        console.log(progress);
    });
    form.parse(req, function (err, fields, files) {
        if(err) throw err;
        console.log(fields);
        console.log(files);
        res.end('upload completed');
    });
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data')
}