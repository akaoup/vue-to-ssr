
//根据不同的环境配置loader项
module.exports = (isDev) => {
	return {
		//清除文本换行等情况的空格
		preserveWhitespace: true,
		//extractCSS:true 把vue的css提取到单独的文件 开发的时候不用分离css
		extractCSS: !isDev,
		//组件的热更换
		hotReload: true,

		// cssModules: {
		// 	localIdentName:isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
		// 	//把css -连接命名类名的class自动转成驼峰式命名
		// 	camelCase: true
		// }		

	}
}