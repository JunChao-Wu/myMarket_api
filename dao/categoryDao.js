const BaseDao = require('./baseDao')


class categoryDao extends BaseDao {
  constructor(pool) {
    super(pool)
  }


  async getCategory(id) {
    let sql = "select * from s_category";
    if(id) {
      sql += " where id = '" + id + "'";
    }
    let categoryList = await this.querySQL(sql);
    // console.log(categoryList)
    return categoryList;
  }
  
  async addCategory(name) {
    let sql = "insert into s_category value('0', '" + name + "')";

    let result = await this.querySQL(sql);
    if(result) {
      return true;
    }else {
      return false;
    }
  }

  async editCategory(obj) {
    let sql = "update s_category set category_name = '" + obj.name + "'";

    let result = await this.querySQL(sql);
    if(result) {
      return true;
    }else {
      return false;
    }
  }

  async deleteCategory(id) {
    if( !id ) {
      return false;
    }
    let sql = "delete from s_category where id = '" + id + "'";

    let result = await this.querySQL(sql);
    if(result) {
      return true;
    }else {
      return false;
    }
  }

}

module.exports = categoryDao;