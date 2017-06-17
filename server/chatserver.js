var net = require('net')
var onend = require('end-of-stream')
var split = require('split2')
var to = require('to2')

var streams = []
var server = net.createServer(function (stream) {
  streams.push(stream)
  onend(stream, function () {
    var ix = streams.indexOf(stream)
    streams.splice(ix,1)
  })
  stream.pipe(split()).pipe(to(function (buf, enc, next) {
    streams.forEach(function (s) {
      if (s !== stream) s.write(buf + '\n')
    })
    next()
  }))
})
server.listen(5000)
