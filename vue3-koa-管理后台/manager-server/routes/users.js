/**
 * 用户管理模块
 */
const router = require('koa-router')()
// 导入用户模型
const User = require('./../models/userSchama')
const util = require('./../utils/utils')
router.prefix('/users')
// 路由
router.post('/login', async ctx => {
  try {
    // 通过ctx可以得到请求参数,get通过query,post通过body
    const { userName, userPwd } = ctx.request.body
    // 返回的是promise
    const res = await User.findOne({
      userName, // key-value的简写
      userPwd
    })
    if (res) {
      ctx.body = util.success(res)
    } else {
      ctx.body = util.fail('账号密码不正确')
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
})

module.exports = router
