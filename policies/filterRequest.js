


// 获取前端参数
export function filterRequest(req, res, next) {

  // let test = process.env.BH_API_URL;
  let method = req && req.method;
  let data = null;
  if (method === "GET") {
    data = req["query"];
  } else {
    data = req["body"];
  }

  const ip = req.ip;
  const headers = req.headers || {};
  headers["ip"] = ip;
  
  data["headers"] = headers;

  next();
}