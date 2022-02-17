const BaseDao = require('./baseDao')


class StockLimitDao extends BaseDao {
  constructor(pool) {
    super(pool)
  }


  async getStockLimit() {
    let sql = "select * from s_stock_limit where id = '1'";
    let stockLimit = await this.querySQL(sql);

    return stockLimit[0];
  }

  async editStockLimit(limit) {
    let sql = "update s_stock_limit set stock_limit = '" + limit + "'";

    let result = await this.querySQL(sql);
    if(result) {
      return true;
    }else {
      return false;
    }
  }

}

module.exports = StockLimitDao;