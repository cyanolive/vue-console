var path = require('path'),
    os = require('os'),
    co = require('co'),
    open = require('open'),
    domain = require('domain'),
    webpack = require('webpack'),
    webpackDevServer = require('webpack-dev-server'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

// 建立错误监听程序
var serverDomain = domain.create();

var webpackConfig = require('./webpack.config.js');

var IPV4, PORT = 8080,
    argv = process.argv.slice(2);

function getLocalIP() {
    var map = [];
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
        var iface = ifaces[dev];
        for (var i=0; i<iface.length; i++){
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
                return alias.address;
            }
        }
    }
    return map;
}

IPV4 = getLocalIP();

var config = {
    host: 'http://' + IPV4,
    _host_: IPV4,
};

if (argv[0] === '--production') {
    // 生产环境下
    webpackConfig.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("app.bundle.css")
    ]
} else {
    // 开发环境下
    webpackConfig.devtool = '#source-map'
}

var server;

function createServer(_port) {
    // webpackConfig.entry.app.unshift("webpack-dev-server/client?" + config.host + ":" + _port);
    // webpackConfig.entry.app.unshift("webpack/hot/dev-server");

    var compiler = webpack(webpackConfig);
    server = new webpackDevServer(compiler, {
        host: config.host,
        port: _port,
        contentBase: "static/", //指定访问目录
        hot: true,
        inline: true,
        debug: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
        stats: {
            colors: true
        },
    });
    server.listen(_port, config._host_, function () {
        // open(config.host + ":" + _port + "/");
    });
}

serverDomain.run(function () {
    console.log("host:http://" + IPV4 + ":" + PORT);
    createServer(PORT);
});

serverDomain.on('error', function (err) {
    server.close();
    PORT = PORT + 1;
    console.log("host:http://" + IPV4 + ":" + PORT);
    createServer(PORT);
});
