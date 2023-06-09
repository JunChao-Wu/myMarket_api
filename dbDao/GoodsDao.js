
import { BaseDao } from "./impl/BaseDao";


const _table_name = "s_goods";

export class GoodsDao extends BaseDao {
  constructor () {
    super()
  }


  async list (vo) {
    let sql = `select * from ${_table_name}`;
    return await this.query(sql);
  }

  async add (vo) {
    let sql = `insert into ${_table_name} (goods_name, category_id, stock) values ('${vo.name}', '${vo.category_id}', ${vo.stock || null})`;
    return await this.query(sql);
  }

}




