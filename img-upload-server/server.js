// var http = require('http');
// var url = require('url');

// function start(route, handle) {
//     function onRequest(request, response) {
//         var postData = '';
//         var pathname =url.parse(request.url).pathname;
//         console.log("Request for " + pathname + " Received!");

//         request.setEncoding('utf-8');
//         request.addListener('data', function (postDataChunk) {
//             postData += postDataChunk;
//             console.log('received post data chunk"' + postDataChunk + '".');
//         });
//         request.addListener('end', function () {
//             route(handle, pathname, response, postData);
//         });
//     };

//     http.createServer(onRequest).listen(8888);

//     console.log('server running on port 8888');
// }

// exports.start = start;

var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname =url.parse(request.url).pathname;
        console.log("Request for " + pathname + " Received!");

        route(handle, pathname, response, request);
    };

    http.createServer(onRequest).listen(8888);

    console.log('server running on port 8888');
}

exports.start = start;