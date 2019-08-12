export default [
	{
		path: '/',
		redirect: '/app'
	},
	{
		path: '/app',
		component: () => import('../views/todo/todo.vue')
		// 多个vue-router
		// components: {
		// 	default: Todo,
		// 	a: Login
		// }
	},
	{
		path: '/login',
		component: () => import('../views/login/login.vue')
		// 路由里定义钩子
		// beforeEnter (to, from, next) {
		// console.log('login route before enter')
		// 	next()
		// }
	}
]
