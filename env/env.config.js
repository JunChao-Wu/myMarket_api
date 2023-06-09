

const pool =  require('../utils/dbUtil/dbPool');


const env = {
  test: "测试全局变量",
  pool: pool,
};


export function setEnv() {
  global.env = env;
}






