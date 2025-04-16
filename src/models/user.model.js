const createError = require('http-errors')
const pool = require('./db')
const utils = require('../utils')

// 查询用户身份列表
exports.getAllType = async () => {
  let sql = 'select * from user_type'
  const [rows] = await pool.query(sql)
  return rows
}

// 发送邮箱验证码
exports.sendEmailCode = async email => {
  // 生成验证码，过期时间
  const { code, expiresAt } = utils.generateCode()
  // 查询当前邮箱是否被注册
  const [users] = await this.findUser('email', email)

  if (users && users.length > 0) {
    // 保存登录验证码
    let updateSQL = `update user set code=?, expires_at=? where email='${email}'`
    await pool.query(updateSQL, [code, expiresAt, email])
  } else {
    // 每次发送之前先清空之前保存的临时验证码
    await this.deleteCode(email)
    // 保存注册验证码
    let saveSQL = `insert into temp_user_code(email, code, expires_at) values(?,?,?)`
    await pool.query(saveSQL, [email, code, expiresAt])
  }
  // 发送邮件
  const mailOptin = utils.generateMailOptions(email, code, expiresAt)
  const transporter = utils.transporter()
  await transporter.sendMail(mailOptin)
  return null
}

// 注册用户
exports.register = async (email, code, type_id) => {
  // 查询邮箱是否已被注册
  const users = await this.findUser('email', email)
  if (users.length > 0) {
    throw createError(400, '该邮箱已被注册')
  } else {
    const isTrue = await this.verifyCode(email, code)

    if (!isTrue) {
      throw createError(400, '验证码错误或已过期')
    }

    let createSQL = 'insert into user (email, type_id) value(?,?)'
    const [results] = await pool.query(createSQL, [email, type_id])
    if (results.affectedRows === 1) {
      // 注册成功，删除临时保存的验证码
      await this.deleteCode(email)
      return null
    }
  }
}

// 校验验证码
exports.verifyCode = async (email, code, type = 'register') => {
  let sql = `select * from ${
    type == 'register' ? 'temp_user_code' : 'user'
  } where email = '${email}' and expires_at > NOW()`
  const [rows] = await pool.query(sql, [email])

  if (rows.length === 0) {
    return false
  }
  // 比较验证码
  const storeCode = rows[0].code
  if (storeCode === code) {
    return true
  }
  return false
}

// 查询用户
exports.findUser = async (findType, data) => {
  let sql = `select * from user where ${findType} = ?`
  const [rows] = await pool.query(sql, [data])
  return rows
}

// 删除验证码
exports.deleteCode = async email => {
  let deleteSQL = `delete from temp_user_code where email='${email}'`
  await pool.query(deleteSQL, [email])
}
