const express = require('express')
const userController = require('../controllers/user.controller')
// 创建路由对象
const router = express.Router()

// 查询用户身份列表
router.get('/type', userController.findAllType)
// 注册
router.post('/register', userController.register)
// 发送验证
router.post('/sendEmaliCode', userController.sendEmailCode)

module.exports = router
