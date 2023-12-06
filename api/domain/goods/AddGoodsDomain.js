

import { BaseDomain } from "../BaseDomain";

import { GoodsRole } from "../../validate/paramRole/goods/GoodsRole";
import { AddGoodsAction } from "../../action/goods/AddGoodsAction";

const methodDesc = "updateGoods";

export class AddGoodsDomain extends BaseDomain {
  constructor(request) {
    super(request);
    this.request = request;
  }

  async execute () {
    let result = {};
    await this.transaction();
    try {
      let res = {};
      let reqClone = this.validate();
      res = await new AddGoodsAction(reqClone, this.t).execute();
      result = this.makeSuccessResult(res, methodDesc);

      await this.commit();
    } catch (error) {
      await this.rollback();
      result = this.makeErrorResult(error, methodDesc);
    }
    return result;
  }

  validate () {
    let reqClone = this.validateAndFormat(GoodsRole.addGoods, this.request);
    return reqClone;
  }

}


