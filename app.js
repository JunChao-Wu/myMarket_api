const express = require('express');
const cors = require('cors');

const Routers = require('./routes/Routers');

const app = express();
const port = 1339;

import { Root, createApiFile } from "./routes/RoutersConstants";

// 解决跨域
app.use(cors());

/* 静态文件启用 */
app.use(express.static('./public'));

app.use(express.urlencoded({extended: false}));
// 处理json格式数据
app.use(express.json());

app.use(createApiFile);

// 生成api文件
// app.use(createApiFile());

app.get('/', (req, res) => res.send('./public/index.html'));
/* 处理单页面强制刷新的路由路劲问题 */
app.get('/index/purchase', (req, res) => res.redirect('/'));
app.get('/index/goods', (req, res) => res.redirect('/'));
app.get('/index/category', (req, res) => res.redirect('/'));
app.get('/index/setting', (req, res) => res.redirect('/'));



// api处理
app.use(Root.url, Routers);




process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);

});

app.listen(port, () => console.log(`app listening on ${port}!`));
