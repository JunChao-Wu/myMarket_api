
import { logger } from "../utils/loggerUtil/logger";
import { ValidateUtil } from "../utils/request/validate/ValidateUtil";
import {Lock} from "../utils/lock/Lock";
import mysql from "../utils/dbUtil/mysql";

export class BaseDomain {
  constructor(request) {
    this.t = null;
    this.request = request;
    this.lockList = [];
    this.requestId = request.requestId;
  }
  
  // 创建mysql数据库事务
  async transaction () {
    this.t = await mysql.transaction();
  }

  async commit () {
    if (!this.t) {
      return;
    }
    // mysql
    await this.t.commit();
  }

  async rollback () {
    if (!this.t) {
      return;
    }
    // mysql
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

  async lock(key, seconds) {
    if (!key) {
      return;
    }
    let lockObj = new Lock(key, this.requestId);
    await lockObj.writeLock(seconds);
    this.lockList.push(lockObj);
  }

  async unLock () {
    if (this.lockList.length <= 0) {
      return;
    }
    for (let i = this.lockList.length - 1; i >= 0; --i) {
      const lockObj = this.lockList[i];
      await lockObj.unLock();
    }
  }

}


