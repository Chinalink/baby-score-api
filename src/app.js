// 导入express
const express = require('express')
const errorMiddleware = require('./middlewares/errorMiddleware')
const responseMiddleware = require('./middlewares/responseMiddleware')

// 创建express实例
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(responseMiddleware)
require('./routes')(app)
app.use(errorMiddleware)

// 调用app.listen方法，指定端口号并启动web服务器
app.listen(3000, function () {
  console.log('server running at http://127.0.0.1:3000')
})
