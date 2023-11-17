
export class ValidateUtil {


  static validate (_originData, dataRole) {
    if (!dataRole || !_originData) {
      return;
    }
    let originData = deepClone(_originData);

    let targetRole = dataRole.targetRole || {};
    for (const paramName in targetRole) {
    if (Object.hasOwnProperty.call(targetRole, paramName)) {
        const paramRole = targetRole[paramName];

        // 是否必传
        if (paramRole.required && originData[paramName] == null) {
          throw new createError({
            code: "xxxxx",
            message: `${paramName}必传`,
            value: originData[paramName],
            columnName: paramName,
          });
        }

        // 验证参数类型
        if (paramRole.type && originData[paramName] != null && getType(originData[paramName]) != paramRole.type) {
          throw new createError({
            code: "xxxxx",
            message: "验证参数类型",
            value: originData[paramName],
            columnName: paramName,
          });
        }

        // 参数值限制
        if (paramRole.emu && originData[paramName] != null && paramRole.emu.includes(originData[paramName]) == -1) {
          throw new createError({
            code: "xxxxx",
            message: "参数值限制",
            value: originData[paramName],
            columnName: paramName,
          });
        }

        // 正则匹配结果
        if (paramRole.regex && originData[paramName] != null) {
          let regx = new RegExp(paramRole.regex.regex);
          let isPass = true;
          if (["string", "float", "integer"].includes(getType(originData[paramName]))) {
            isPass = isPass && regx.test(originData[paramName]);
          }
          if ("array" == getType(originData[paramName])) {
            for (let i = 0; i < originData[paramName].length; i++) {
              const el = originData[paramName][i];
              isPass = isPass && regx.test(el);
            }
          }
          if (!isPass) {
            throw new createError({
              code: "xxxxx",
              message: "正则匹配结果",
              value: originData[paramName],
              columnName: paramName,
            });
          }
        }

        // 最小值
        if (paramRole.min != "null" && originData[paramName] != null) {
          if (getType(originData[paramName]) == "string" && originData[paramName].length < paramRole.min) {
            throw new createError({
              code: "xxxxx",
              message: "最小值",
              value: originData[paramName],
              columnName: paramName,
            });
          }
          if (["integer", "float"].includes(getType(originData[paramName])) && originData[paramName] < paramRole.min) {
            throw new createError({
              code: "xxxxx",
              message: "最小值",
              value: originData[paramName],
              columnName: paramName,
            });
          }
        }

        // 最大值
        if (paramRole.max != "null" && originData[paramName] != null) {
          if (getType(originData[paramName]) == "string" && originData[paramName].length > paramRole.max) {
            throw new createError({
              code: "xxxxx",
              message: "最大值",
              value: originData[paramName],
              columnName: paramName,
            });
          }
          if (["integer", "float"].includes(getType(originData[paramName])) && originData[paramName] > paramRole.max) {
            throw new createError({
              code: "xxxxx",
              message: "最大值",
              value: originData[paramName],
              columnName: paramName,
            });
          }
        }

        // 参数间对比
        if (paramRole.compareTo && originData[paramName] != null && ["float", "integer"].includes(getType(originData[paramName]))) {
          let _current = originData[paramName];
          let _target = originData[paramRole.compareTo.attrName];
          let compareKey = paramRole.compareTo.compareKey;
          let errCode = null;
          switch (compareKey) {
            case "lt":
              if (!(_current < _target)) {
                errCode = "";
              }
              break;
          
            case "gt":
              if (!(_current > _target)) {
                errCode = "";
              }
              break;
          
            case "equal":
              if (_current != _target) {
                errCode = "";
              }
              break;
          
            case "lte":
              if (!(_current <= _target)) {
                errCode = "";
              }
              break;
          
            case "gte":
              if (!(_current >= _target)) {
                errCode = "";
              }
              break;
          
            default:
              break;
          }
          if (errCode) {
            throw new createError({
              code: errCode,
              message: "参数间对比",
              value: originData[paramName],
              columnName: paramName,
            });
          }
        }

        // 去除首尾空格
        if (paramRole.trim) {
          getType(originData[paramName]) == "string" && (originData[paramName] = originData[paramName].trim());
        }

        // 空的时候的默认值
        if (paramRole.defaultTo != null && originData[paramName] == null) {
          originData[paramName] = paramRole.defaultTo;
        }

        // 复杂结构的子参数
        if (paramRole.child && originData[paramName] != null) {
          let _type = getType(originData[paramName]);
          if (_type == "object") {
            this.validate(originData[paramName], paramRole.child);
          }
          if (_type == "array" && originData[paramName].length > 0) {
            for (let i = 0; i < originData[paramName].length; i++) {
              const el = originData[paramName][i];
              this.validate(el, paramRole.child);
            }
          }
        }

      }
    }

    if (targetRole.isReturn) {
      // 只返回校验的数据
      return originData;
    } else {
      return _originData;
    }
  }
}




/**
 * 错误类型自定义
 * @param {*} option 
 */
function createError (option) {
  this.code = option.code;
  this.errCode = option.code;
  this.message = option.message;
  this.value = option.value;
  this.columnName = option.columnName;
}

createError.prototype = new Error();
createError.prototype.constructor = createError;

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
  }
  let type = Object.prototype.toString.call(data);
  type = typeMap[type].toLocaleLowerCase();
  if (type == "number") {
    // 整数
    let intRegx = new RegExp(/^-?[1-9]\d*$/, "i");
    // 浮点数
    let floatRegx = new RegExp(/^-?([1-9]\d*\.\d+|0\.\d*[1-9]\d*|\d+\.\d+)$/, "i");
    if (floatRegx.test(data)) {
      type = "float";
    } else if (intRegx.test(data)) {
      type = "integer";
    }
  }
  return type;
}

function deepClone(target) {
  let result = null;
  if (getType(target) == "object") {
    result = {};
    for (const key in target) {
      if (Object.hasOwnProperty.call(target, key)) {
        const value = target[key];
        result[key] = value;
      }
    }
  }
  if (getType(target) == "array") {
    result = new Array(target.length).fill(0);
    for (let i = 0; i < target.length; i++) {
      const el = target[i];
      result[i] = el;
    }
  }
  return result || target;
}


