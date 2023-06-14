

import { logger } from "../../utils/loggerUtil/logger";
import { BaseDomain } from "../BaseDomain";

import { GoodsRole } from "../../validate/goods/GoodsRole";
import { AddGoodsAction } from "../../action/goods/AddGoodsAction";

const methodDesc = "updateGoods";

export class AddGoodsDomain extends BaseDomain {
  constructor(request) {
    super(request)
    this.request = request;
  }

  async execute () {
    let result = {};
    try {
      logger.info("test");
      let res = {};
      let reqClone = this.validate();
      res = await new AddGoodsAction(reqClone).execute();
      result = this.makeSuccessResult(res, methodDesc);
    } catch (error) {
      result = this.makeErrorResult(error, methodDesc);
    }
    return result;
  }

  validate () {
    let reqClone = this.validateAndFormat(GoodsRole.addGoods, this.request);
    return reqClone;
  }

}




