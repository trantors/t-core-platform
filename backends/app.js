var http = require('http');
var path = require('path');
var co = require('co');
var colors = require('colors');
var koa = require('koa');
var session = require('koa-generic-session');
// var RethinkStore = require('koa-generic-session-rethinkdb');
var staticServer = require('koa-static');
// 用于挂载子中间件
var mount = require('koa-mount');

var views = require('co-views');

var config = require('./config');

var logger_util = require('./utils/logger');
var PGSQLStore = require('./utils/session');
var app = koa();

var CDN = '';
// 设置access loger 和 CDN
if (app.env === 'development') {
    var logger = require('koa-logger');
    app.use(logger());
    // CDN = 'http://localhost:4800'; // just for ensure cdn config on production
    CDN = '';
    // 静态文件放最前面－仅开发时使用
    app.use(mount('/assets', staticServer(path.join(__dirname + '/assets/'))));
} else {
    var accesslog = require('koa-accesslog');
    app.use(accesslog());
    CDN = config.CDN;
    // CDN = 'http://localhost:4000'; // just for ensure cdn config on production
}

// 设置session

var db = require('./models/db');
var pgsqlStore = new PGSQLStore({
    db: db
});
// co(pgsqlStore.setup()); // init session
app.keys = ['pony', 'erw@#$44rr3#@$#5633tert$%%@#$@!#EDWDFERT^&^%4332eq34532'];
app.use(session({
    rolling: true,
    store: pgsqlStore,
    cookie: {
        path: '/',
        httpOnly: true,
        maxage: 1000 * 60 * 20, // 20分钟不动系统，将自动退出。
        rewrite: true,
        signed: true
    }
}));
// 载入jade模版引擎
var locals = {
    _: require('lodash'),
    moment: require('moment'),
    Loader: require('loader'), // 静态资源编译器
    CDN: CDN, //CDN服务器的前缀
    assetsMap: require('./assets.json')
};

app.use(function*(next) {
    this.render = views(__dirname + '/views/', {
        map: {
            html: 'ejs',
            jade: 'jade'
        },
        'default': 'jade', //默认扩展名
        locals: locals
    });
    yield next;
});

// 载入路由
process.stdout.write('Loading routes ');
var router = require('./routes/main');
app.use(router.routes());
app.use(router.allowedMethods());
process.stdout.write(colors.green('\tDONE'));
process.stdout.write(colors.yellow('  [' + router.stack.length + '] paths loaded. \n'))
    // console.log(router.stack.length);
    // 错误捕获
app.on('error', function(err, ctx) {
    logger_util(err, 1);
    logger_util(ctx, 1);
});

// 输出app实例
module.exports = http.createServer(app.callback());
