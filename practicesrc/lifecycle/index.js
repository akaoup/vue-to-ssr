import Vue from 'vue'

const app = new Vue({
	data: {
		text: 'aaa'
	},
  template: '<h1>{{text}}</h1>'
})

app.$mount('#root')

// 初始化执行，且只有这一组会在服务端被渲染时可以调用
beforeCreate () {
	console.log(this, 'beforeCreate')
}
created () {
	console.log(this, 'created')
}

// 挂载实例执行，dom操作放这里
beforeMount () {
	console.log(this, 'beforeMount')
}
mounted () {
	console.log(this, 'mounted')
}

// 数据更新时执行
beforeUpdate () {
	console.log(this, 'beforeUpdate')
}
updated () {
	console.log(this, 'updated')
}

// 组件被销毁时执行 app.$destory
beforeDestory () {
	console.log(this, 'beforeDestory')
}
destroyed () {
	console.log(this, 'destroyed')
}

// 组件keep-alive时执行
activated () {
	console.log(this, 'beforeMount')
}
deactivated () {
	console.log(this, 'mounted')
}

// 错误捕捉，会向上冒泡，正式环境可以使用
errorCaptured () {

}
