

import { ProcyAction } from "../ProcyAction";

import { GoodsDao } from "../../dbDao/GoodsDao";

export class QueryGoodsListAction extends ProcyAction {
  constructor (request) {
    super(request)
    this.request = request;
    this.dao = new GoodsDao();
  }

  actionName () {
    return "QueryGoodsListAction"
  }

  handle () {
    let vo = this.request;
    return this.dao.queryAll(vo);
  }
}




