

import { BaseDomain } from "../BaseDomain";

export class SaveCategoryDomain extends BaseDomain {
  constructor(request) {
    super(request)
    this.request = request;
  }

  async excute () {
    return {
      status: 200, action: "SaveCategory", message: "SaveCategory成功"
    }
  }

}


