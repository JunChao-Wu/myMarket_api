
import { logger } from "../utils/loggerUtil/logger";
import { BaseAction } from "./BaseAction";



export class ProcyAction extends BaseAction {
  constructor () {
    super()
  }

  async execute () {
    return await this._execute();
  }

  async _execute () {
    this.startTime = new Date().getTime();
    let result = null;
    try {
      let res = await this.handle();
      this.showTimeStamp();
      result = {
        success: true,
        data: res
      }
    } catch (error) {
      logger.warn(error);
      this.makeSqlErrorResult(error);
    }
    return result;
  }


  showTimeStamp () {
    this.endTime = new Date().getTime();
    let processTime = this.endTime - this.startTime;
    logger.info(`${this.actionName()} 用时: ${processTime}ms`);
  }


  makeSqlErrorResult (error) {
    let errMsg = error.sqlMessage || "sql error"
    throw new Error(errMsg);
  }
  
}




