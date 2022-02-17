class BaseDao {
  constructor(pool) {
    this.pool = pool;
  }
  // /* 连接 链接 */
  // connect() {
  //   return this.connection.connect((err) => {
  //     if(err) {
  //       console.log(err);
  //       return;
  //     }
  //   })
  // }

  // /* 关闭 链接 */
  // closeConnection() {
  //   return this.connection.end();
  // }

  /* 查询语句 */
  querySQL(sql, values) {
    return new Promise((resolve, reject) => {
      let pool = this.pool;
      pool.getConnection((err, connection) => {
        if(err) {
          throw(err)
        }else {
          if(values) {
            connection.query(sql, values, (err, results) => {
              if(err) {
                throw err;
              } else {
                resolve(results);
              }
              connection.release();
            })
          } else {
            connection.query(sql, (err, results) => {
              if(err) {
                throw err;
              } else {
                resolve(results);
              }
              connection.release();
            })
          }
        }
      })
    })
  }

  
}

module.exports = BaseDao;