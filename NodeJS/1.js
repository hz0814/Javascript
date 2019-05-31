var http = require('http');
var url=require('url');
var server = http.createServer();
server.on('request', function (req, res) {
  var parseObj=url.parse(req.url);
  // 在服务端默认发送的数据，其实是utf8编码的内容
  // 但浏览器不知道是utf8内容
  // 浏览器在不知道服务器响应内容的编码情况下会按照当前操作系统默认编码解析
  // 中文操作系统默认编码gbk
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  if(parseObj.pathname=='/b'){
    // 服务器重定向到/aaa
    res.statusCode=302;
    res.setHeader('Location','/aaa')  
  }
  
  res.end(JSON.stringify(parseObj));
})

server.listen(3000, function () {
  console.log('server is running...');
})