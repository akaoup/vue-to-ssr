const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')

const config = {
	target: 'web',
	//入口文件
	entry: path.join(__dirname, 'src/index.js' ),
	optimization: {
	    splitChunks: {
	        chunks: 'all' 
	    }
	},
	//打包出来的文件
	output: {
		filename:'bundle.[hash:8].js',
		path: path.join(__dirname,'dist')
	},
	plugins: [
        
        new VueLoaderPlugin(),
        new HTMLPlugin(),

        //适用于开发版本同线上版本在某些常量上有区别的场景:
        //记得引入webpack
        new webpack.DefinePlugin({
        	'process.env': {
        		NODE_ENV: isDev ? '"development"' : '"production"'
        	}
        })
    ],
	module:{
		rules:[
			{
				test: /.vue$/,
				loader:'vue-loader'
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
				use:[
					'babel-loader'
				]
			},			
			{
				test: /\.(gif|jpg|jpeg|png|svg)$/,
				use: [
					{
						loader:'url-loader',
						options: {
							limit: 1024,
							name: '[name].[ext]'
						}
					}
				]
			}
		]
	},

}


if (isDev) {
	config.module.rules.push({	
		test: /\.styl/,
		use: [
			'style-loader',
			'css-loader',
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: true
				}
			},
			'stylus-loader'
		]			
	})
	//配置source-map方便调试
	config.devtool = '#cheap-module-eval-source-map'

	//webpack2*才有的配置
	//启动一个服务
	config.devServer = {
		port: '8000',
		host: '0.0.0.0',
		//错误显示到页面
		overlay: {
			error: true,
		},

		//热刷新，页面不刷新内容也加载
		hot: true

		//没有做路由配置映射的地址跳转
		// historyFallback:{

		// }

		//开启浏览器窗口
		//open: true
	} 

	config.plugins.push(
		//热加载组件
		new webpack.HotModuleReplacementPlugin(),
		//错误情况不提交	
		new webpack.NoEmitOnErrorsPlugin()	

	)
}else{
	config.entry = {
		app: path.join(__dirname, 'src/index.js'),
		vendor: ['vue']
	} 	
	config.output.filename = '[name].[chunkhash:8].js'
	config.module.rules.push({
		test: /\.styl/,
		use: ExtractPlugin.extract({
			fallback:'style-loader',
			use: [
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true
					}
				},
				'stylus-loader'
			]	
		})
	})

	config.plugins.push(
		new ExtractPlugin('styles.[md5:contenthash:hex:8].css'),

	)

	config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2, maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk: true
    }


}

module.exports = config



