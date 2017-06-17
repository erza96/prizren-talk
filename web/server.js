var http = require('http')
var server = http.createServer(function (req, res) {
  console.log(req.method, req.url)
  if (req.method === 'GET' && req.url === '/') {
    res.setHeader('content-type', 'text/html')
    res.end('<h1>hello</h1>')
  } else {
    res.statusCode = 404
    res.end('not found')
  }
})
server.listen(4000)
