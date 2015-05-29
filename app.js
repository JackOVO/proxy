
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 5323);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // 设置模板引擎
app.use(express.favicon()); // 使用默认的favicon图标
app.use(express.logger('dev')); // 开发下显示简单日志
app.use(express.bodyParser()); // connect内建中间件, 用来解析请求体
app.use(express.methodOverride()); // connect内建中间件, 可以协助处理post请求,,
app.use(app.router); // 调用路由解析规则
// connect内建中间件, 设置根目录下的public文件夹为存放image, css, js等静态文件.
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
