// 需要ejs 渲染template
const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
	// ctx : 返回的html内容写到body里面
	// renderer : 开发时和正式环境里不一样 需要从外部传入
	// template : 模板
	ctx.headers['Content-Type'] = 'text/html'
	// 用在服务端渲染时候传入到vueServerRender里面去的
	// vueServerRender拿到context之后渲染完成之后，会在上面插入一堆的属性，方便我们渲染html
	// 这个context会包含客户端javascript的路径，css的路径，html的title或description等等
	const context = {url: ctx.path}

	try {
		// 将 context 渲染为字符串
		// bundleRenderer.renderToString([context, callback]): ?Promise<string>
		// context 上下文对象 (context object) 可选。
		// 回调是一个典型的 Node.js 风格回调，其中第一个参数是可能抛出的错误，第二个参数是渲染完毕的字符串。
		// callback 不传递 callback 时，此方法返回一个 Promise 对象，在其 resolve 后返回最终渲染的 HTML。
		const appString = await renderer.renderToString(context)

		// 渲染meta信息
		const {
			title
		} = context.meta.inject()

		// 渲染html 
		const html = ejs.render(template, {
			// 渲染template要用到的变量
			appString,
			// 可以直接拿到带有style标签的字符串，直接扔到html里
			style: context.renderStyles(),
			scripts: context.renderScripts(),
			title: title.text()
		})
		ctx.body = html

	} catch (err) {
		console.log('render error', err)
		throw err
	}

}
