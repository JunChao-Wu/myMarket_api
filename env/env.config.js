

const pool =  require('../utils/dbUtil/dbPool');


const env = {
  pool: pool,  // mysql连接池
  showSql: true,  // log是否展示sql语句
};


export function setEnv() {
  global.env = env;
}






