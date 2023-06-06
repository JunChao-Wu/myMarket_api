
import { logger } from "../utils/loggerUtil/logger";
import { ValidateUtil } from "../utils/request/validate/ValidateUtil";

export class BaseDomain {
  constructor(request) {
    this.request = request;
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


