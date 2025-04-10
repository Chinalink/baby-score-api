const User = require('../models/user.model')

exports.findAllType = async (req, res) => {
  try {
    const result = await User.getAllType()
    res.send({ code: 200, message: '成功', data: result })
  } catch (error) {
    res.status(500).send({
      message: error.message || '服务器内部错误',
    })
  }
}
