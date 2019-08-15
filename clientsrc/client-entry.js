import createApp from './create-app.js'
const root = document.createElement('div')
document.body.appendChild(root)
const { app, router } = createApp()
router.onReady(() => {
	app.$mount(root)
})
