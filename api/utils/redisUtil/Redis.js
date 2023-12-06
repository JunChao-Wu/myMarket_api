import {BaseRedis} from './BaseRedis';

class Redis extends BaseRedis {
  constructor() {
    super();
  }

  /**
   *
   * @param {*} key
   * @param {*} val
   * @param {*} options 默认60s过期时间
   * @returns
   */
  async setKey(key, val, options = {EX: 60}) {
    let res = await this.baseRedis.set(key, val, options);
    return res;
  }

  async getKey(key) {
    let res = await this.baseRedis.get(key);
    return res;
  }

  async hSetField(key, field, val) {
    await this.baseRedis.hSet(key, field, val);
  }

  async hGetAll(key) {
    let res = await this.baseRedis.hGetAll(key);
    return res;
  }

  /**
   * 执行lua脚本
   * @param {String} script
   * @param {Object} options {keys: Array, arguments: Array}
   */
  async eval(script, options) {
    return await this.baseRedis.eval(script, options);
  }

}

const redis = Redis.init(Redis);
module.exports = redis;
