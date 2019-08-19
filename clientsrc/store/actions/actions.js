import model from '../../model/client-model.js'
import notify from '../../components/notification/function.js'
import bus from '../../util/bus.js'

const handleError = (err) => {
// handle error
	if (err.code === 401) {
		notify({
			content: '您得先登录啊!'
		})
		bus.$emit('auth')
	}
}
export default {
	// 跟mutation一样是修改数据的
	// 不同的是这里修改异步数据
	updateCountAsync (store, data) {
		setTimeout(() => {
			store.commit('updateCount', {
				num: data.num
			})
		}, data.time)
	},
	fetchTodos ({ commit }) {
		model.getAllTodos()
			.then(data => {
				commit('fillTodos', data)
			})
			.catch(err => {
				handleError(err)
			})
	},
	addTodo ({ commit }, todo) {
		model.createTodo(todo)
			.then(data => {
				commit('addTodo', data)
				notify({
					content: '你又多了件事要做'
				})
			}).catch(err => {
					handleError(err)
			})
	},
	updateTodo ({ commit }, { id, todo }) {
		model.updateTodo(id, todo)
			.then(data => {
				commit('updateTodo', { id, todo: data })
				notify({
					content: '你又多了件事要做'
				})
			}).catch(err => {
					handleError(err)
			})
	},
	deleteTodo ({ commit }, id) {
		model.deleteTodo(id)
			.then(data => {
				commit('deleteTodo', id)
				notify({
					content: '你又少了件事要做'
				})
			}).catch(err => {
					handleError(err)
			})
	},
	deleteAllCompeleted ({ commit, state }) {
		const ids = state.todos.filter(t => t.completed).map(t => t.id)
		model.deleteTodo(ids)
			.then(() => {
				commit('deleteAllCompeleted')
				notify({
					content: '已清理已完成'
				})
			}).catch(err => {
					handleError(err)
			})
	},
	login ({ commit }, { username, password }) {
		return new Promise((resolve, reject) => {
			model.login(username, password)
				.then(date => {
					commit('doLogin', data)
					notify({
						content: '登录成功'
					})
					resolve()
				}).catch(err => {
					handleError(err)
					reject(err)
				})
		})
	}
}
