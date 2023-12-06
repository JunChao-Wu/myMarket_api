const mysql = require('../utils/dbUtil/mysql');
const redis = require('../utils/redisUtil/Redis');
const notice = require('../utils/noticeUtil/Notice');

export function setEnv () {
  global.configs = configs;
  global.mysql = mysql;
  global.redis = redis;
  global.notice = notice;
}

const configs = {
  API: {
    notice: {
      send: 'Send',
    },
  },
};
