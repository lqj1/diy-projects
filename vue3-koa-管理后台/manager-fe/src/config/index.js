/**
 * 环境配置封装
 */
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  dev: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/1b3f52df2175eea61d7beb738e6a97de/api' // 开发环境需要访问mock，提测之后才会访问测试环境地址
  },
  test: {
    baseApi: '//test.futurefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/1b3f52df2175eea61d7beb738e6a97de/api'
  },
  prod: {
    baseApi: '//futurefe.com/api',
    mockApi: 'https://www.fastmock.site/mock/1b3f52df2175eea61d7beb738e6a97de/api'
  }
}
export default {
  env,
  mock: true, // 接口是否支持mock，整个项目使用mock方式
  // baseApi: 'www.baidu.com/api' // test-www
  namespace: 'manager',
  ...EnvConfig['dev']
}
