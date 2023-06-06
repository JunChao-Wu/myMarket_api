


// 获取前端参数
export function filterRequest(req, res, next) {

  let test = process.env.BH_API_URL;
  console.log("🚀 ~ file: filterRequest.js:8 ~ filterRequest ~ test:", test)
  
  next();
}