//开发环境
var webpack = require('webpack')
var config = require('./webpack.base.config')
// dev配置
config.devServer = {
	hot: true,
	inline: true,
	proxy: {
	  "/": {
	   target: "https://sujiefs.com",
	   secure: false,
	   changeOrigin: true
	  },
	}
}
config.devtool = '#source-map'
module.exports = config