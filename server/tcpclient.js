var net = require('net')
var host = process.argv[2]
var stream = net.connect(5000, host)
process.stdin
  .pipe(stream)
  .pipe(process.stdout)
