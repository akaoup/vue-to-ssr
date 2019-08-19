import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

import App from './app.vue'
import createRouter from './config/router.js'
import createStore from './store/store.js'
import Notification from './components/notification'
import Tabs from './components/tabs'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Notification)
Vue.use(Tabs)

// 每次返回新的上面的实例，不然会导致应用在node端出现内存溢出的情况
export default () => {
	const router = createRouter()
	const store = createStore()
	const app = new Vue({
		router,
		store,
		render: h => h(App)
	})

	return { app, router, store }
}
