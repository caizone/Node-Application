var fs = require('fs');

fs.readFile('log.txt', function (err, logData) {
    if(err) throw err;

    var text = logData.toString();

    var lines = text.split('\n');

    var results = {};

    lines.forEach(function (line) {
        var parts = line.split(' ');
        var letter = parts[1];
        var value = parseInt(parts[2]);
        // console.log(value);

        // if(!results[letter]) {
        //     results[letter] = 0；
        // }

        // console.log();
        if(results[letter]) {
            results[letter] += value;
        }
        else {
            results[letter] = value;
        }
    });

    console.log(results);
});