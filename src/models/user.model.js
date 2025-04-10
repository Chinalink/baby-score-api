const pool = require('./db')

// 查询
exports.getAllType = async () => {
  let sql = 'SELECT * FROM user_type' // 要执行的SQL语句
  try {
    const [rows, fields] = await pool.query(sql) // rows返回查询结果，fields返回该表的字段名数组，一般用不到
    return Promise.resolve(rows) //执行成功，返回数据集
  } catch (error) {
    console.log('error:', error)
    return Promise.reject(error) //执行失败，返回错误信息
  }
}
