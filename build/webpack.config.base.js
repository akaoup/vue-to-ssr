const path = require('path')
const webpack = require('webpack')

//引入vue-loader.config.js
const createVueLoaderOptions = require('./vue-loader.config.js')
//process 对象是一个全局变量，无需使用 require()，控制当前 Node.js 进程
const isDev = process.env.NODE_ENV === 'development'

const config = {
	mode: process.env.NODE_ENV || 'production',
	target: 'web',
	//入口文件
	entry: path.join(__dirname, '../clientsrc/client-entry.js' ),
	
	//打包出来的文件
	output: {
		filename:'bundle.[hash:8].js',
		path: path.join(__dirname,'../dist'),
		// 加这个配置是因为打包好的js文件渲染服务器时node不能跨域访问
		// webpack output is served from http://127.0.0.1:8000/
		publicPath: 'http://127.0.0.1:8000/'
	},

	//eslint-loader:对于这几种文件在使用真正的loader(lvue-oader)前，先通过eslint-loader预处理一遍
	module:{
		rules:[
			{
				test: /.(vue|js|jsx)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/,
				enforce: 'pre' 
			},
			{
				test: /.vue$/,
				loader:'vue-loader',
				options: createVueLoaderOptions(isDev)
			},
			{
				test: /.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /.jsx$/,
				loader: 'babel-loader',
			},
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},				
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				use: [
					{
						loader:'url-loader',
						options: {
							limit: 1024,
							name: 'resources/[path][name].[hash:8].[ext]'
						}
					}
				]
			}
		]
	}
}




module.exports = config



