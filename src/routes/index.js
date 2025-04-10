// 导入用户路由模块
const userRouter = require('./user.routes')

// 暴露一个方法，用来注册已经写好的路由模块
module.exports = app => {
  app.use('/api/user', userRouter)
}
