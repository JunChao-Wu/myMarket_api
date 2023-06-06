
import { ModelMaker } from "../ModelMaker";


export class GoodsRole {

  static get saveGoods () {
    return {
      targetRole: {
        name: GoodsModel.goodsName,
      },
      isReturn: true,
    }
  }

}

class GoodsModel {

  static get goodsName () {
    return new ModelMaker().string().des("商品名字").min(1).max(10).keys();
  }
}