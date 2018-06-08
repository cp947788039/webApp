//生产环境
var webpack = require('webpack')
var config = require('./webpack.base.config')
var path = require("path");
var StringReplacePlugin = require("string-replace-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HttpPushWebpackPlugin = require('http-push-webpack-plugin'); //http-push

//项目名字
var projectName = "/";

/*-----------------------判断是服务端集成环境打包 还是 本地打包----------------------------------*/
let proDirPath = '../dist'
let proDirName = 'production'

// 服务端shell 打包
if(process.env.HTTP_PUSH == 'dist-build'){
    proDirPath = '/data/html/b2c-h5-bd'
    proDirName = 'afu'
}else if(process.env.HTTP_PUSH == 'online-build'){
    proDirPath = '/usr/local/nginx/h5'
    proDirName = 'afu'
};
/*-----------------------------------------------------------------------------------------*/

//生成生产环境目录
config.output.path = path.resolve(__dirname, `${proDirPath}/${proDirName}`);
config.output.filename = '[name].[chunkhash].js'
config.output.chunkFilename = "[name].[chunkhash].js"
config.output.publicPath = './'

//打包api 替换
config.module.loaders = (config.module.loaders || []).concat([{
    test: path.resolve(__dirname, '../src' + projectName + 'assets/common/js/config.js'),
    loader: StringReplacePlugin.replace({
        replacements: [
            {
                pattern: /BDEGO/,
                replacement: function(match, p1, offset) {
                    return 'BD';
                }
            },{
                pattern: /homeUrl: "\/",/g,
                replacement: function(match, p1, offset) {
                    return 'homeUrl:"/afu/",';
                }
            },
        ]
    })
}])

config.devtool = false;

config.plugins = (config.plugins || []).concat([
    // 清除上一次生成的文件
    // new CleanWebpackPlugin([proDirName], {
    //     root: path.resolve(__dirname, proDirPath),
    //     verbose: true,
    //     dry: false,
    // }),
    //string替换
    new StringReplacePlugin(),
    // this allows uglify to strip all warnings
    // from Vue.js source code.
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
])

// webpack http-push 上传
if (process.env.HTTP_PUSH === 'http-push') {
    config.plugins = (config.plugins || []).concat([
        new HttpPushWebpackPlugin({
            receiver: 'http://xxx.com/receiver', // 服务端文件上传接口
            token: 'webpack', // 验证token
            to: '../../html/wangwei', // 注意这个是指的是测试机器的路径，而非本地机器
        }),
    ])
};


module.exports = config