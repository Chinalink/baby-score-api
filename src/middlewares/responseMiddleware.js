module.exports = (req, res, next) => {
  res.success = (data = null, message = '成功') => {
    res.status(200).json({
      code: 200,
      message,
      data,
    })
  }
  next()
}
