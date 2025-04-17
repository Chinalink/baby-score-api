const express = require('express')
const validator = require('express-joi-validation').createValidator({ passError: true })
const asyncHandler = require('../middlewares/asyncMiddleware')

const userController = require('../controllers/user.controller')
const userSchema = require('../schemas/user.schema')

// 创建路由对象
const router = express.Router()

// 查询用户身份列表
router.get('/type', asyncHandler(userController.findAllType))
// 邮箱注册
router.post('/register', validator.body(userSchema.register), asyncHandler(userController.register))
// 发送验证码
router.post('/sendEmaliCode', validator.body(userSchema.sendEmailCode), asyncHandler(userController.sendEmailCode))
// 创建宝贝
router.post('/createBaby', validator.body(userSchema.createBaby), asyncHandler(userController.createBaby))
// 删除宝贝
router.delete('/baby/:id', validator.params(userSchema.id), asyncHandler(userController.deleteBaby))

module.exports = router
