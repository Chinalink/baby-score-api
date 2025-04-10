// 由于能够更好的使用Promise,这里选择引入promise模块
const mysql = require('mysql2/promise')
const config = require('../config')

// 建立与mysql数据库的连接池
const pool = mysql.createPool({
  host: config.dbConfig.host,
  port: config.dbConfig.port,
  user: config.dbConfig.user,
  password: config.dbConfig.password,
  database: config.dbConfig.database,
})

module.exports = pool
