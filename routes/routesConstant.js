
const fs = require("fs");

const baseApiPath = `service`;
const baseVersion = `v1`;
export const ROOT = `/${baseApiPath}/${baseVersion}`;
export const apiPath = {
  goods: `${ROOT}/goods`,
  category: `${ROOT}/category`,
}

export const API = {
  goods: {
    getGoodsList: `${apiPath.goods}/list`,
    getGoodsDetail: `${apiPath.goods}/detail`,
    saveGoods: `${apiPath.goods}/save`,
  },
  category: {
    getCategoryList: `${apiPath.category}/list`,
    getCategoryDetail: `${apiPath.category}/detail`,
    updateCategory: `${apiPath.category}/update`,
  }
}





/**
 * 生成全url文档
 */
const filePath = "./routes/apiMarkDown.md";
export function makeApiFile() {
  // 构建文档基础数据
  let fileContent = "";
  fileContent += `## **系统全路径**\n`;
  fileContent += `---\n`;
  fileContent += `>#### 所有补全基路径\n`;
  // 获取补全url
  const midPathList = [ROOT];
  for (let i = 0; i < midPathList.length; i++) {
    const midPath = midPathList[i];
    fileContent += `* ${midPath}\n\n`;
  }

  // 完整url表格
  let times = 1;
  let areaMap = {};
  fileContent += `**序号**|**controller**|**url**\n`;
  fileContent += `--:|:--:|:--\n`;
  for (const key1 in API) {
    if (Object.hasOwnProperty.call(API, key1)) {
      const area = API[key1];
      for (const key2 in area) {
        if (Object.hasOwnProperty.call(area, key2)) {
          const apiPathEnd = area[key2];
          const entirePath = `${ROOT}${apiPathEnd}`;
          let blank = key1;
          blank = blank.replace(/[0-9a-z]/g , ` `);
          // 记录完整url
          let controller = areaMap[key1] ? blank : key1;
          fileContent += `${times}|${controller}|${entirePath}\n`;
          areaMap[key1] = 1;
          times += 1;
        }
      }
    }
  }
  try {
    fs.writeFileSync(filePath, fileContent, "utf-8");
  } catch (error) {
    console.log(error);
  }
}

