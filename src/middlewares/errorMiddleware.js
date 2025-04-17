const createError = require('http-errors')

module.exports = (err, req, res, next) => {
  // 处理Joi验证错误
  if (err.error && err.error.name && err.error.name === 'ValidationError') {
    console.log(err.error.details)
    const details = err.error.details.map(d => ({
      message: d.message.replace(/"/g, ''),
    }))
    const message = details && details.length > 0 ? details[0].message : '参数校验失败！'
    err = createError(400, message)
  }

  // 对其他异常进行兜底，转换成通用的错误对象
  if (!createError.isHttpError(err)) {
    console.log(err)
    err = createError(500, '服务器内部错误，请稍后重试')
  }

  return res.status(err.status).json({
    code: err.status,
    message: err.message,
    data: null,
  })
}
