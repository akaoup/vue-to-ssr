const Router = require('koa-router')
const axios = require('axios')
// 一个简单的内存文件系统。将数据保存在JavaScript对象中
// 跟node里的fs模块一摸一样，且它会扩展一些API，它不会把文件写入到磁盘上，直接写到内存里
const MemoryFS = require('memory-fs')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
// 引入我们的服务器配置
const serverConfig = require('../../build/webpack.config.server.js')
const serverRender = require('./server-render.js')

// 编译webpack, 这个serverCompiler可以直接在node里run或watch
// 它生成一个服务端渲染时要用到的一个bundle
// 这样在node开发环境中才能让webpack跑起来
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
// 指定serverCompiler这个bundle输出在MemoryFS里面
serverCompiler.outputFileSystem = mfs

// 声明一个bundle
let bundle

// 在client目录下每次修改一个文件，它都会重新执行一次打包，然后就可以拿到新的文件
// 调用 watch 方法会触发 webpack 执行器，之后会监听变更
// 一旦 webpack 检测到文件变更，就会重新执行编译，该方法返回一个 Watching 实例。
// watch(watchOptions, callback) stats 对象会被作为 webpack() 回调函数的第二个参数传入
serverCompiler.watch({}, (err, stats) => {

	// 编译错误不在 err 对象内，err 对象只会包含 webpack 相关的问题，比如配置错误
	if (err) throw err

	// 以 JSON 对象形式返回编译信息
	stats = stats.toJson()
	// 用来检查编译期是否有错误, 比如eslint的错误
	stats.errors.forEach(err => console.log(err))
	// 用来检查编译期是否有警告
	stats.warnings.forEach(warn => console.log(warn))

	// 读取生成的bundle文件
	const bundlePath = path.join(
		serverConfig.output.path,
		// 这里vue-ssr-server-bundle.json是使用 vue-server-renderer/server-plugin 插件时输出的文件名，
		// 可以使用默认的，也可以在使用VueServerPlugin插件时自定义
		// 这是服务器端插件
		'vue-ssr-server-bundle.json'
	)
	// 这里不是使用output时的filename,因为我们使用了 VueServerPlugin 这个插件，
	// mfs.readFileSync读取出来的都是字符串，得转成json
	// 最终，我们得到的bundle是个json数据
	bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
	console.log('new bundle generated')
})

// koa中间件 帮我们处理要服务端渲染要返回的东西
// 我们只需要在context.body上面指定我们要返回的html内容，我们就可以真正的返回这部分内容
const handleSSR = async (ctx) => {
	// 异步 使用的时候bundle还没打包好，所以先判断一下有没有bundle
	if (!bundle) {
		ctx.body = 'please wait a moment...'
		return
	}
  
  // vue-ssr-client-manifest.json跟上面的 vue-ssr-server-bundle.json类似，是插件自动生成的文件
  // 同时，我们要去客户端的配置中把这个插件加进去 ---"vue-server-renderer/client-plugin"
  // 这里的是客户端插件
  // clientManifestResp 是axios response的对象，它底下的data才是我们要的客户端json内容
	const clientManifestResp = await axios.get(
		'http://127.0.0.1:8000/vue-ssr-client-manifest.json'
	)
	// 一个由 vue-server-renderer/client-plugin 生成的客户端构建 manifest 对象
	// 此对象包含了 webpack 整个构建过程的信息
	// 从而可以让 bundle renderer 自动推导需要在 HTML 模板中注入的内容
	const clientManifest = clientManifestResp.data
	
	// 如果有了bundle之后，我们就进行服务端渲染的过程
  // 然后我们做服务端渲染，我们通过vue-server-render,它输出的内容只是<body>标签里面的html代码，
  // 那我们一个完整的html肯定要包含head,script,title,description,link,style之类的，但它都是没有的
  // 所以我们要先去写一个模板，帮助我们直接生成一个完整的html
	const template = fs.readFileSync(
		path.join(__dirname, `../server.template.ejs`),
		'utf-8'
	)

	// 声明一个render
	// 这个renderer 是通过 VueServerRenderer的createBundleRenderer去创建一个BundleRenderer实例
  // 这里的bundle参数 就是我们上面由 webpack + vue-server-renderer/server-plugin 生成的 bundle json 对象
	const renderer = VueServerRenderer.createBundleRenderer(bundle, {
		// 当提供 clientManifest 时，模板会自动注入以下内容：
		// 渲染当前页面所需的最优客户端 JavaScript 和 CSS 资源
		// 为要渲染页面提供最佳的 <link rel="preload/prefetch"> 资源提示
		// 这里通过将 inject: false 传递给 renderer，来禁用所有自动注入
		inject: false,
		// HTML模板中注入的内容
		clientManifest
	})

	await serverRender(ctx, renderer, template)

}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
