var path = require('path'),
    webpack = require('webpack');

var vue = require('vue-loader'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: path.join(__dirname, './src/app'),
    devtool: 'source-map',
    entry: {
        app: './js/app.js',
        vendor: ["vue", "vue-router", "vue-resource", "es6-promise"]
    },
    output: {
        path: path.resolve(__dirname, "static"),
        filename: 'app.bundle.js',
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("app.bundle.css"),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, "src/app/assets/libs/**/*"),
                to: path.join(__dirname, "static/assets/libs/"),
            },
            {
                from: path.join(__dirname, "src/app/favicon.png"),
                to: path.join(__dirname, "static/"),
            }
        ])
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules'],
        alias: {
            "_api": path.join(__dirname, "src/" + "app" + "/js/api"),
            "_vuex": path.join(__dirname, "src/" + "app" + "/js/vuex"),
            "_common": path.join(__dirname, "src/" + "app" + "/js/common"),
            "_components": path.join(__dirname, "src/" + "app" + "/js/components"),
            "_filters": path.join(__dirname, "src/" + "app" + "/js/filters"),
            "_router": path.join(__dirname, "src/" + "app" + "/js/router"),
            "_store": path.join(__dirname, "src/" + "app" + "/js/store"),
            "_style": path.join(__dirname, "src/" + "app" + "/js/style"),
            "_ui-modules": path.join(__dirname, "src/" + "app" + "/js/ui-modules"),
            "_util": path.join(__dirname, "src/" + "app" + "/js/util"),
            '_sass': path.join(__dirname, "src/" + "app" + "/sass"),
        },
        root: [
            path.join(__dirname, "")
        ]
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg|gif|)$/,
                loader: 'file-loader?name=assets/images/[name].[ext]'
            }, {
                test: /\.vue$/,
                loader: 'vue'
            }, {
                test: /\.js$/,
                exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }, {
                test: /\.css$/,
                loaders: ["style", "css", "sass"]
            }, {
                test: /\.scss$|\.sass$/,
                loader: ExtractTextPlugin.extract("style", "css?sourceMap!sass?sourceMap")
            }, {
                test: /\.(eot|ttf|woff|woff2)?$/,
                loader: 'url-loader?limit=10&name=assets/fonts/[name].[ext]'
            }]
    }
};
