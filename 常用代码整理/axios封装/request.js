import axios from 'axios'
export function request(config) {
	// 1. 创建axios实例
	const instance = axios.create({
		baseURL: 'http://localhost/api',
		timeout: 5000,
	})
	// 2. axios拦截器
	// 2.1 请求拦截器
	instance.interceptors.request.use(
		(config) => {
			return config
		},
		(err) => {
			console.log(err)
		}
	);
	// 2.2 响应拦截
	instance.interceptors.response.use(
		(res) => {
			// do something
			// 响应拦截需要将数据返回出去
			return res.data
		},
		(err) => {
			console.log(err)
		}
	)
	// 3. 发送真正的网络请求，必须返回一个 promise 对象
	return instance(config)
}