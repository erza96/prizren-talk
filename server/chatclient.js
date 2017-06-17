var net = require('net')
var split = require('split2')
var through = require('through2')
var host = process.argv[2]
var nick = process.argv[3]

var stream = net.connect(5000, host)
process.stdin
  .pipe(split())
  .pipe(through(function (buf, enc, next) {
    next(null, '<'+nick+'> ' + buf + '\n')
  }))
  .pipe(stream)
  .pipe(process.stdout)
