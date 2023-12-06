import { v4 as uuidv4 } from 'uuid';

// 获取前端参数
export function filterRequest(req, res, next) {

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
  data["requestId"] = uuidv4().replace(/-/g, "");

  next();
}
