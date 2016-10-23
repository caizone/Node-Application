// 定义watcher类
function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

var events = require('events')
var util = require('util');

// Watcher继承events.EventEmitter
util.inherits(Watcher, events.EventEmitter);

// 扩展Watcher的功能
var fs = require('fs');
var watchDir = './watch';
var processedDir = './done';

Watcher.prototype.watch = function () {
    var watcher = this;
    fs.readdir(this.watchDir, function (err, files){
        if(err) throw err;
        for(var index in files) {
            watcher.emit('process', files[index]);
        }
    })
}

Watcher.prototype.start = function () {
    var watcher = this;
    fs.watchFile(watchDir, function() {
        watcher.watch();
    })
}

// 创建Watcher的实例
var watcher = new Watcher(watchDir, processedDir);

watcher.on('process', function process (file){
    var watchFile = watchDir + '/' + file;
    var processedFile = processedDir + '/' + file.toLowerCase();

    // rename
    // fs.rename(watchFile, processedFile, function (err) {
    //     if(err) throw err;
    // })

    // 复制
    fs.createReadStream(watchFile).pipe(fs.createWriteStream(processedFile));
});

watcher.start();
