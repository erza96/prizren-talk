var net = require('net')
var server = net.createServer(function (stream) {
  stream.pipe(process.stdout)
  stream.write('hello!\n')
})
server.listen(5000)
