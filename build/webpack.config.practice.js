const path = require('path')
const webpack = require('webpack')

//Vue-loader在15.*之后的版本使用都是需要伴生 VueLoaderPlugin的,
const VueLoaderPlugin = require('vue-loader/lib/plugin')
//用于编译 Webpack 项目中的 html 类型文件
const HTMLPlugin = require('html-webpack-plugin')

//各个配置文件的连接
const merge = require('webpack-merge')
//引入公共配置文件
const baseConfig = require('./webpack.config.base.js')



const defaultPluins = [
		new VueLoaderPlugin(),
		new HTMLPlugin({
			template: path.join(__dirname, 'template.html')
		}),

    //适用于开发版本同线上版本在某些常量上有区别的场景:
    //记得引入webpack
    new webpack.DefinePlugin({
    	'process.env': {
    		NODE_ENV: '"development"'
    	}
    })
]

const devServer = {
		port: '8090',
		host: '0.0.0.0',
		//错误显示到页面
		overlay: {
			error: true,
		},
		//热刷新，页面不刷新内容也加载
		hot: true
}


let config 

config = merge(baseConfig, {
		entry: path.join(__dirname, '../practicesrc/index.js'),

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
    //Resolve 配置 入口文件 如何寻找模块所对应的文件
    //import vue from 'vue'
    resolve: {
    	alias: {
    		'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    	}
    },
    plugins: defaultPluins.concat([
    	//热加载组件
			new webpack.HotModuleReplacementPlugin(),
			
    ])

  })

module.exports = config



