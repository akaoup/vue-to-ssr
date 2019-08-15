import createApp from './create-app.js'
const { app, router } = createApp()
router.onReady(() => {
	app.$mount('#root')
})
