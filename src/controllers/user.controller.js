const User = require('../models/user.model')

// 查询用户身份列表
exports.findAllType = async (req, res, next) => {
  try {
    const result = await User.getAllType()
    res.send({ code: 200, message: '成功', data: result })
  } catch (error) {
    res.status(error.status || 500).send({
      code: -1,
      message: error.message || '服务器内部错误',
      data: null,
    })
  }
}

// 发送验证码
exports.sendEmailCode = async (req, res, next) => {
  const { email } = req.body
  if (!email) {
    res.status(400).send({ code: -1, message: '请提供邮箱地址', data: null })
  }
  try {
    const result = await User.sendEmailCode(email)
    res.send({ code: 200, message: '验证码已发送，请查收邮件', data: result })
  } catch (error) {
    res.status(error.status || 500).send({
      code: -1,
      message: error.message || '服务器内部错误',
      data: null,
    })
  }
}

// 通过邮箱注册用户
exports.register = async (req, res, next) => {
  const { email, code, type_id } = req.body
  if (!email || !code) {
    res.status(400).send({ code: -1, message: '邮箱或验证码不能为空', data: null })
  } else if (!type_id) {
    res.status(400).send({ code: -1, message: '请选择身份', data: null })
  } else if (type_id && (type_id < 1 || type_id > 7)) {
    res.status(400).send({ code: -1, message: '身份值有误', data: null })
  } else {
    try {
      const result = await User.register(email, code, type_id)
      res.send({ code: 200, message: '注册成功', data: result })
    } catch (error) {
      res.status(error.status || 500).send({
        code: -1,
        message: error.message || '服务器内部错误',
        data: error.data || null,
      })
    }
  }
}
