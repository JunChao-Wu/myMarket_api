
import { API } from "../routesConstant";
import { Crud } from "../../utils/request/crud";

const express = require('express');
const goods = express.Router();

const crud = new Crud(goods);

import { AddGoodsDomain } from "../../domain/goods/AddGoodsDomain";
import { QueryGoodsListDomain } from "../../domain/goods/QueryGoodsListDomain";


crud.post(API.goods.saveGoods, AddGoodsDomain);
crud.get(API.goods.getGoodsList, QueryGoodsListDomain);



module.exports = goods;
