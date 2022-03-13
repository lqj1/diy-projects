/**
 * api管理
 */
import request from './../utils/request'
export default {
  login(params) {
    // 千万要记得return
    return request({
      url: '/users/login',
      method: 'post',
      data: params
      // mock: true
    })
  }
}
