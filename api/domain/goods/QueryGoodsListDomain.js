import { BaseDomain } from '../BaseDomain';
import { GoodsRole } from '../../validate/paramRole/goods/GoodsRole';
import { QueryGoodsListAction } from '../../action/goods/QueryGoodsListAction';

const methodDesc = 'queryGoodsList';
export class QueryGoodsListDomain extends BaseDomain {
  constructor (request) {
    super(request);
    this.request = request;
  }

  async execute () {
    let result = {};
    try {
      let res = {};
      const reqClone = this.validate();
      res = await new QueryGoodsListAction(reqClone).execute();
      result = this.makeSuccessResult(res, methodDesc);
    } catch (error) {
      result = this.makeErrorResult(error, methodDesc);
    }
    await this.unLock();
    return result;
  }

  validate () {
    const reqClone = this.validateAndFormat(GoodsRole.list, this.request);
    return reqClone;
  }
}
