const BaseDao = require('./baseDao')
const {deepCloneObject, _typeOf} = require('../util/util')

class purchaseDao extends BaseDao {
  constructor(pool) {
    super(pool)
  }

  async getPurchaseList(obj) {
    let search = obj.search || '';
    let sql = "select * from s_purchase where isdeleted = 0 ";
    if(search) {
      search = escape(search);
      let searchType = _typeOf(search);
      switch(searchType) {
        case 'Number': 
          /* 对进货单号准确查询 */
          { sql += "and batchNumber = '%" + search + "%' " }
          break;
        case 'String':
          /* 对名字模糊查询 */
          { sql += "and goodName like '%" + search + "%' " }
          break;
      }
    }
    /* 倒序获取 */
    sql += "order by id desc ";
    sql += "limit " + obj.start + "," + obj.pageSize;

    let results =  await this.querySQL(sql)
    return results;
  }

  async getTotal(obj) {
    let total = 0;
    let search = obj.search || '';
    let sql = "select count(*)as total from s_purchase where isdeleted = 0 "
    if(search) {
      search = escape(search);
      let searchType = _typeOf(search);
      switch(searchType) {
        case 'Number': 
          /* 对进货单号准确查询 */
          { sql += "and batchNumber = '%" + search + "%' " }
          break;
        case 'String':
          /* 对名字模糊查询 */
          { sql += "and goodName like '%" + search + "%' " }
          break;
      }
    }
    let results = await this.querySQL(sql);
    results.forEach(resultObj => {
      total = resultObj.total;
    })
    // console.log(total)
    return total;
  }

   async deletePurchase(purchaseArray) {
    /* 
      UPDATE s_purchase
        SET isdeleted = CASE id 
          WHEN 1 THEN 1 
          WHEN 2 THEN 1
          WHEN 3 THEN 1 
        END
      WHERE id IN (1,2,3)
    */
    let len = purchaseArray.length;

    let sql = "update s_purchase set isdeleted = case id";

    for(let i = 0; i < len; i++) {
      sql += " when " + purchaseArray[i] + " then " + 1
    }

    sql += " end where id in (";

    for(let i = 0; i < len; i++) {
      sql += purchaseArray[i];
      if( i !== len - 1 ) {
        sql += ","
      }
    }

    sql += ")"
    // console.log(sql)
    /* update s_purchase set isdeleted = case id when 12 then 1 when 13 then 1 end where id in (12,13) */
    let result = await this.querySQL(sql);
    if(result) {
      return true;
    }else {
      return false;
    }
  }

  async editPurchase(purchaseObj) {
    /* 'batchNumber', 'goodName', 'purchaseTime', 'purchasePrice', 'purchaseAmount', 'categoryID', 'bussiness', 'origin', 'productionDate', 'shelfLife' */
    let sql = "update s_purchase set batchNumber='" + purchaseObj.batchNumber + "', goodName='" + purchaseObj.goodName + "', purchaseTime='" + purchaseObj.purchaseTime + "', purchasePrice='" + purchaseObj.purchasePrice + "', purchaseAmount='" + purchaseObj.purchaseAmount + "', categoryID='" + purchaseObj.categoryID + "', bussiness='" + purchaseObj.bussiness + "', origin='" + purchaseObj.origin + "', productionDate='" + purchaseObj.productionDate + "', shelfLife='" + purchaseObj.shelfLife + "'";

    sql += " where id = " + purchaseObj.id;

    let result = await this.querySQL(sql);
    if(result) {
      return true;
    }else {
      return false;
    }
  }

  async addPurchase(purchaseObj) {
    let sql = "insert into s_purchase values('0','" + purchaseObj.batchNumber + "','" + purchaseObj.goodName + "','" + purchaseObj.purchaseTime + "','" + purchaseObj.purchasePrice + "','" + purchaseObj.purchaseAmount + "','"   +  purchaseObj.categoryID + "','" + purchaseObj.bussiness + "','" + purchaseObj.origin + "','" + purchaseObj.productionDate + "','" + purchaseObj.shelfLife + "','0','" + purchaseObj.purchaseAmount + "','0')";

    let result = await this.querySQL(sql)
    if(result) {
      return true;
    }else {
      return false;
    }
  }

  // 下面的都是特定功能型接口

  // 获取给goods库存
  async getGoodsStock(name) {
    name = name || '';
    if (!name) {
      return false;
    }
    let sql = "select stock from s_purchase where isdeleted = 0 and goodName = '" + name + "'";

    let result = await this.querySQL(sql);
    if (result) {
      return result;
    }else {
      return false;
    }
  }


  // 获取进货的分类 
  async getGoodsCategory(name) {
    name = name || '';
    if (!name) {
      return false;
    }
    let sql = "select categoryID from s_purchase where isdeleted = 0 and goodName = '" + name + "'"

    let result = await this.querySQL(sql);

    if (result) {
      return result;
    }else {
      return false;
    }
  }


  // 添加goods时，向purchase对应数据添加goods_id
  async addGoodsID(addObj) {
    // addObj = {goodsID, goodName}
    let sql = "update s_purchase set goods_id =" + addObj.id + " where goodName = '" + addObj.name + "'";

    let result = await this.querySQL(sql);
    if (result) {
      return true;
    }else {
      return false;
    }
  }


  // 已删除goods，置0拥有该goods的数据的goods_id
  async deleteGoodsID(goodsID) {
    let sql = "update s_purchase set goods_id = 0 ";

    sql += "where goods_id = " + goodsID;

    let result = this.querySQL(sql)
    if (result) {
      return true;
    }else {
      return false;
    }
  }


  async getPurchaseName() {
    let sql = "select goodName from s_purchase where isdeleted = 0"

    let result = await this.querySQL(sql)
    result.forEach(obj => {
      obj.goodName = unescape(obj.goodName)
    })
    if(result[0]) {
      return result;
    }else {
      return false;
    }
  }



}




module.exports = purchaseDao;