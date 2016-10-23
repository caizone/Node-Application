// setTimeout(function (){
//     console.log('I execute the first!');
//     setTimeout(function (){
//         console.log('I execute the next!');
//         setTimeout(function (){
//             console.log('I execute the last!');
//         }, 100);
//     }, 500);
// }, 1000);

// 用npm包nimble实现串行流程控制
var flow = require('nimble');

flow.series([
    function (callback) {
        setTimeout(function () {
            console.log('I execute the first!');
            callback();
        }, 1000);
    },

    function (callback) {
        setTimeout(function () {
            console.log('I execute the next!');
            callback();
        }, 500);
    },

    function (callback) {
        setTimeout(function () {
            console.log('I execute the last!');
            callback();
        }, 100);
    }
]);

// 用npm包nimble实现并行流程控制
// var flow = require('nimble');

// flow.parallel([
//     function (callback) {
//         setTimeout(function () {
//             console.log('hello');
//             callback();
//         }, 3000);
//     },

//     function (callback) {
//         setTimeout(function () {
//             console.log('world');
//             callback();
//         }, 1000)
//     }
// ]);