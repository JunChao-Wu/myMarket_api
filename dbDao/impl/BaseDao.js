


export class BaseDao {
  constructor() {
    this.pool = (global.env || {}).pool;
  }

  query (sql) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function(err, connection) {
        if (err) throw err; // 如果无法获取连接，则抛出错误
        connection.query(sql, function(error, results, fields) {
          connection.release(); // 释放连接
          if (error) throw error; // 如果查询出错，则抛出错误
          resolve(JSON.parse(JSON.stringify(results))) // 返回查询结果
        });
      });
    })
  }


}