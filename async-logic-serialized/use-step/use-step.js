var step = require('step');

step(
    function () {
        setTimeout(function (){
            console.log('I execute the first!');
            // this;
        }, 1000);
    },

    function () {
        setTimeout(function (){
            console.log('I execute the next!');
        }, 500);
    },

    function () {
        setTimeout(function () {
            console.log('I execute the last!');
            this;
        }, 100);
    }
);