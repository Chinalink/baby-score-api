const Joi = require('joi')

const email = Joi.string().email().required().messages({
  'any.required': '缺少email',
  'string.email': 'email格式不正确',
})

const code = Joi.string().required().messages({
  'any.required': '缺少code',
})

const type_id = Joi.number().integer().required().valid(1, 2, 3, 4, 5, 6, 7).messages({
  'any.required': '缺少type_id',
  'any.only': 'type_id校验失败',
})

exports.register = Joi.object({ email, code, type_id })
exports.sendEmailCode = Joi.object({ email })
