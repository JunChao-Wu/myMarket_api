
import { ModelMaker } from "../../ModelMaker";


export class GoodsRole {

  static get addGoods () {
    return {
      targetRole: {
        goodsName  : GoodsModel.goodsName,
        category_id: GoodsModel.category_id,
        stock      : GoodsModel.stock,
      },
      isReturn: true,
    }
  }

  static get list () {
    return {
      targetRole: {
      },
      isReturn: true,
    }
  }

}

class GoodsModel {

  static get goodsName () {
    return new ModelMaker().string().required().des("商品名字").min(1).max(10).keys();
  }

  static get category_id () {
    return new ModelMaker().integer().des("分类").defaultTo(0).keys();
  }

  static get stock () {
    return new ModelMaker().integer().des("库存").defaultTo(0).keys();
  }
}