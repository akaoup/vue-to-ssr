import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
	{
		path: '/',
		redirect: '/app'
	},
	{
		path: '/app',
		component: Todo
		// component: () => import('../views/todo/todo.vue')
		// 多个vue-router
		// components: {
		// 	default: Todo,
		// 	a: Login
		// }
	},
	{
		path: '/login',
		component: Login
		// component: () => import('../views/login/login.vue')
		// 路由里定义钩子
		// beforeEnter (to, from, next) {
		// console.log('login route before enter')
		// 	next()
		// }
	}
]
