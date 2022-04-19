const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4js = require('./utils/log4j')
const utils = require('./utils/utils')
// const index = require('./routes/index')
const users = require('./routes/users')
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')
// error handler
onerror(app)

// 加载数据库连接
require('./config/db')

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)

// logger
app.use(async (ctx, next) => {
  // const start = new Date()
  // await next()
  // const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms-----ssssssssssssssssssss`)
  // log4js.info(`===========log output==========`)
  log4js.info(`get params: ${JSON.stringify(ctx.request.query)}`)
  log4js.info(`post params: ${JSON.stringify(ctx.request.body)}`)
  await next().catch(err => {
    if (err.status == '401') {
      ctx.status = 200
      ctx.body = utils.fail('Token认证失败', utils.CODE)
    } else {
      throw err
    }
  })
})
// routes
app.use(
  koajwt({ secret: 'imooc' }).unless({
    path: ['/api/users/login']
  })
) // 任何一个接口进来都会经过这里过滤，校验token是否有效
// 定义前缀，一级路由
router.prefix('/api')

// router.get('/leave/count', ctx => {
//   console.log('=>', ctx.request.headers)
//   const token = ctx.request.headers.authorization.split('')[1]
//   const payload = jwt.verify(token, 'imooc')
//   ctx.body = payload
// })

router.use(users.routes(), users.allowedMethods())
app.use(router.routes(), router.allowedMethods())
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  log4js.error(`${err.stack}`)
})

module.exports = app
