
import { SystemParts } from "./RoutersConstants";

const { Router } = require('express');
const router = Router();

/* 引入各路由模块 */
const purchase = require('./purchase/purchase');
const goods = require('./goods/goods');
const category = require('./category/category');
const warningLine = require('./warningLine/waringLine');


/* 主要路由处理 */
router.use(SystemParts.purchase.url, purchase);
router.use(SystemParts.goods.url, goods)
router.use(SystemParts.category.url, category);
router.use(SystemParts.warningLine.url, warningLine);


module.exports = router;

