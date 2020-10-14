let a = Buffer.from('你好123')
console.log(a.toString())

var fs = require('fs')
var fd = fs.openSync('./test.txt','w')
fs.writeSync(fd,'hello world!')