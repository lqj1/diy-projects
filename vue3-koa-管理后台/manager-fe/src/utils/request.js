/**
 * axios二次封装
 */
import axios from 'axios'
import config from './../config'
import { ElMessage } from 'element-plus'
import router from './../router'
const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后再试'

const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})
// 请求拦截
service.interceptors.request.use(req => {
  // TODO
  const header = req.headers
  if (!headers.Authorization) {
    headers.Authorization = 'Bear Vincent'
  }
  return req
})
// 响应拦截
service.interceptors.request.use(res => {
  const { code, data, msg } = res.data
  if (code === 200) {
    return data
  } else if (code === 40001) {
    ElMessage.error(TOKEN_INVALID)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_INVALID)
  } else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(NETWORK_ERROR)
  }
})
/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  if (config.env === 'prod') {
    // 生产环境，防止请求到mockapi,service.defaults.baseURL是axios默认的配置
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }
  return service(options)
}
// 方法二：对应代码在Login.vue中
// this.$request.get('/login', { name: 'jack' }, {mock: true}).then(() => {
//   console.log(res);
// })
// 因为导出的 request 不是对象，所以要使用上面方法二，需要对 request 进行扩展
;['get', 'post', 'put', 'delete', 'patch'].forEach(item => {
  request[item] = (url, data, option) => {
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})
export default request
