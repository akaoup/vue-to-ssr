import Vue from 'vue'

const app = new Vue({
  template: '<h1>hello</h1>'
})

app.$mount('#root')

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// app.$options.render = (h)=>{
//   return h('div', {}, 'xxx')
// }
// console.log(app.$root === app)
// console.log(app.children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// 服务端渲染做判断用
// console.log(app.$isServer)
// console.log(app.$watch)
// console.log(app.$on)
// console.log(app.$emit)
// console.log(app.$once)
// 强制组件渲染，当data{}里的属性没有赋值，后续给属性赋的值不会自动渲染，这时用～
// app.$forceUpdate()
// set里的属性会自动渲染
// app.$set()
// 把会自动渲染的属性删掉 用～
// app.$delete()
// app.$nextTick()
