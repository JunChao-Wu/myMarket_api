const _typeOf = function(data) {
  let reg = /^\[object (\w+)\]/;
  let value = reg.exec(Object.prototype.toString.call(data));
  return value[1];
}

const deepCloneObject =  function(oldObj) {
  const newObj = {};
  for(let key in oldObj) {
    let value = oldObj[key];
    if(_typeOf(value) == 'Object') {
      newObj[key] = deepCloneObject(value);
    }else {
      newObj[key] = value
    }
  }
  return newObj;
}

exports._typeOf = _typeOf;
exports.deepCloneObject = deepCloneObject;