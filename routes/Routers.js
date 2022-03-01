const { Router } = require('express');
const router = Router();

/* 引入各路由模块 */
const purchase = require('./purchase/purchase');
const goods = require('./goods/goods');
const category = require('./category/category');
const warningLine = require('./warningLine/waringLine');


/* 主要路由处理 */
router.use('/purchase', purchase);
router.use('/goods', goods)
router.use('/category', category);
router.use('/warningLine', warningLine);


module.exports = router;

