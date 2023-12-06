
const paramType = {
  integer: "integer",
  float: "float",
  string: "string",
  array: "array",
  object: "object",
  boolean: "boolean",
};

function getType(data) {
  const typeMap = {
    "[object Object]": "object",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Null]": "null",
    "[object Undefined]": "undefined",
    "[object Boolean]": "boolean",
  };
  let type = Object.prototype.toString.call(data);
  return typeMap[type].toLocaleLowerCase();
}


export class ModelMaker {
  constructor() {
    this.role = {};
  }

  keys () {
    return this.role;
  }

  integer () {
    this.role.type = paramType.integer;
    return this;
  }

  float () {
    this.role.type = paramType.float;
    return this;
  }

  string () {
    this.role.type = paramType.string;
    return this;
  }

  array () {
    this.role.type = paramType.array;
    return this;
  }

  object () {
    this.role.type = paramType.object;
    return this;
  }

  boolean () {
    this.role.type = paramType.boolean;
    return this;
  }

  /**
   * 是否必传参数
   * @param {boolean} isRequired
   */
  required (isRequired = true) {
    this.role.required = !!isRequired;
    return this;
  }

  /**
   * 参数描述
   * @param {String} desc
   */
  des (desc) {
    this.role.des = desc + "";
    return this;
  }

  /**
   * 参数值限制
   * @param {Array} limitArr
   * @returns
   */
  emu (limitArr = []) {
    if (!limitArr || limitArr.length <= 0) {
      return this;
    }
    if (this.role.type) {
      for (let i = 0; i < limitArr.length; i++) {
        const limitEl = limitArr[i];
        if (getType(limitEl) !== this.role.type) {
          throw new Error("emu存在限制值不符合该校验的类型限制");
        }
      }
    }
    this.role.emu = limitArr;
    return this;
  }

  /**
   * 正则
   * @param {String} regex
   * @param {String} errMsg
   */
  regex (regex, errMsg = "{des}输入错误") {
    this.role.regex = {
      regex,
      errMsg,
    };
    return this;
  }

  /**
   * 最小值或长度
   * @param {Number} min
   */
  min (min) {
    if (min !== null) {
      this.role.min = min;
    }
    return this;
  }

  /**
   * 最大值或长度
   * @param {Number} max
   */
  max (max) {
    if (max !== null) {
      this.role.max = max;
    }
    return this;
  }

  /**
   *
   * @param {String} attrName
   * @param {String} compareKey lt: 需要小于  gt: 需要大于   equal: 等于  lte: 需要小于等于  gte: 需要大于等于
   */
  compareTo (attrName, compareKey) {
    this.role.compareTo = {
      attrName,
      compareKey,
    };
    return this;
  }

  /**
   * 去除空格
   */
  trim () {
    this.role.trim = true;
    return this;
  }

  /**
   * 空的时候的默认值
   * @param {*} _default
   */
  defaultTo (_default) {
    this.role.defaultTo = _default;
    return this;
  }

  /**
   * 复杂结构的子参数
   * @param {Object} childRole
   */
  child (childRole) {
    this.role.child = childRole;
    return this;
  }

}


