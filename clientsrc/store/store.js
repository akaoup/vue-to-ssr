import Vuex from 'vuex'

// 当store要管理的东西多了的时候，得有个更清晰的目录结构
import defaltState from './state/state.js'
import mutations from './mutations/mutations.js'
import getters from './getters/getters.js'
import actions from './actions/actions.js'

const isDev = process.env.NODE_ENV === 'development'

// export default为什么要用方法
// 跟router一样，每次服务端渲染都要新生成一个store，不能用同一个store
// 因为每次用同一个会有内存溢出的问题
export default () => {
	return new Vuex.Store({
		// 开发环境最好禁止store外部修改数据
		strict: isDev,
		state: defaltState,
		mutations,
		getters,
		actions
		// modules: {
		// 	a: {
		// 		// 强制给一个模块加命名空间
		// 		namespaced: true,
		// 		state: {
		// 			text: 1
		// 		},
		// 		mutations: {
		// 			// 这里的state是a模块的state
		// 			updateText (state, text) {
		// 				state.text = text
		// 			}
		// 		},
		// 		getters: {
		// 			// getter第三个参数可获取全局state
		// 			textPlus (state, getters, rootState) {
		// 				return state.text + 1 + rootState.b.text
		// 			}
		// 		},
		// 		actions: {
		// 			add ({ state, commit, rootState }) {
		// 				// 不加{root: true} commit的updateText是模块内的
		// 				// 加了的话则是全局的
		// 				commit('updateText', { root: true })
		// 			}
		// 		}
		// 	},
		// 	b: {
		// 		state: {
		// 			text: 2
		// 		}
		// 	}
		// }
	})
}
