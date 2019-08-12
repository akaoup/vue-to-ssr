import Router from 'vue-router'
import routes from './routes.js'

export default () => {
	return new Router({
		routes,
		mode: 'history',
		// 配置基础路径
		// base: '/base/',
		// 可添加router-link的全局样式
		// linkActiveClass: ' ',
		// linkExactActiveClass: ' ',
		// 跳转路由的滚动条配置
		scrollBehavior (to, from, savePosition) {
			// 如果有历史滑动距离就滚动到那 没有就到 x: 0, y: 0 的位置
			if (savePosition) {
				return savePosition
			} else {
				return { x: 0, y: 0 }
			}
		},
		// 不是所有浏览器都支持router的前端路由，true的话自动切换到 hash的模式-多页面
		fallback: true

		// url带的参数 字符串转成json
		// parseQuery (query) {

		// },
		// // url带的参数 json对象转成字符串
		// stringifyQuery (obj) {

		// }
	})
}
