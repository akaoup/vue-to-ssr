import createApp from './create-app.js'
import bus from './util/bus.js'
const root = document.createElement('div')
document.body.appendChild(root)

const { app, router } = createApp()

bus.$on('auth', () => {
	router.push('/login')
})

router.onReady(() => {
	app.$mount(root)
})
