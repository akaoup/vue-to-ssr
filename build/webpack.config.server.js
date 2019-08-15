const path = require('path')
const webpack = require('webpack')

//Vue-loader在15.*之后的版本使用都是需要伴生 VueLoaderPlugin的,
const VueLoaderPlugin = require('vue-loader/lib/plugin')

//为了抽离css样式
const ExtractPlugin = require('extract-text-webpack-plugin')

//各个配置文件的连接
const merge = require('webpack-merge')
//引入公共配置文件
const baseConfig = require('./webpack.config.base.js')

//生成json文件 用于服务器端插件
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config 

config = merge(baseConfig, {
		target: 'node',
		entry: path.join(__dirname, '../clientsrc/server-entry.js'),
		// 代码报错定位
		devtool: '#source-map',
		output: {
			//将库的返回值分配给module.exports
			libraryTarget: 'commonjs2',
			filename: 'server-entry.js',
			path: path.join(__dirname, '../server-build')
		},
		// 不打包的文件
		externals: Object.keys(require('../package.json').dependencies),
    module: {
    	rules: [
    		{
					test: /\.styl/,
					use: ExtractPlugin.extract({
						//编译后用什么loader来提取css文件
						fallback:'vue-style-loader',
						//指定css-loader，stylus-loader去编译文件
						use: [
							'css-loader',
							{
								//自动添加浏览器前缀，install postcss-loader autoprefixer -D
								loader: 'postcss-loader',
								options: {
									sourceMap: true
								}
							},
							'stylus-loader'
						]	
					})
				}
    	]
    },
    plugins: [
			 new ExtractPlugin('styles.[md5:contenthash:hex:8].css'),
			 new VueLoaderPlugin(),
			 new webpack.DefinePlugin({
			 	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			 	'process.ebv.VUE_ENV': '"server"'
			 }),
			 new VueServerPlugin()
    ]

  })

module.exports = config
