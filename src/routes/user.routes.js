const express = require('express')
const users = require('../controllers/user.controller')
// 创建路由对象
const router = express.Router()

// 获取用户分类
router.get('/type', users.findAllType)

module.exports = router
