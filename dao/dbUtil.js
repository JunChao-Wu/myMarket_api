const mysql = require('mysql')

function _createPool() {
  /* 需链接的数据库 */
  let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'MYSQL',
    port: '3306',
    database: 'db_mymarket'
  })
  return pool;
}

module.exports = _createPool();