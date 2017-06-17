var fs = require('fs')
var inputfile = process.argv[2]
var outfile = process.argv[3]

fs.readFile(inputfile, 'utf8', function (err, body) {
  if (err) return console.error(err)
  var newbody = body.toUpperCase()
  fs.writeFile(outfile, newbody, function (err) {
    if (err) return console.error(err)
    console.log('ok')
  })
})
