// 生成私钥 openssl genrsa 1024 > key.pem
// 生成证书 openssl req -x509 -new -key key.pem > key-cert.pem
// 配置https服务器

var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./key-cert.pem')
}

var server = https.createServer(options, function (req, res){
    res.writeHead(2000);
    res.end('Hello World\n');
}).listen('3000');

console.log('Https Server is Running...');