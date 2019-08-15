import Vue from 'vue'
import Component from './func-notification.js'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = (instance) => {
	if (!instance) return
	const len = instances.length
	const index = instances.findIndex(inst => instance.id === inst.id)

	instances.splice(index, 1)

	// 删除节点的时候 计算高度
	if (len <= 1) return
	const removeHeight = instance.vm.height
	// 从第二个开始计算 第一个不需要删除
	for (let i = index; i < len - 1; i++) {
		instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
	}
}

const notify = (options) => {
	if (Vue.prototype.$isServer) return

	const {
		autoClose,
		...rest
	} = options

	const instance = new NotificationConstructor({
		propsData: {
			...rest
		},
		data: {
			autoClose: autoClose === undefined ? 5000 : autoClose
		}
	})
	const id = `notification_${seed++}`
	instance.id = id
	instance.vm = instance.$mount()
	document.body.appendChild(instance.vm.$el)
	instance.vm.visible = true

	let verticalOffset = 0
	instances.forEach(item => {
		// 每个item距离16
		verticalOffset += item.$el.offsetHeight + 16
	})
	// 默认初始距离底部16
	verticalOffset += 16
	instance.verticalOffset = verticalOffset
	instances.push(instance)

	// tansiton leave 关闭
	instance.vm.$on('closed', () => {
		removeInstance(instance)
		// 删除dom节点
		document.body.removeChild(instance.vm.$el)
		// 只销毁vm对象 不能删除dom节点
		instance.vm.$destroy()
	})

	// 点击close关闭
	instance.vm.$on('close', () => {
		instance.vm.visible = false
	})
	return instance.vm
}

export default notify
