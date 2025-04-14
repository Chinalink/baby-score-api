const nodemailer = require('nodemailer')
const randomstring = require('randomstring')
const config = require('./config')

// 创建nodemailer实例
exports.transporter = () => {
  return nodemailer.createTransport({
    ...config.emailConfig,
  })
}

// 生成验证码
exports.generateCode = () => {
  const code = randomstring.generate({
    length: 6, // 验证码长度
    charset: 'numeric', //可以选择 'alphabetic', 'numeric', 'hexadecimal', 'binary' 或者自定义字符集
  })
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 验证码有效期为5分钟
  return { code, expiresAt }
}

// 生成邮件模板
exports.generateMailOptions = (email, code, expiresAt) => {
  return {
    from: config.emailConfig.auth.user,
    to: email,
    subject: `您的验证码 ${code}`,
    text: `您好，您的验证码是：${code}。请不要告诉他人。验证码将在 ${expiresAt.toISOString()} 前有效。`,
    html: `<b>你的验证码是 ${code}，请勿告诉他人。</b>`, // HTML 内容
  }
}
