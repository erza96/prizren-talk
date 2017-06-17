var fs = require('fs')
fs.readFile('hello.txt', 'utf8', function (err, body) {
  console.log(body)
})
