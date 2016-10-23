// var net = require('net');

// var server = net.createServer(function (socket) {
//     socket.on('data', function (data) {
//         data = 'node.js' + data;
//         socket.write(data);
//     })
// })

// server.listen(8000);



// 只响应一次的事件发射器
var net = require('net');

var server = net.createServer(function (socket) {
    socket.once('data', function (data) {
        data = 'node.js' + data;
        socket.write(data);
    })
})

server.listen(8000);