const path = require('path')
const webpack = require('webpack')

//Vue-loader在15.*之后的版本使用都是需要伴生 VueLoaderPlugin的,
const VueLoaderPlugin = require('vue-loader/lib/plugin')
//用于编译 Webpack 项目中的 html 类型文件
const HTMLPlugin = require('html-webpack-plugin')
//为了抽离css样式
const ExtractPlugin = require('extract-text-webpack-plugin')

//各个配置文件的连接
const merge = require('webpack-merge')
//引入公共配置文件
const baseConfig = require('./webpack.config.base.js')


const isDev = process.env.NODE_ENV === 'development'


const defaultPluins = [
		new VueLoaderPlugin(),
		new HTMLPlugin(),

    //适用于开发版本同线上版本在某些常量上有区别的场景:
    //记得引入webpack
    new webpack.DefinePlugin({
    	'process.env': {
    		NODE_ENV: isDev ? '"development"' : '"production"'
    	}
    })
]

const devServer = {
		port: '8000',
		host: '0.0.0.0',
		// 错误显示到页面
		overlay: {
			error: true,
		},
		// 对于 服务器没有对我们前端路由做处理的时候，会 Cannot GET /xxx
		// 另外，如果给服务器配置了public path的话，这里也要改成 '/public/index.html'
		historyApiFallback: {
			index: '/index.html'
		},
		// 热刷新，页面不刷新内容也加载
		hot: true
}


let config 

if (isDev) {
	//merge()会得到一个合并了baseConfig的新对象，这个对象的改变不会影响到baseConfig
	config = merge(baseConfig, {
		//编译后的代码压缩后去掉空格，且编译后跟源码差别大，
		//调试bug的时候只能定位到压缩处理后的代码位置，无法定位到开发环境中的代码，不利于调试代码
		//选择一种 source map 格式来方便调试过程
		devtool: '#cheap-module-eval-source-map',
    module: {
    	rules: [
    		{	
					test: /\.styl/,
					use: [
						'vue-style-loader',
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true
							}
						},
						'stylus-loader'
					]			
				}
    	]
    },
    devServer,
    plugins: defaultPluins.concat([
    	//热加载组件
			new webpack.HotModuleReplacementPlugin(),
			//错误情况不提交	 webpack4 取消
			//new webpack.NoEmitOnErrorsPlugin()
    ])

  })
	
} else {
	config = merge(baseConfig, {
		entry: {
			app: path.join(__dirname, '../clientsrc/index.js'),

		},
		output: {
			filename: '[name].[chunkhash:8].js'
		},
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
		plugins: defaultPluins.concat([
			//多入口时，需要使用name或hash值来确定打包出的css文件名，这样不会覆盖
			new ExtractPlugin('styles.[md5:contenthash:hex:8].css')
		]),

		optimization: {
	    splitChunks: {
	        chunks: 'all' 
	    },
	    runtimeChunk: true
		}
	})
		

}

module.exports = config



