var flow = require('nimble');
var exec = require('child_process').exec;

function downloadNodeVersion(version, destination, callback) {
    var url = 'http://nodejs.org/dist/' + 'v'+ version + '/node-v' + version + '.tar.gz';
    var filepath = destination + '/' + version + '.tgz';
    exec('curl ' + url + '>' + filepath, callback);
}

flow.series([
    function (callback) {
        flow.parallel([
            function (callback) {
                console.log('Downloading node 4.5.0...');
                downloadNodeVersion('4.5.0', '/tmp', callback);
            },

            function (callback) {
                console.log('Downloading node 6.4.0...');
                downloadNodeVersion('6.4.0', '/tmp', callback);
            }
        ], callback);
    },

    function (callback) {
        console.log('Createing archive of downloaded files...');
        exec(
            'tar cvf node_distors.tar /tmp/4.5.0.tgz /tmp/6.4.0.tgz',
            function (error, stdout, stderr) {
                console.log('All done!');
                callback();
            }
        );
    }
]);