export default {
	// 跟mutation一样是修改数据的
	// 不同的是这里修改异步数据
	updateCountAsync (store, data) {
		setTimeout(() => {
			store.commit('updateCount', {
				num: data.num
			})
		}, data.time)
	}
}
