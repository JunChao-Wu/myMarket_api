
const { DataTypes, Op } = require('sequelize');
import mysql from "../utils/dbUtil/mysql";

import { BaseDao } from './BaseDao';

const _table_name = "s_goods";

const s_goods = mysql.define(_table_name, {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true, // 是否自增, 默认false
    primaryKey: true  // 主键, 默认false
  },
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false, // allowNull 默认为 true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  // 这是其他模型参数
});

export class GoodsDao extends BaseDao {
  constructor() {
    super()
  }

  countAll () {
    return s_goods.count();
  }

  queryAll () {
    return s_goods.findAll({
      order: [
        ["createdAt", "DESC"]
      ]
    });
  }

  queryById (vo) {
    return s_goods.findOne({
      where: {
        id: vo.id
      }
    });
  }

  add (vo, t) {
    return s_goods.create({ goods_name: vo.goodsName }, {
      transaction: t
    });
  }

  update (vo) {
    return s_goods.update({
      goods_name: vo.goodsName
    }, {
      where: {
        id: vo.id
      }
    });
  }

  deleteById (vo) {
    return s_goods.destroy({
      where: {
        id: vo.id
      }
    })
  }

}




