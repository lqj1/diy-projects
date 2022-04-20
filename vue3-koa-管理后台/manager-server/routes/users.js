/**
 * 用户管理模块
 */
const router = require('koa-router')()
// 导入用户模型
const User = require('./../models/userSchama')
const util = require('./../utils/utils')
const jwt = require('jsonwebtoken')
router.prefix('/users')
// // // 路由,前端请求/leave/count
// router.get('/leave/count', ctx => {
//   const token = ctx.request.headers.authorization.split(' ')[1]
//   const payload = jwt.verify(token, 'imooc')
//   ctx.body = payload
// })
// 路由,前端请求/login
router.post('/login', async ctx => {
  try {
    // 通过ctx可以得到请求参数,get通过query,post通过body
    const { userName, userPwd } = ctx.request.body
    // 返回的是promise
    /**
     * 返回数据库指定的字段有三种方式
     * 1. 字符串加空格 'userId userName userEmail state role deptId roleList'
     * 2. json，1返回;0/默认 不返回 {userId: 1, userPwd: 0}
     * 3. sql方式，select ('userId')
     */
    const res = await User.findOne(
      {
        userName, // key-value的简写
        userPwd
      },
      'userId userName userEmail state role deptId roleList'
    )
    const data = res._doc
    console.log('data=>', data)
    const token = jwt.sign(
      {
        data: data
      },
      'imooc',
      { expiresIn: 30 }
    ) // 密钥 imooc, 过期时间 30s
    if (res) {
      data.token = token
      ctx.body = util.success(res)
    } else {
      ctx.body = util.fail('账号密码不正确')
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
})

module.exports = router
