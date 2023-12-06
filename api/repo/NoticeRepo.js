
import { BaseRepo } from './impl/BaseRepo';

export class NoticeRepo extends BaseRepo {
  constructor() {
    super();
    this.notice = notice;
  }

  send (vo) {
    return this.notice.excute(global.configs.API.notice.send, vo);
  }


}
