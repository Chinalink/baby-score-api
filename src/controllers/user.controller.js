const createError = require('http-errors')
const User = require('../models/user.model')

// 查询用户身份列表
exports.findAllType = async (req, res) => {
  const result = await User.getAllType()
  res.success(result)
}

// 发送验证码
exports.sendEmailCode = async (req, res) => {
  if (!req.body) throw createError(400, '缺少必要参数')
  const { email } = req.body
  const result = await User.sendEmailCode(email)
  res.success(result, '验证码已发送，请查收邮件')
}

// 通过邮箱注册用户
exports.register = async (req, res) => {
  if (!req.body) throw createError(400, '缺少必要参数')
  const { email, code, type_id } = req.body
  const result = await User.register(email, code, type_id)
  res.success(result, '注册成功')
}

// 创建宝贝
exports.createBaby = async (req, res) => {
  if (!req.body) throw createError(400, '缺少必要参数')
  const { name, sex, score, parent_id } = req.body
  const result = await User.createBaby(name, sex, score, parent_id)
  res.success(result, '创建成功')
}

// 删除宝贝
exports.deleteBaby = async (req, res) => {
  const { id } = req.params
  const result = await User.deleteBaby(id)
  res.success(result, '删除成功')
}
