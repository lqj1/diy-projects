/**
 * 数据库连接
 */
const { default: mongoose } = require('mongoose')
const mangoose = require('mongoose')
const config = require('./index')
const log4js = require('./../utils/log4j')
// 数据库链接不需要加引号
mongoose.connect(config.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', () => {
  log4js.error(`****数据库连接失败****${config.URL}`)
})
db.on('open', () => {
  log4js.info('****数据库连接成功****')
})
