

import {createClient} from 'redis';
import {logger} from '../loggerUtil/logger';

const baseRedis = {
  host: "192.168.137.129",
  port: "6380",
  userName: "",
  password: "",
  db: "0",
  _name: "baseRedis",
};

export class BaseRedis {
  constructor () {
    this.baseRedis = null;
  }

  static init(Obj) {
    let _redis = new Obj();
    _redis._init();
    return _redis;
  }

  _init () {
    this.baseRedis = this._createClient(baseRedis);
    this.connectEvent(this.baseRedis);
    // this.baseRedis.hExists  // 解注释可以点进查看所有redis方法
  }

  _createClient(redisOption) {
    // redis://alice:foobared@awesome.redis.server:6380
    let url = `redis://${redisOption.userName}:${redisOption.password}@${redisOption.host}:${redisOption.port}/${redisOption.db}`;
    let client = createClient({
      url,
    });
    client._name = redisOption._name;
    client.host = redisOption.host;
    client.port = redisOption.port;
    client.userName = redisOption.userName;
    client.password = redisOption.password;
    client.db = redisOption.db;
    return client;
  }

  async connectEvent (client) {
    if (client._timeout) {
      clearTimeout(client._timeout);
      client._timeout = null;
    }
    let clientName = client._name;
    let host = client.host;
    let port = client.port;
    await client.on("error", () => {
      if (!client._timeout) {
        client._timeout = setTimeout(async () => {
          await this.reconnectEvent(client, clientName);
        }, 10000);
      }
      logger.error(`${clientName}连接失败, ip为 ${host} 端口为 ${port}`);
    }).connect();

    if (!client._timeout) {
      logger.info(`${this.baseRedis._name}连接成功, ip为 ${this.baseRedis.host} 端口为 ${this.baseRedis.port}`);
    }
  }

  async reconnectEvent(client, clientName) {
    if (!client._timeout) {
      return;
    }
    logger.warn(`${this.baseRedis._name}正在重连, ip为 ${this.baseRedis.host} 端口为 ${this.baseRedis.port}`);
    await client.disconnect();
    this[clientName] = this._createClient(client);
    await this.connectEvent(this[clientName]);
  }

}
