const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const app = new Koa()

// 服务端渲染是分开发环境和生产环境
const isDev = process.env.NODE_ENV === 'development'

const staticRouter = require('./routers/static.js')
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter
if (isDev) {
	pageRouter = require('./routers/dev-ssr.js')
} else {
	pageRouter = require('./routers/ssr.js')
}

// 中间件来记录所有的请求和抓取的错误
// 在函数前面加一个async，代表异步处理函数，而参数next表示执行下一个 异步处理的函数
// 在try循环体内，console打印出请求的路径
// 如果是isDev为true的情况，可以直接将错误信息写到body里面，前台即可以显示
// 如果不是开发环境，则提醒
// ctx是来自客户端的请求用中间件来记录所有的请求和抓取错误
app.use(async (ctx, next) => {
	try {
		console.log(`request with path ${ctx.path}`)
		await next()
	} catch (err) {
		console.log(err)
		ctx.status = 500
		if (isDev) {
			ctx.body = err.message
		} else {
			ctx.body = 'please try again later'
		}
	}
})
app.use(async (ctx, next) => {
	if (ctx.path === './favicon.ico') {
		await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../')})
	} else {
		await next()
	}
})


// pageRouter.routes()是个function查看路由组件的匹配与否
// pageRouter.allowedMethods()也是个function查看http请求状态码
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333
app.listen(PORT, HOST, () => {
	console.log(`server is listening on ${HOST}:${PORT}`)
})
// 处理服务端渲染中间件 koa-router 处理路由
