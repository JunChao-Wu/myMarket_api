
import { logger } from "../utils/loggerUtil/logger";
import { ValidateUtil } from "../utils/request/validate/ValidateUtil";

import mysql from "../utils/dbUtil/mysql";

export class BaseDomain {
  constructor(request) {
    this.request = request;
    this.t = null;
  }
  
  // 创建mysql数据库事务
  async transaction () {
    this.t = await mysql.transaction();
  }

  async commit () {
    if (!this.t) {
      console.log("🚀 ~ file: BaseDao.js:23 ~ BaseDao ~ rollback ~ 没有开启事务, 无效 commit");
      return;
    }
    // mysql
    console.log("🚀 ~ file: BaseDao.js:23 ~ BaseDao ~ rollback ~ commit");
    await this.t.commit();
  }

  async rollback () {
    if (!this.t) {
      console.log("🚀 ~ file: BaseDao.js:23 ~ BaseDao ~ rollback ~ 没有开启事务, 无法回滚");
      return;
    }
    // mysql
    console.log("🚀 ~ file: BaseDao.js:23 ~ BaseDao ~ rollback ~ 回滚");
    await this.t.rollback();
  }

  validateAndFormat (role, request) {
    request = request || this.request;
    return ValidateUtil.validate(request, role);
  }

  makeBaseResult () {
    return {
      success: false,
      code: 502,
      message: "系统异常"
    }
  }

  makeSuccessResult (response = null, methodDesc) {
    let data = null;
    if (response && response.success) {
      data = response.data;
    }
    return {
      success: true,
      data: data,
      message: `${methodDesc}成功!`,
    }
  }

  makeErrorResult (e, methodDesc) {
    console.log("🚀 ~ file: BaseDomain.js:36 ~ BaseDomain ~ makeErrorResult ~ e:", e)
    logger.error(e);
    let errMessage = e.message || `${methodDesc}失败!`;
    let errCode = e.errCode || e.code;
    return {
      success: false,
      code: 200,
      errCode,
      message: errMessage,
    }
  }

}


