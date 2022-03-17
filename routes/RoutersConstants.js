
export const ApiConstants = {
  API: {
    purchase: {
      addPurchase: {
        url: '/addPurchase',
        belong: 'purchase',
      },
      getPurchase: {
        url: '/getPurchase',
        belong: 'purchase',
      },
      editPurchase: {
        url: '/editPurchase',
        belong: 'purchase',
      },
    },
    goods: {
      addGoods: {
        url: '/addGoods',
        belong: 'goods',
      },
      getGoods: {
        url: '/getGoods',
        belong: 'goods',
      },
      deleteGoods: {
        url: '/deleteGoods',
        belong: 'goods',
      },
      getPurchaseNameList: {
        url: '/getPurchaseNameList',
        belong: 'goods',
      },
    },
    warningLine: {
      getWarningLine: {
        url: '/getWarningLine',
        belong: 'warningLine',
      },
      editWarningLine: {
        url: '/editWarningLine',
        belong: 'warningLine',
      },
    },
    category: {
      addCategory: {
        url: '/addCategory',
        belong: 'category',
      },
      getCategory: {
        url: '/getCategory',
        belong: 'category',
      },
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
// export const createApiFile = function () {
  
// }