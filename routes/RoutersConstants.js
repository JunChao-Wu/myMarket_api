
const fs = require("fs");

export const ApiConstants = {
  API: {
    purchase: {
      addPurchase: {
        url: '/add',
        belong: 'purchase',
      },
      getPurchase: {
        url: '/get',
        belong: 'purchase',
      },
      editPurchase: {
        url: '/edit',
        belong: 'purchase',
      },
      deletePurchase: {
        url: '/delete',
        belong: 'purchase',
      },
      getPurchaseList: {
        url: '/getPurchaseList',
        belong: 'purchase',
      },
    },
    goods: {
      addGoods: {
        url: '/add',
        belong: 'goods',
      },
      getGoods: {
        url: '/get',
        belong: 'goods',
      },
      deleteGoods: {
        url: '/delete',
        belong: 'goods',
      },
    },
    warningLine: {
      getWarningLine: {
        url: '/get',
        belong: 'warningLine',
      },
      editWarningLine: {
        url: '/edit',
        belong: 'warningLine',
      },
    },
    category: {
      addCategory: {
        url: '/add',
        belong: 'category',
      },
      getCategory: {
        url: '/get',
        belong: 'category',
      },
      deleteCategory: {
        url: '/delete',
        belong: 'category',
      }
    },
  },
}


export const SystemParts = {
  purchase: {
    url: '/purchase',
    belong: 'Root'
  },
  goods: {
    url: '/goods',
    belong: 'Root'
  },
  category: {
    url: '/category',
    belong: 'Root'
  },
  warningLine: {
    url: '/warningLine',
    belong: 'Root'
  },
};


export const Root = {
  url: '/service',
  belong: '',
};

// 生成便于查看的api格式
const path = "./routes/apiDoc"
export const createApiFile = function () {
  let fileContent = "";
  for (let key1 in ApiConstants) {
    const api = ApiConstants[key1];
    for (let partName in api) {
      const SystemParts = api[partName];
      for (let operationName in SystemParts) {
        const lastPart = SystemParts[operationName];

        const key = `ApiConstants.${key1}.${partName}.${operationName}`;
        const value = getValue(lastPart);
        fileContent = fileContent + `${key}: ${value}\n`;
      }
    }
  }
  try {
    fs.writeFileSync(path, fileContent, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

function getValue(urlObj) {
  if (!urlObj) {
    return "";
  }
  let result = "";
  let url = urlObj && urlObj.url || "";
  let belong = urlObj && urlObj.belong || "";
  result = url + result;
  while (belong) {
    const _SystemPart = SystemParts[belong];
    if(belong == "Root") {
      belong = Root.belong;
      url = Root.url;
    }else {
      belong = _SystemPart && _SystemPart.belong || null;
      url = _SystemPart && _SystemPart.url || "";
    }
    result = url + result;
  }
  return result;
}

createApiFile()