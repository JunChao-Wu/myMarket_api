const express = require('express');
const router = express.Router();

const pool =  require('../../dao/dbUtil');

const GoodsDao = require('../../dao/goodsDao')
const PurchaseDao = require('../../dao/purchaseDao')
const CategoryDao = require('../../dao/categoryDao')

// 添加goods
router.post('/addGoods', async (req, res) => {
  // 在purchase获取对应goods_name的category_id, 和所有stock之和
  // goods判断表中是否已存在一个名字的数据，有则不添加
  // goods添加goods_name, category_id, stock
  // 在purchase添加goods_id(待)  addObj = {goodsID, goodName}

  let goodsObj = {};
  let name = escape(req.body.goodName);
  goodsObj.name = name;
  let goodsDao = new GoodsDao(pool);
  let isExisted = await goodsDao.isExistedGoods(name)
  if (isExisted) {
    res.json({msg: 'goods is existed'})
    return;
  }
  let purchaseDao = new PurchaseDao(pool);
  // 计算当前goodName的总库存
  let stockArr = await purchaseDao.getGoodsStock(name);
  if (!stockArr || stockArr.length == 0) {
    res.json({msg: 'add failed'})
  }
  goodsObj.stock = stockArr.reduce((total, obj) => {
    return total += obj.stock;
  }, 0)
  // 获取对应category_id,只取第一个的分类类型
  let category_id_arr = await purchaseDao.getGoodsCategory(name);
  goodsObj.category_id = category_id_arr[0].categoryID;
  let result = await goodsDao.addGoods(goodsObj);

  let goodsIdObj = await goodsDao.getGoodsIdAndName(name);
  let result2 = await purchaseDao.addGoodsID(goodsIdObj);

  if (result && result2) {
    res.json({msg: 'add success'})
  }else if( !result ) {
    res.json({msg: 'add failed'})
  } else if ( !result2 ) {
    res.json({msg: 'update purchaseGoodsID failed'})
  }
})


// 获取goods
router.post('/getGoods', async (req, res) => {
  // {currentPage, pageSize, search}
  let getObj = req.body;
  getObj.start = (getObj.currentPage - 1) * getObj.pageSize;

  let result = {};
  let goodsDao = new GoodsDao(pool);
  let goodsList = await goodsDao.getGoods(getObj)

  let categoryDao = new CategoryDao(pool);
  let categoryList = await categoryDao.getCategory();
  // 替换category_id为category
  goodsList.forEach(obj => {
    categoryList.forEach(cateObj => {
      if (cateObj.id == obj.category_id) {
        obj.category = cateObj.category_name;
        delete obj.category_id;
      }
    })
  })
  result.goodsList = goodsList;

  let total = await goodsDao.getTotal(getObj);
  result.total = total;

  if (goodsList[0] && total) {
    res.json(result)
  }else if(goodList == []) {
    res.json({msg: 'no data for now'})
  }else {
    res.json({msg: 'get failed'})
  }
})


// 删除goods
router.post('/deleteGoods', async (req, res) => {
  // 删除成功时，搜寻进货单中有goods_id的数据，置空
  let deleteObj = req.body;

  let goodsDao = new GoodsDao(pool);
  let result = await goodsDao.deleteGoods(deleteObj.id);
  let isDeleted = false;
  if (result) {
    let purchaseDao = new PurchaseDao(pool);
    isDeleted = await purchaseDao.deleteGoodsID(deleteObj.id)
  }

  if (result && isDeleted) {
    res.json({msg: 'delete success'});
  }else {
    res.json({msg: 'delete failed'});
  }
})










module.exports = router;
