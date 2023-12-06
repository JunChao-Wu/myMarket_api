import { logger } from "../loggerUtil/logger.js";
import { WsClient  } from 'tsrpc';
import { serviceProto } from './impl/serviceProto.js'; // 该文件每次都需要从tsrpc项目拷贝生成, 优化？

export class BaseChat {
  constructor() {
    this.client = null;
    this.retryTimes = 0;
  }

  static init(Obj) {
    const baseChat = new Obj();
    const chatClient = new WsClient(serviceProto, {
      server: 'ws://127.0.0.1:3001',
      json: true,
    });
    baseChat.connect(chatClient);
    baseChat.client = chatClient;
    return baseChat;
  }

  async connect(chatClient) {
    if (chatClient._timeout) {
      clearTimeout(chatClient._timeout);
      chatClient._timeout = null;
    }
    let res = await chatClient.connect();
    if (res.isSucc) {
      this.retryTimes = 0;
      logger.info("wsClient link success");
    } else {
      if (this.retryTimes >= 30) {
        throw new Error("启动失败, 无法连接chatClient!");
      }
      logger.error(res.errMsg);
      logger.warn("正在重试连接chatClient");
      ++this.retryTimes;
      chatClient._timeout = setTimeout(async () => {
        await chatClient.disconnect();
        await this.connect(chatClient);
      }, 2000);
    }
  }
}
