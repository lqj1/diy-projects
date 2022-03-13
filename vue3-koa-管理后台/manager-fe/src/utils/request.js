/**
 * axios二次封装
 */
import axios from 'axios'
import config from './../config'
import { ElMessage } from 'element-plus'
import router from './../router'
import storage from './storage'
const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后再试'

const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})
// 请求拦截
service.interceptors.request.use(req => {
  const headers = req.headers
  const { token = '' } = storage.getItem('userInfo') || {}
  if (!headers.Authorization) headers.Authorization = 'Bearer ' + token
  return req
})
// 响应拦截，注意是response不是request
service.interceptors.response.use(res => {
  const { code, data, msg } = res.data
  if (code === 200) {
    return data
  } else if (code === 500001) {
    ElMessage.error(TOKEN_INVALID)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_INVALID)
  } else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
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
  let isMock = config.mock
  // 默认是全局的mock，但以配置的单个请求的mock为主，
  if (typeof options.mock != 'undefined') {
    isMock = options.mock
  }
  if (config.env === 'prod') {
    // 生产环境，防止请求到mockapi,service.defaults.baseURL是axios默认的配置
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return service(options)
}
// 方法二：对应代码在Login.vue中
// this.$request.get('/login', { name: 'jack' }, {mock: true}).then(() => {
//   console.log(res);
// })
// 因为导出的 request 不是对象，所以要使用上面方法二，需要对 request 进行扩展
;['get', 'post', 'put', 'delete', 'patch'].forEach(item => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})
export default request
