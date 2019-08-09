import Vue from 'vue'

const app = new Vue({
	data: {
		text: 0,
		html: '<sapn>this is html</sapn>',
		active: false,
		arr: [1, 2, 3],
		obj: {
			a: 'a',
			b: 'b'
		}
	},
  template: `
  	<div>
		<div v-text="'text:' + text"></div>
		<div>text:{{text}}</div>
		<div v-html="html"></div>
		<div>{{html}}</div>
		<div v-show="active">{{active}}</div>
		<div v-if="active">{{active}}</div>
		<div v-else-if="text === 0">{{active}}</div>
		<div v-else>{{active}}</div>
		<div v-for="(item, index) in arr" :key="item">{{item}}</div>
		<div v-for="(val, key, index) in obj" :key="val">{{val}}:{{key}}</div>
		<input type="text" v-model="text" />
		</div>
  `
})

app.$mount('#root')
