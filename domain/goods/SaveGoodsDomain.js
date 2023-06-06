

import { logger } from "../../utils/loggerUtil/logger";
import { BaseDomain } from "../BaseDomain";

import { GoodsRole } from "../../validate/goods/GoodsRole";


const methodDesc = "updateGoods";

export class SaveGoodsDomain extends BaseDomain {
  constructor(request) {
    super(request)
    this.request = request;
  }

  async excute () {
    let result = {};
    try {
      logger.info("test");
      let res = {};
      let reqClone = this.validate();
      console.log("🚀 ~ file: SaveGoodsDomain.js:23 ~ SaveGoodsDomain ~ excute ~ reqClone:", reqClone)


      result = this.makeSuccessResult(res, methodDesc);
    } catch (error) {
      result = this.makeErrorResult(error, methodDesc);
    }
    return result;
  }

  validate () {
    let reqClone = this.validateAndFormat(GoodsRole.saveGoods, this.request);
    return reqClone;
  }

}




