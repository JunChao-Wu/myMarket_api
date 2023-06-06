
import { API } from "../routesConstant";
import { Crud } from "../../utils/request/crud";

const log4js = require("log4js");
const logger = log4js.getLogger();

const express = require('express');
const goods = express.Router();

const crud = new Crud(goods);

import { SaveGoodsDomain } from "../../domain/goods/SaveGoodsDomain";

crud.post(API.goods.saveGoods, SaveGoodsDomain);



module.exports = goods;
