const routerApi = require('./router/index');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser'); // post 数据是需要
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(function(req, res, next) {
    // 设置请求头为允许跨域
    res.header("Access-Control-Allow-Origin", "*");
    // 设置服务器支持的所有头信息字段
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // 设置服务器支持的所有跨域请求的方法
    res.header("Access-Control-Allow-Methods", "POST,GET");
    // next()方法表示进入下一个路由
    next();
});
app.use('/api', routerApi);

app.listen(3000);
console.log('success listen at port:3000......');