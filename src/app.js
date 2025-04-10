// 导入express
const express = require('express')
// 创建express实例
const app = express()

// 注册路由
require('./routes')(app)

// 调用app.listen方法，指定端口号并启动web服务器
app.listen(3000, function () {
  console.log('server running at http://127.0.0.1:3000')
})
