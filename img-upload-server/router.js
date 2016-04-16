// function route(handle, pathname, response, postData) {
//     console.log("About to route a request " + pathname);
//     if(typeof handle[pathname] === 'function') {
//         handle[pathname](response, postData);
//     }
//     else {
//         console.log('No Request Handle Found for' + pathname);
//         response.writeHead(404, {'Content-Type': 'text/plain'});
//         response.write('404 Not Found');
//         response.end();
//     }
// }

// exports.route = route;

function route(handle, pathname, response, request) {
    console.log("About to route a request " + pathname);
    if(typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    }
    else {
        console.log('No Request Handle Found for' + pathname);
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found');
        response.end();
    }
}

exports.route = route;