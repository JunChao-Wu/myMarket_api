const BaseDao = require('./baseDao')

class goodsDao extends BaseDao {
  constructor(pool) {
    super(pool)
  }

  // 添加goods
  async addGoods(goodsObj) {
    let sql = "insert into s_goods(goods_name, category_id, stock) values('" + goodsObj.name + "'," + goodsObj.category_id + "," + goodsObj.stock +")";
    let result = await this.querySQL(sql);
    if (result) {
      return true;
    }else {
      return false;
    }
  }


  // 获取goods
  async getGoods(getObj) {
    // getObj = {start, pageSize, search}
    let search = getObj.search || '';
    let sql = "select * from s_goods ";
    if (search) {
      search = escape(search);
      sql += "where goods_name = '" + search + "' ";
    }
    sql += "limit " + getObj.start + "," + getObj.pageSize;

    let results = await this.querySQL(sql);

    results.forEach(obj => {
      obj.goods_name = unescape(obj.goods_name)
    })
    return results;
  }

  async getTotal(obj) {
    let total = 0;
    let search = obj.search || '';
    let sql = "select count(*)as total from s_goods "
    if(search) {
      search = escape(search);
      /* 对名字模糊查询 */
      sql += "and goodName like '%" + search + "%' "
    }
    let results = await this.querySQL(sql);
    results.forEach(resultObj => {
      total = resultObj.total;
    })
    // console.log(total)
    return total;
  }
  // async editGoods() {

  // }


  // 删除goods
  async deleteGoods(id) {
    let sql = "delete from s_goods where id = " + id;
    let result = await this.querySQL(sql);
    if (result) {
      return true;
    }else {
      return false;
    }
  }


  // 特定功能性接口
  // 
  async isExistedGoods(name) {
    let sql = "select * from s_goods where goods_name ='"+ name + "'";
    let result = await this.querySQL(sql);
    if (result[0]) {
      return true;
    }else {
      return false;
    }
  }

  async getGoodsIdAndName(name) {
    let sql = "select id from s_goods where goods_name = '" + name + "'";

    let result = await this.querySQL(sql);
    result[0].name = name;
    return result[0];
  }
}




module.exports = goodsDao;
