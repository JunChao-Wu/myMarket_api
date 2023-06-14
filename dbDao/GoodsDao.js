
import { BaseDao } from "./impl/BaseDao";


const _table_name = "s_goods";

export class GoodsDao extends BaseDao {
  constructor () {
    super()
  }


  list (vo) {
    let sql = `select * from ${_table_name}`;
    return this.query(sql, "查询商品列表");
  }

  add (vo) {
    let sql = `insert into ${_table_name} (goods_name, category_id, stock) values ('${vo.name}', ${vo.category_id || null}, ${vo.stock || null})`;
    return this.query(sql, "新增商品");
  }

}




