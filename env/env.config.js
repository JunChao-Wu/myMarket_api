
const mysql = require('../utils/dbUtil/mysql');
const redis = require('../utils/redisUtil/Redis');

export function setEnv() {
  global.mysql = mysql;
  global.redis = redis;
}
