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

const name = Joi.string()
  .pattern(/^[\u4E00-\u9FA5A-Za-z]+$/)
  .required()
  .messages({
    'any.required': '缺少name',
    'string.empty': 'name不能为空',
    'string.pattern.base': 'name只能由汉字或大小写字母组成',
  })

const sex = Joi.number().required().valid(1, 2).messages({
  'any.required': '缺少sex',
  'any.only': 'sex校验失败',
})

const score = Joi.number().integer().required().messages({
  'any.required': '缺少score',
  'number.base': 'score必须为数字类型',
  'number.integer': 'score必须为整数',
})

const parent_id = Joi.number().integer().required().messages({
  'any.required': '缺少parent_id',
  'number.base': 'parent_id必须为数字类型',
  'number.integer': 'parent_id必须为整数',
})

const id = Joi.number().integer().required().messages({
  'number.base': 'id必须为数字类型',
  'number.integer': 'id必须为整数',
})

exports.register = Joi.object({ email, code, type_id })
exports.sendEmailCode = Joi.object({ email })
exports.createBaby = Joi.object({ name, sex, score, parent_id })
exports.id = Joi.object({ id })
