const Router = require('koa-router')
const send = require('koa-send')
// 处理/dist开头的路径	
const staticRouter = new Router({
	prefix:'/dist'
})

staticRouter.get('/*', async ctx => {
	await send(ctx, ctx.path)
})

module.exports = staticRouter