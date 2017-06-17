var http = require('http')
var fs = require('fs')
var ecstatic = require('ecstatic')('public')
var wsock = require('websocket-stream')
var onend = require('end-of-stream')
var split = require('split2')
var to = require('to2')

var server = http.createServer(function (req, res) {
  console.log(req.method, req.url)
  if (req.method === 'GET' && req.url === '/') {
    res.setHeader('content-type', 'text/html')
    res.end('<h1>hello</h1>')
  } else ecstatic(req, res)
})
server.listen(4000)

var streams = []
wsock.createServer({ server: server }, function (stream) {
  streams.push(stream)
  onend(stream, function () {
    var ix = streams.indexOf(stream)
    streams.splice(ix,1)
  })
  stream.pipe(split()).pipe(to(function (buf, enc, next) {
    streams.forEach(function (s) {
      s.write(buf + '\n')
    })
    next()
  }))
})
