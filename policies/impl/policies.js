
/**
 * 加过滤器
 * 1、加 modulesMap
 * 2、加 validateList
 * 3、加 policiesMap
 */

const express = require('express');
const policies = express.Router();
import { API } from "../../routes/routesConstant";

import { filterRequest } from "../filterRequest";
import { test2 } from "../test2";

// 过滤器map
const modulesMap = {
  "filterRequest": filterRequest,
  "test2": test2,
}
// 全过滤器及基本顺序
const validateList = ["filterRequest", "test2"];

// 过滤器生效对象, 默认全走
const policiesMap = {
  "goods": {
    "*": ["test2", "filterRequest"],
    "saveGoods": ["filterRequest"],
    "getGoodsList": ["filterRequest"],
  }
}

const policiesUrlMap = {}; // key: policie value: [url]

for (const controllerName in API) {
  if (Object.hasOwnProperty.call(API, controllerName)) {
    const domainMap = API[controllerName];
    // 没有的话: 默认全走拦截器
    // 只有*号: 就全走星号
    // 有*有其它: 其它走自己, 其余路径全走*号
    // 没有*有其它: 其它走自己, 其余路径全拦截器

    const controllerMap = policiesMap[controllerName];   // 有无
    for (const domainName in domainMap) {
      if (Object.hasOwnProperty.call(domainMap, domainName)) {
        const policiesList = (controllerMap && (controllerMap[domainName] || controllerMap["*"])) || validateList || [];
        let entireUrl = domainMap[domainName];
        for (let i = 0; i < policiesList.length; i++) {
          const _policie = policiesList[i];
          if (!policiesUrlMap[_policie]) {
            policiesUrlMap[_policie] = [];
          }
          policiesUrlMap[_policie].push(entireUrl);
        }
      }
    }
  }
}

for (let i = 0; i < validateList.length; i++) {
  const validate = validateList[i];
  const urlList = policiesUrlMap[validate];
  policies.use(urlList, modulesMap[validate]);
}

module.exports = policies;
