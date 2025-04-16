const express = require('express')
const validator = require('express-joi-validation').createValidator({ passError: true })
const asyncHandler = require('../middlewares/asyncMiddleware')

const userController = require('../controllers/user.controller')
const userSchema = require('../schemas/user.schema')

// 创建路由对象
const router = express.Router()

// 查询用户身份列表
router.get('/type', asyncHandler(userController.findAllType))
// 注册
router.post('/register', validator.body(userSchema.register), asyncHandler(userController.register))
// 发送验证
router.post('/sendEmaliCode', validator.body(userSchema.sendEmailCode), asyncHandler(userController.sendEmailCode))

module.exports = router
