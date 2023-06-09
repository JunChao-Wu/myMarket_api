
import { logger } from "../utils/loggerUtil/logger";
import { BaseAction } from "./BaseAction";



export class ProcyAction extends BaseAction {
  constructor () {
    super()
  }

  async execute () {
    this.startTime = new Date().getTime();
    let result = null;
    try {
      result = await this.handle();
      this.showTimeStamp();

    } catch (error) {
      logger.warn(error);
    }
    return {
      success: true,
      data: result,
    }
  }


  showTimeStamp () {
    this.endTime = new Date().getTime();
    let processTime = this.endTime - this.startTime;
    logger.info(`${this.actionName()} 用时: ${processTime}ms`);
  }
  

}




