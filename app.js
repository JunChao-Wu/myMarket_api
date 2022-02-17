const express = require('express');
const cors = require('cors')

/* 引入各路由模块 */
const purchase = require('./routes/purchase/purchase');
const goods = require('./routes/goods/goods');
const category = require('./routes/category/category');
const warningLine = require('./routes/warningLine/waringLine');


const app = express()
const port = 3000

// 解决跨域
app.use(cors())

/* 静态文件启用 */
app.use(express.static('./public'))

app.use(express.urlencoded({extended: false}))
// 处理json格式数据
app.use(express.json())

app.get('/', (req, res) => res.send('./public/index.html'))
/* 处理单页面强制刷新的路由路劲问题 */
app.get('/index/purchase', (req, res) => res.redirect('/'))
app.get('/index/goods', (req, res) => res.redirect('/'))
app.get('/index/category', (req, res) => res.redirect('/'))
app.get('/index/setting', (req, res) => res.redirect('/'))




/* 主要路由处理 */
app.use('/purchase', purchase);
app.use('/goods', goods)
app.use('/category', category);
app.use('/warningLine', warningLine);






process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);

});

app.listen(port, () => console.log(`Example app listening on port port!`))