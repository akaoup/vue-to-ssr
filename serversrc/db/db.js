// npm i sha1 -S
// 生成请求线上数据库的签名
const sha1 = require('sha1')

// 需要发请求
const axios = require('axios')

// 线上数据库存储需要一个命名空间，所有数据都存在里面
// 每个请求需带上这个name 这样才知道操作哪个数据库
const className = 'todo'

// 线上数据库的API访问需要在 https://d.apicloud.com/ 下
const request = axios.create({
	baseURL: 'https://d.apicloud.com/mcm/api'
})

const creatError = (code, resp) => {
	const err = new Error(resp.message)
	err.code = code
	return err
}
// 请求处理
const handleRequest = ({ status, data, ...rest }) => {
	if(status === 200){
		return status
	} else {
		throw creatError(status, rest)
	}
}

module.exports = (appId, appKey) => {
	// 当调用 APICloud 云开发接口时，需要对头部信息中X-APICloud-AppKey 进行验证
	// X-APICloud-AppKey 的生成规则如下：
	// var appKey = SHA1（应用ID + 'UZ' + 应用KEY +'UZ' + 当前时间毫秒数）+ '.' +当前时间毫秒数
	// 请求格式：每个发送的请求都必须带请求头
	// 请求头有两部分
	// X-APICloud-AppId头标明正在运行的是哪个App程序，而X-APICloud-AppKey头用来授权鉴定终端
	const getHeaders = () => {
		const now = Date.now()
		return {
			'X-APICloud-AppId': appId,
			'X-APICloud-AppKey': `${sha1(`${appId}UZ${appKey}UZ${now}`)}.${now}`
		}
	}
	return {
		async getAllTodos () {
			return handleRequest(await request.get(`/${className}`, {
				headers: getHeaders()
			}))
		},
		async addTodo (todo) {
			return handleRequest(await request.post(`/${className}`, todo, {
				headers: getHeaders()
			}))
		},
		async updateTodo (id, todo) {
			return handleRequest(await request.put(`/${className}/${id}`, todo, {
				headers: getHeaders()
			}))
		},
		async deleteTodo (id) {
			return handleRequest(await request.delete(`/${className}/${id}`, {
				headers: getHeaders()
			}))
		},
		async deleteCompleted (ids) {
			const request = ids.map(id => {
				return {
					method: 'DELETE',
					path: `/mcm/api/${className}/${id}`
				}
			})
			return handleRequest(await request.post(`/batch`, {request}, {
				headers: getHeaders()
			}))
		}
	}
}
