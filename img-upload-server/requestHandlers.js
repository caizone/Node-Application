// var exec = require('child_process').exec;

// function start(response) {
//     console.log('Request handle start is called');
//     exec('find /', 
//         {timeout: 10000, maxBuffer: 20000*1024},
//         function (error, stdout, stderr) {
//             response.writeHead(200, {'Content-Type': 'text/plain'});
//             response.write(stdout);
//             response.end();
//     });
// }

// function upload(response) {
//     console.log('Request handle upload is called');
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.write('Hello Upload');
//     response.end();
// }

// exports.start = start;
// exports.upload = upload;

// var exec = require('child_process').exec;
// var querystring = require('querystring');

// function start(response) {
//     console.log('Request handle start is called');
//     var body = '<html>'+
//     '<head>'+
//     '<meta http-equiv="Content-Type" content="text/html; '+
//     'charset=UTF-8" />'+
//     '</head>'+
//     '<body>'+
//     '<form action="/upload" method="post">'+
//     '<textarea name="text" rows="20" cols="60"></textarea>'+
//     '</br>'+
//     '<input type="submit" value="提交" />'+
//     '</form>'+
//     '</body>'+
//     '</html>';

//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.write(body);
//     response.end();
// }

// function upload(response, postData) {
//     console.log('Request handle upload is called');
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.write(querystring.parse(postData).text);
//     response.end();
// }

// exports.start = start;
// exports.upload = upload;

var querystring = require('querystring');
var fs          = require('fs');
var formidable  = require('formidable');

function start(response) {
    console.log('Request handle start is called');
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="上传" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log('Request handle upload is called');
    var form = new formidable.IncomingForm();
    console.log('about to start');
    form.parse(request, function (error, fields, files) {
        console.log('parse end');
        fs.renameSync(files.upload.path, '/tmp/test.png');
        response.writeHead(200, {'Content-type': 'text/html'});
        response.write('received image:<br/>');
        response.write('<img src="/show" />');
        response.end();
    });
}

function show(response) {
    console.log('Request handle "show" is called');
    fs.readFile('/tmp/test.png', 'binary', function (error ,file) {
        if(error) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write(error + '\n');
            response.end();
        }
        else {
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.write(file, 'binary');
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;