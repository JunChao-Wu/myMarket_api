const { Router } = require('express');

const goods = require("./impl/goods");
// const category = require("./impl/category");

const router = Router();

router.use(goods);
// router.use(category)


module.exports = router;
