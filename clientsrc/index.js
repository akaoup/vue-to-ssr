import Vue from 'vue'
import App from './app.vue'
import './assets/styles/global.styl'

import createRouter from './config/router'
import Router from 'vue-router'
import createSore from './store/store'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(Router)
const root = document.createElement('div')
document.body.appendChild(root)

const router = createRouter()
const store = createSore()

// 路由守卫
// 每次路由跳转都会触发以下三个全局导航钩子
// 用法 比如在beforeEach里 可以验证用户登陆
// router.beforeEach((to, from, next) => {
// 	console.log('before each invoked')
// 	// 进行数据校验
// 	if (to.fullPath === '/app') {
// 		// 跳转登录路由
// 		next({
// 			 path:'/login'
// 		})
// 	} else {
// 		// 什么都不做 或者:
// 		next()
// 	}
// })

// router.beforeResolve((to, from, next) => {
// 	console.log('before resolve invoked')
// 	next()
// })

// router.afterEach((to, from) => {
// 	console.log('after each invoked')
// })

new Vue({
	router,
	store,
  render: h => h(App)
}).$mount(root)
