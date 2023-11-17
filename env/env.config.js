
const mysql =  require('../utils/dbUtil/mysql');

const env = {
  mysql: mysql,  // mysql
  showSql: true,  // log是否展示sql语句
};


export function setEnv() {
  global.env = env;
}






