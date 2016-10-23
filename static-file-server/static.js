/*
请求一个文件。
node接受请求，并执行读取程序
服务器读取文件，返回给node
node写入到响应中
*/

var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var root = __dirname;

var server = http.createServer(function (req, res) {
    // var path = join(root, parse(req.url).pathname);
    // var stream = fs.createReadStream(path);
    // stream.pipe(res);

    // stream.on('error', function (err) {
    //     res.statusCode = 500;
    //     res.end('internal server error!')
    // });
    
    // 用stat
    var path = join(root, parse(req.url).pathname);
    fs.stat(path, function(err, stat) {
        if(err) {
            if('ENOENT' == err.code) {
                res.statusCode = 404;
                res.end('File not found!');
            }
            else {
                res.statusCode = 500;
                res.end('Internal server error!');
            }
        }
        else {
            res.setHeader('Content-Length', stat.size);
            var stream = fs.createReadStream(path);
            stream.pipe(res);
            stream.on('error', function(err) {
                res.statusCode = 500;
                res.end('Internal server error!');
            });
        }
    });
}).listen(3000);

console.log('static file server is running...');