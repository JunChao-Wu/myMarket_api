

import { ProcyAction } from "../ProcyAction";

import { GoodsDao } from "../../dbDao/GoodsDao";

export class AddGoodsAction extends ProcyAction {
  constructor (request) {
    super(request)
    this.request = request;
    this.dao = new GoodsDao();
  }

  actionName () {
    return "AddGoodsAction"
  }

  handle () {
    let vo = this.request;
    this.dao.add(vo);
  }
}




