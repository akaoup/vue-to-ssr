import createApp from './create-app.js'

// 这边接受的context就是server-render.js传入的context
export default context => {
	// new Promise 是因为里面可能会做些异步的操作
	return new Promise((resolve, reject) => {
		const { app, router } = createApp()
		router.push(context.url)
		// router.onReadey基本上在服务端被渲染的时候才用到
		router.onReady(() => {
			// router.getMatchedComponents也只在服务端渲染的时候才能用到
			const matchedComponents = router.getMatchedComponents()
			if (!matchedComponents.length) {
				return reject(new Error('no component matched'))
			}
			context.meta = app.$meta()
			resolve(app)
		})
	})
}
