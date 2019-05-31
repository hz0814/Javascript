const http = require('http');
var fs = require('fs');

http
  .createServer(function (req, res) {
    var url=req.url;
    if(url==='/'){
      fs.readFile()
    }
  })
  .listen(3000, function () {
    console.log('running');
  })