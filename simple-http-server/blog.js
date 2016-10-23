// var http = require('http');
// var fs = require('fs');

// http.createServer(function(req, res) {
//     if(req.url == '/') {
//         fs.readFile('./titles.json', function(err, data){
//             if(err) {
//                 console.error(err);
//                 res.end('Server error');
//             }
//             else {
//                 var titles = JSON.parse(data.toString());

//                 fs.readFile('./template.html', function (err, data) {
//                     if(err) {
//                         console.error(err);
//                         res.end('Server error');
//                     }
//                     else {
//                         var tmp = data.toString();

//                         var html = tmp.replace('%', titles.join('</li><li>'));

//                         res.writeHead(200, {'Content-type': 'text/html'});

//                         res.end(html);
//                     }
//                 });
//             }
//         });
//     }
// }).listen(8000, '127.0.0.1');

// console.log('Simple Http Server Running ....');

// 重构后的代码：封装函数

// var http = require('http');
// var fs = require('fs');

// http.createServer(function(req, res) {
//     getTitles(res);
// }).listen(8000, '127.0.0.1');

// function getTitles(res) {
//     fs.readFile('./titles.json', function (err, data) {
//         if(err) {
//             HandleError(res, err);
//         }
//         else {
//             getTemplate(res, JSON.parse(data.toString()));
//         }
//     })
// }

// function getTemplate(res, titles) {
//     fs.readFile('./template.html', function (err, data) {
//         if(err){
//            HandleError(res, err);
//         }
//         else{
//             renderTemplate(res, data.toString(), titles);
//         }
//     })
// }

// function renderTemplate(res, tmp, titles) {
//     var html = tmp.replace('%', titles.join('</li><li>'));

//     res.writeHead(200, {'Content-type': 'text/html'});
//     res.end(html);
// }

// function HandleError(res,err) {
//     console.log(err);
//     res.end('Server error');
// }

// console.log('Simple Http Server Running ....');


// 重构第二次：减少if/else嵌套

var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
    getTitles(res);
}).listen(8000, '127.0.0.1');

function getTitles(res) {
    fs.readFile('./titles.json', function (err, data) {
        if(err) return HandleError(res, err);        
        getTemplate(res, JSON.parse(data.toString()));
    })
}

function getTemplate(res, titles) {
    fs.readFile('./template.html', function (err, data) {
        if(err) return HandleError(res, err);
        renderTemplate(res, data.toString(), titles);
    })
}

function renderTemplate(res, tmp, titles) {
    var html = tmp.replace('%', titles.join('</li><li>'));

    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(html);
}

function HandleError(res,err) {
    console.log(err);
    res.end('Server error');
}

console.log('Simple Http Server Running ....');