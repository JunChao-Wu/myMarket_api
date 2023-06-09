
let mysql = require('mysql');

let _createPool = function() {
  let pool = mysql.createPool({
    connectionLimit: 10, // 连接池中的最大连接数
    host: '127.0.0.1',
    user: 'root',
    password: 'dkdoo.com',
    port: '3306',
    database: 'db_mymarket'
  });
  return pool;
}

module.exports = _createPool();

