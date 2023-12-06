import { BaseChat } from './BaseChat';

class Notice extends BaseChat {
  constructor() {
    super();
  }

  /**
   * 调用notice_api, 该连接是长连接
   * @param {string} path 路径 XXX/...
   * @param {object} vo {}
   * @returns
   */
  async excute(path, vo) {
    return await this.client.callApi(path, vo);
  }

}

module.exports = Notice.init(Notice);
