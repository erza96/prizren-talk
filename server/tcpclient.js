var net = require('net')
var stream = net.connect(5000)
process.stdin
  .pipe(stream)
  .pipe(process.stdout)
