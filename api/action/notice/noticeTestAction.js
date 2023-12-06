

import { ProcyAction } from "../ProcyAction";

import { NoticeRepo } from '../../repo/NoticeRepo';

export class noticeTestAction extends ProcyAction {
  constructor (request) {
    super(request);
    this.request = request;
    this.repo = new NoticeRepo();
  }

  actionName () {
    return "noticeTestAction";
  }

  actionCode () {
    return "2001";
  }

  async handle () {
    let vo = { content: "test" };
    return await this.repo.send(vo);
  }
}


