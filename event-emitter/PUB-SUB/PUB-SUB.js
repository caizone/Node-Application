var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

// listen to join event
channel.on('join', function(id, client){
    var welcome = 'welcome!\n' + 'Guests online: ' + this.listeners('broadcast').length;
    client.write(welcome + '\n');
    this.clients[id] = client;
    this.subscriptions[id] = function (senderId, message) {
        if(id != senderId) {
            this.clients[id].write(message);
        }
    }
    this.on('broadcast', this.subscriptions[id]);
});

// listen to leave event
channel.on('leave', function(id){
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + "has left the chat.\n");
});

// listen to shutdown event
channel.on('shutdown', function() {
    channel.emit('broadcast', '', 'All chat has closed');
    channel.removeAllListeners('broadcast');
});

var server = net.createServer(function (client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    client.on('connect', function () {
        channel.emit('join', id, client);
    });

    client.on('data', function (data) {
        data = data.toString();
        if(data == "shutdown\r\n"){
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data);
    });

    client.on('close', function (){
        channel.emit('leave', id);
    });
});

server.listen(8000);

console.log('server is running.....');