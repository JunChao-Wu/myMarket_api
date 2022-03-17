const express = require('express')
const router = express.Router();

const pool =  require('../../dao/dbUtil');


const CategoryDao = require('..//../dao/categoryDao');

import { ApiConstants } from "../RoutersConstants";


/* 添加 分类 */
router.post(ApiConstants.API.category.addCategory, async (req, res) => {
  let obj = req.body;
  let categoryDao = new CategoryDao(pool);
  let result =  await categoryDao.addCategory(obj.name);
  if(result) {
    res.json({msg: 'add success'})
  }else {
    res.json({msg: 'add failed'})
  }
})

/* 删除 分类 */
router.post(ApiConstants.API.category.deleteCategory, async (req, res) => {
  let obj = req.body;
  // console.log(obj)
  if(obj.id == null || obj.id == '') {
    res.json({msg: 'delete failed'})
  }
  let categoryDao = new CategoryDao(pool);
  let result = await categoryDao.deleteCategory(obj.id);
  if(result) {
    res.json({msg: 'delete success'})
  }else {
    res.json({msg: 'delete failed'})
  }
})

/* 获取 分类 */
router.post(ApiConstants.API.category.getCategory, async (req, res) => {
  let categoryDao = new CategoryDao(pool);
  let resultList = await categoryDao.getCategory();
  if(resultList) {
    res.json(resultList)
  }else {
    res.json({msg: 'get failed'})
  }
})


module.exports = router;