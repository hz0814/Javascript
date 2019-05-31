let template = require('art-template');
let fs = require('fs');
let http = require('http');
let server = http.createServer();

server.on('request', function (req, res) {

  fs.readFile('./tpl.html', function (err, data) {
    if (err) {
      return console.log('读取失败')
    }
    // 默认读取的是二进制数据， 模板引擎的render方法需要接受字符串
    var ret = template.render(data.toString(), {
      name: 'Node.js',
      title: 'INFO'
    })
    res.end(ret);
  })
  
})

server.listen(3000, function () {
  console.log('running');
})

