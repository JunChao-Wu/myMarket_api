

import { logger } from "../loggerUtil/logger";


export class Crud {
  constructor(router) {
    this.router = router;
  }

  post (route, domain) {
    this.handler("post", route, domain);
  }

  get (route, domain) {
    this.handler("get", route, domain);
  }

  put (route, domain) {
    this.handler("put", route, domain);
  }

  delete (route, domain) {
    this.handler("delete", route, domain);
  }

  handler(method, route, Domain) {
    this.router[method](route, async function(req, res, next) {
      let _param = method === "get" ? req.query : req.body;
      logger.info(`${route} 入参为: ${JSON.stringify(_param)}`);
      let callback = new Callback(res);
      let result = {};
      try {
        result = await new Domain(_param).execute();
        callback.successCallback(result);
      } catch (error) {
        logger.error(error);
        callback.errorCallback(error);
      }
    });
  }

}


class Callback {
  constructor(res) {
    this.res = res;
  }

  successCallback (response = {}, message) {
    response.succ = true;
    response.status = 200;
    return this.res.json(response);
  }

  errorCallback (response = {}, errorMessage) {
    response.succ = false;
    response.status = 500;
    return this.res.json(response);
  }
}
