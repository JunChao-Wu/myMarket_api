import { logger } from "../../utils/loggerUtil/logger";



export class BaseDao {
  constructor() {
    this.pool = (global.env || {}).pool;
    this.showSql = (global.env || {}).showSql;
  }

  query (sql, methodDesc) {
    if (this.showSql) {
      logger.fatal(`${methodDesc} 的sql为: ${sql}`);
    }
    return new Promise((resolve, reject) => {
      this.pool.getConnection(function(err, connection) {
        if (err) {
          reject(err); // 如果无法获取连接，则抛出错误
          return;
        }
        connection.query(sql, function(error, results, fields) {
          connection.release(); // 释放连接
          if (error) {
            reject(error)
            return;
          }; // 如果查询出错，则抛出错误
          resolve(JSON.parse(JSON.stringify(results))) // 返回查询结果
        });
      });
    })
  }

}
