const express = require('express');
const router = express.Router();

const pool =  require('../../dao/dbUtil');


const PurchaseDao = require('../../dao/purchaseDao')
const CategoryDao = require('../../dao/categoryDao')

/* 添加purchase */
router.post('/addPurchase', async (req, res) => {

  let purchaseObj = req.body;
  if(purchaseObj.bussiness == null || !purchaseObj.bussiness) {
    purchaseObj.bussiness = '';
  }
  if(purchaseObj.origin == null || !purchaseObj.origin) {
    purchaseObj.origin = '';
  }
  // 规范输入的数据（清除null与空字符串的影响）
  if(purchaseObj.categoryID == null || purchaseObj.categoryID == '') {
    purchaseObj.categoryID = 1
  }
  if(purchaseObj.shelfLife == null || purchaseObj.shelfLife  == '') {
    purchaseObj.shelfLife = 0;
  }
  /* escape函数处理，防止参数带特殊字符 */
  Object.keys(purchaseObj).forEach(key => {
    purchaseObj[key] = escape(purchaseObj[key])
  })
  
  let purchaseDao = new PurchaseDao(pool);
  let result = await purchaseDao.addPurchase(purchaseObj)

  // 向前端发送成功信息
  if(result) {
    res.json({msg: 'add success'})
  }else {
    res.json({msg: 'add failed'})
  }
})


/* 获取purchase */
router.post('/getPurchase', async (req, res) => {
  let resResult = {};
  let getObj = req.body.pageObj;
  getObj.start = (getObj.currentPage - 1) * getObj.pageSize;

  let purchaseDao = new PurchaseDao(pool);
  let tempData = await purchaseDao.getPurchaseList(getObj)
  let total = await purchaseDao.getTotal(getObj)

  let categoryDao = new CategoryDao(pool);
  let categoryList = await categoryDao.getCategory();
  tempData.forEach(obj => {
    Object.keys(obj).forEach(key => {
      obj[key] = unescape(obj[key]);
      if(obj[key] == 'null') {
        obj[key] = '';
      }
      /* 逻辑联表查询 */
      if(key == 'categoryID') {
        categoryList.forEach(categoryObj => {
          if(obj[key] == categoryObj.id) {
            obj.categoryName = categoryObj.category_name;
            return;
          }
        })
        if(obj.categoryName) {
          delete obj.categoryID;
        }
      }
    })
  })
  resResult.data = tempData;
  // console.log(resResult.data[0])
  resResult.total = total;
  // console.log('获取了')
  if(tempData && total) {
    res.json(resResult)
  }else {
    res.json({msg: 'get failed'})
  }
})


/* 删除purchase */
router.post('/deletePurchase', async (req, res) => {
  // console.log(req.body)

  let purchaseDao = new PurchaseDao(pool);
  let result = await purchaseDao.deletePurchase(req.body);
  // console.log('删除了')

  if(result) {
    res.json({msg: 'delete success'})
  }else {
    res.json({msg: 'delete failed'})
  }
})


/* 修改purchase */
router.post('/editPurchase', async (req, res) => {
  let purchaseObj = req.body;
  if(!purchaseObj.bussiness || purchaseObj.bussiness == null) {
    purchaseObj.bussiness = '';
  }
  if(!purchaseObj.origin || purchaseObj.origin == null) {
    purchaseObj.origin = '';
  }
  // 规范输入的数据（清除null与空字符串的影响）
  if(!purchaseObj.categoryID || purchaseObj.categoryID == null || purchaseObj.categoryID == '') {
    purchaseObj.categoryID = 1
  }
  if(!purchaseObj.shelfLife || purchaseObj.shelfLife == null || purchaseObj.shelfLife  == '') {
    purchaseObj.shelfLife = 0;
  }
  /* escape函数处理，防止参数带特殊字符 */
  Object.keys(purchaseObj).forEach(key => {
    purchaseObj[key] = escape(purchaseObj[key])
  })
  // console.log(purchaseObj)

  // 每次都创建新链接，并添加数据

  let purchaseDao = new PurchaseDao(pool);
  let result = await purchaseDao.editPurchase(purchaseObj)

  // 向前端发送成功信息

  if(result) {
    res.json({msg: 'edit success'})
  }else {
    res.json({msg: 'edit failed'})
  }
})



// 特殊接口

// 获取select用id和name
router.post('/getPurchaseNameList', async (req, res) => {
  let purchaseDao = new PurchaseDao(pool);
  let nameList = await purchaseDao.getPurchaseName();
  // name去重
  let tempObj = {};
  let result = [];
  nameList.forEach(obj => {
    let name = obj.goodName;
    if (tempObj[name] !== name) {
      tempObj[name] = name;
      result.push(obj);
    }
  })

  if(result) {
    res.json(result)
  }else {
    res.json({msg: 'get failed'})
  }
})
module.exports = router;