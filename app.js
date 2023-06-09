require('babel-register');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const router = require('./routes/routes');
const policies = require('./policies/impl/policies');
import { setEnv } from "./env/env.config";

// import { makeApiFile } from "./routes/routesConstant";

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 启动时生成url的markdown
// makeApiFile()

// 处理全局变量
setEnv();


// 拦截器中间件
app.use("/", policies);
// 路由分发
app.use("/", router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

const port = 3000;
app.listen(port, () => console.log(`app listening on ${port}!`));

// module.exports = app;
