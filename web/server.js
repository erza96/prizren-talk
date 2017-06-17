var http = require('http')
var fs = require('fs')
var ecstatic = require('ecstatic')('public')

var server = http.createServer(function (req, res) {
  console.log(req.method, req.url)
  if (req.method === 'GET' && req.url === '/') {
    res.setHeader('content-type', 'text/html')
    res.end('<h1>hello</h1>')
  } else ecstatic(req, res)
})
server.listen(4000)
