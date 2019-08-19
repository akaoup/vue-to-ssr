export default {
	// vue的mutation接收的第一个参数是state，第二个参数是个obj
	// obj里包含的是要改state对应的值
	// 现在有只有num就传num, 当有多个值修改是得包装成一个对象传进来
	updateCount (state, data) {
		state.count = data.num
	},
	fillTodos (state, todos) {
		state.todos = todos
	},
	addTodo (state, toso) {
		state.todos.unshift(todo)
	},
	updateTodo (state, { id, todo }) {
		state.todos.splice(state.todos.findIndex(t => t.id === id), 1, todo)
	},
	deleteTodo (state, id) {
		state.todos.splice(state.todos.findIndex(t => t.id === id), 1)
	},
	deleteAllCompleted (state) {
		state.todos = state.todos.filter(t => !t.completed)
	},
	doLogin (state, userInfo) {
		state.user = userInfo
	}
}
